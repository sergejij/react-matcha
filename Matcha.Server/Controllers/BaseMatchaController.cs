using Matcha.Server.Models.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Matcha.Server.Controllers
{
    public class BaseMatchaController : ControllerBase
    {
        protected long MyId
        {
            get
            {
                if (Request.Cookies.TryGetValue(ResponseContentConstants.UserId, out string userIdStr))
                    return Convert.ToInt64(userIdStr);
                else
                    return default;
            }
        }

        protected long SessionId
        {
            get
            {
                if (Request.Cookies.TryGetValue(ResponseContentConstants.SessionId, out string sessionId))
                    return Convert.ToInt64(sessionId);
                else
                    return default;
            }
        }

        protected bool Authorized
        {
            get
            {
                return MyId != default && SessionId != default;
            }
        }

        public static bool TryGetSessionAttributes(HttpRequest request, out long userId, out long sessionId)
        {
            if (request.Cookies.TryGetValue(ResponseContentConstants.UserId, out var userIdStr) &&
                request.Cookies.TryGetValue(ResponseContentConstants.SessionId, out var sessionIdStr))
            {
                userId = Convert.ToInt64(userIdStr);
                sessionId = Convert.ToInt64(sessionIdStr);
                return true;
            }
            else
            {
                userId = default;
                sessionId = default;
                return false;
            }
        }
    }
}
