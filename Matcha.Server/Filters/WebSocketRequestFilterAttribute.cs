using Microsoft.AspNetCore.Mvc.Filters;
using server.Response;
using System;
using System.Net;

namespace Matcha.Server.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class WebSocketRequestFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (context.HttpContext.WebSockets.IsWebSocketRequest is false)
            {
                context.Result = new ResponseModel(HttpStatusCode.BadRequest, "Не обнаружен запрос веб-сокета").ToResult();
                return;
            }
        }
    }
}
