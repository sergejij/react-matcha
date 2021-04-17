using Matcha.Server.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using server.Response;
using System;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Matcha.Server.Controllers
{
    [ApiController]
    [ExceptionHandlerFilter]
    [AuthorizeFilter]
    [Route("test")]
    public class WebSocketsController : BaseMatchaController
    {
        private readonly ILogger _logger;

        public WebSocketsController(ILogger logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("ws")]
        public async Task<IActionResult> TestAsync()
        {
            _logger.Log(LogLevel.Trace, "Request handled");

            if (HttpContext.WebSockets.IsWebSocketRequest is false)
            {
                _logger.Log(LogLevel.Trace, "Request is not web socket request. Exit");
                return new ResponseModel(HttpStatusCode.BadRequest, "Не обнаружен запрос веб-сокета").ToResult();
            }
            
            var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();

            var buffer = new byte[1024 * 4];
            var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

            while (!result.CloseStatus.HasValue)
            {
                _logger.Log(LogLevel.Trace, $"Received message: {Encoding.UTF8.GetString(buffer)}");
                var serverMsg = Encoding.UTF8.GetBytes($"Полученное сообщение: {Encoding.UTF8.GetString(buffer)}");
                await webSocket.SendAsync(new ArraySegment<byte>(serverMsg, 0, serverMsg.Length), result.MessageType, result.EndOfMessage, CancellationToken.None);
            }
            _logger.Log(LogLevel.Trace, "Exit");
            await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);

            return ResponseModel.OK.ToResult();
        }
    }
}
