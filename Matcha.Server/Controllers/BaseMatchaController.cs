using Matcha.Server.Models.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Matcha.Server.Controllers
{
    public class BaseMatchaController : ControllerBase
    {
        protected long UserId
        {
            get
            {
                if (Request.Cookies.TryGetValue(ResponseContentConstants.UserId, out string userIdStr))
                    return Convert.ToInt64(userIdStr);
                else
                    return default;
            }
        }

        protected string Cookie
        {
            get
            {
                if (Request.Cookies.TryGetValue(ResponseContentConstants.Cookie, out string cookie))
                    return cookie;
                else
                    return default;
            }
        }

        protected bool Authorized
        {
            get
            {
                return UserId != default && Cookie != default;
            }
        }

        public static bool TryGetSessionAttributes(HttpRequest request, out long userId, out string cookie)
        {
            if (request.Cookies.TryGetValue(ResponseContentConstants.UserId, out var userIdStr) &&
                request.Cookies.TryGetValue(ResponseContentConstants.Cookie, out cookie))
            {
                userId = Convert.ToInt64(userIdStr);
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
