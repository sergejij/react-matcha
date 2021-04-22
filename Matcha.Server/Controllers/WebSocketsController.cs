using Matcha.Server.Filters;
using Matcha.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using server.Response;
using System;
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
        [HttpPost]
        [WebSocketRequestFilter]
        [Route("init_connection")]
        public async Task InitWebSocketConnection()
        {
            var socket = await HttpContext.WebSockets.AcceptWebSocketAsync();

            WebSocketsManager.WebSocketsManager.AddSession(UserId, SessionId, socket);
        }

        [HttpPost]
        [Route("close_connection")]
        public void CloseWebSocketConnection()
        {
            WebSocketsManager.WebSocketsManager.CloseSession(UserId, SessionId);
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
