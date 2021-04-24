using Matcha.Server.Filters;
using Matcha.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using server.Response;
using System;
using System.Data;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace Matcha.Server.Controllers
{
    [ApiController]
    [ExceptionHandlerFilter]
    [AuthorizeFilter]
    [WebSocketRequestFilter]
    [Route("web_socket")]
    public class WebSocketsController : BaseMatchaController
    {
        
        public async Task A()
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

                default:
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
        /*
        private const int ChunkSize = 1024;

        private const int MaxFrameSize = ChunkSize * 4;

        
        [WebSocketRequestFilter]
        [HttpGet]
        [Route("ws")]
        public async Task<IActionResult> TestAsync()
        {            
            var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();

            while (webSocket.State == WebSocketState.Open)
            {
                var request = await ReadMessage(webSocket);
                if (request.Type == WebSocketRequestType.Close)
                    break;

                ProcessRequest(request);
            }

            return ResponseModel.OK.ToResult();
        }

        private void ProcessRequest(WebSocketRequestModel request)
        {
            switch (request.Type)
            {
                case WebSocketRequestType.Message:
                    {


                        break;
                    }
            }
        }

        private async Task<WebSocketRequestModel> ReadMessage(WebSocket webSocket)
        {
            var buffer = new byte[ChunkSize];

            var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            if (result.MessageType == WebSocketMessageType.Close)
            {
                return new WebSocketRequestModel
                {
                    Type = WebSocketRequestType.Close
                };
            }

            return JsonConvert.DeserializeObject<WebSocketRequestModel>(Encoding.UTF8.GetString(buffer));


            //var buffer = new byte[ChunkSize];
            //var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

            //if (result.EndOfMessage is false)
            //{
            //    var currentSize = buffer.Length;

            //    while (result.EndOfMessage is false)
            //    {
            //        var newSize = currentSize * 2;
            //        if (newSize > MaxFrameSize)
            //        {
            //            messageTooBig = true;
            //            return null;
            //        }

            //        var biggestBuffer = new byte[ChunkSize];
            //        Buffer.BlockCopy(buffer, 0, biggestBuffer, 0, currentSize);
            //    }
            //}

            //messageTooBig = false;
            //return buffer;
        }
        */
    }
}
