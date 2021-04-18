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
    [Route("test")]
    public class WebSocketsController : BaseMatchaController
    {
        [HttpGet]
        [Route("ws")]
        public async Task<IActionResult> TestAsync()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest is false)
            {
                return new ResponseModel(HttpStatusCode.BadRequest, "Не обнаружен запрос веб-сокета").ToResult();
            }
            
            var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();

            var buffer = new byte[1024 * 4];
            var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

            while (!result.CloseStatus.HasValue)
            {
                var serverMsg = Encoding.UTF8.GetBytes($"Полученное сообщение: {Encoding.UTF8.GetString(buffer)}");
                Console.WriteLine($"MESSAGE:\t\t\t{Encoding.UTF8.GetString(serverMsg)}");
                await webSocket.SendAsync(new ArraySegment<byte>(serverMsg, 0, serverMsg.Length), result.MessageType, result.EndOfMessage, CancellationToken.None);
            }
            await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);

            return ResponseModel.OK.ToResult();
        }
    }
}
