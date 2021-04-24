using Matcha.Server.Filters;
using Matcha.Server.Models;
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
    [WebSocketRequestFilter]
    [Route("web_socket")]
    public class WebSocketsController : BaseMatchaController
    {
        public async Task ListenWebSocket()
        {
            var socket = await HttpContext.WebSockets.AcceptWebSocketAsync();

            WebSocketsManager.WebSocketsManager.AddSession(UserId, SessionId, socket);

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
                    WebSocketsManager.WebSocketsManager.CloseSession(UserId, SessionId);
                    break;

                case WebSocketRequestType.Message:
                    await SendMessage(request.Message);
                    break;

                case WebSocketRequestType.Notification:
                    await SendNotification(request.Notification);
                    break;
            }
        }

        private async Task SendMessage(WebSocketMessageModel message)
        {
            await WebSocketsManager.WebSocketsManager.Send(
                message.Receiver,
                new WebSocketRequestModel
                {
                    Type = WebSocketRequestType.Message,
                    Message = message
                }
            );

            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("SaveMessage", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("from_id", UserId),
                new MySqlParameter("to_id", message.Receiver),
                new MySqlParameter("content", message.Content),
                new MySqlParameter("readed", false)
            });

            connection.Open();
            await command.ExecuteNonQueryAsync();
        }

        private async Task SendNotification(WebSocketNotification notification)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("SaveProfileAction", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("who", UserId),
                new MySqlParameter("whom", notification.WhoseAction),
                new MySqlParameter("action", notification.Type.ToString()),

                new MySqlParameter("first_time", MySqlDbType.Bit) { Direction = ParameterDirection.ReturnValue }
            });

            connection.Open();
            await command.ExecuteNonQueryAsync();

            var firstTime = Convert.ToBoolean(command.Parameters["first_time"]);
            if (firstTime)
            {
                await WebSocketsManager.WebSocketsManager.Send(
                    notification.WhoseAction,
                    new WebSocketRequestModel
                    {
                        Type = WebSocketRequestType.Notification,
                        Notification = notification
                    }
                );
            }
        }
    }
}
//TODO: сделать почанковую загрузку сообщений сокета