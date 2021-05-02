using Matcha.Server.Filters;
using Matcha.Server.Models;
using Matcha.Server.Models.Profile;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Data;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Matcha.Server.Controllers
{
    [ApiController]
    [ExceptionHandlerFilter]
    [AuthorizeFilter]
    [Route("web_socket")]
    public class WebSocketsController : BaseMatchaController
    {
        public async Task ListenWebSocket()
        {
            var socket = await HttpContext.WebSockets.AcceptWebSocketAsync();

            WebSocketsManager.WebSocketsManager.AddSession(MyId, SessionId, socket);

            await Listen(socket);
        }

        private async Task Listen(WebSocket socket)
        {
            while (socket.State == WebSocketState.Open)
            {
                var request = await ReadMessage(socket);
                
                await ProcessRequest(request);

                if (request.Type == WebSocketRequestType.Close)
                    break;
            }
        }

        private static async Task<WebSocketRequestModel> ReadMessage(WebSocket webSocket)
        {
            var buffer = new byte[4096];

            var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

            if (result.MessageType == WebSocketMessageType.Close)
            {
                return new WebSocketRequestModel
                {
                    Type = WebSocketRequestType.Close
                };
            }

            return JsonConvert.DeserializeObject<WebSocketRequestModel>(Encoding.UTF8.GetString(buffer));
        }

        private async Task ProcessRequest(WebSocketRequestModel request)
        {
            switch (request.Type)
            {
                case WebSocketRequestType.Close:
                    WebSocketsManager.WebSocketsManager.CloseSession(MyId, SessionId);
                    break;

                case WebSocketRequestType.Message:
                    await SendMessage(request);
                    break;
            }
        }

        //TODO: перенести в менеджер 
        private ProfileShortInfoModel GetProfileShortInfo(long userId)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("GetProfileShortInfo", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("user_id", userId),

                new MySqlParameter("name", MySqlDbType.VarChar) { Direction = ParameterDirection.Output },
                new MySqlParameter("surname", MySqlDbType.VarChar) { Direction = ParameterDirection.Output }
            });

            connection.Open();
            command.ExecuteNonQuery();

            return new ProfileShortInfoModel
            {
                Id = userId,
                Name = command.Parameters["name"].Value.ToString(),
                Surname = command.Parameters["surname"].Value.ToString()
            };
        }

        private async Task SendMessage(WebSocketRequestModel request)
        {
            await WebSocketsManager.WebSocketsManager.Send(
                request.Receiver,
                new WebSocketResponseModel
                {
                    Type = WebSocketRequestType.Message.ToString(),
                    Sender = GetProfileShortInfo(MyId),
                    Message = request.Message with
                    {
                        SendTime = DateTime.Now,
                        Read = false
                    }
                }
            );

            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("SaveMessage", connection) {CommandType = CommandType.StoredProcedure};

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("from_id", MyId),
                new MySqlParameter("to_id", request.Receiver),
                new MySqlParameter("content", request.Message.Content),
                new MySqlParameter("readed", false)
            });

            connection.Open();
            await command.ExecuteNonQueryAsync();
        }
    }
}
