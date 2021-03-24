using Matcha.Server.Database;
using Matcha.Server.Models.Response;
using Microsoft.AspNetCore.Http;
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
            if (TryGetSessionAttributes(context.HttpContext.Request, out long userId, out Guid cookie) == false)
            {
                context.Result = ResponseBuilder.Create(ResponseModel.Unauthorized());
                return;
            }

            if (DatabaseApi.Account.SessionExists(userId, cookie) == false)
                context.Result = ResponseBuilder.Create(ResponseModel.Unauthorized());
        }

        private bool TryGetSessionAttributes(HttpRequest request, out long userId, out Guid cookie)
        {
            if (request.Cookies.ContainsKey(ResponseContentConstants.UserId) &&
                request.Cookies.ContainsKey(ResponseContentConstants.Cookie))
            {
                request.Cookies.TryGetValue(ResponseContentConstants.UserId, out var userIdStr);
                userId = Convert.ToInt64(userIdStr);

                request.Cookies.TryGetValue(ResponseContentConstants.Cookie, out var cookieStr);
                cookie = new Guid(cookieStr);

                return true;
            }
            else
            {
                userId = default;
                cookie = default;

                return false;
            }
        }
    }
}
