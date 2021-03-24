using Matcha.Server.Controllers;
using Matcha.Server.Database;
using Matcha.Server.Models.Response;
using Microsoft.AspNetCore.Mvc.Filters;
using server.Response;
using System;

namespace Matcha.Server.Filters
{
    [AttributeUsage(AttributeTargets.All)]
    public class AuthorizeFilterAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (BaseMatchaController.TryGetSessionAttributes(context.HttpContext.Request, out long userId, out string cookie) == false)
            {
                context.Result = ResponseBuilder.Create(ResponseModel.Unauthorized());
                return;
            }

            if (DatabaseApi.Account.SessionExists(userId, cookie) == false)
                context.Result = ResponseBuilder.Create(ResponseModel.Unauthorized());
        }
    }
}
