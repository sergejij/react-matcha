using Matcha.Server.Database;
using Matcha.Server.Models.Account;
using Matcha.Server.Models.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Response;
using System;

namespace Matcha.Server.Controllers
{
    [Route("account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        [ProducesResponseType(typeof(ResponseModel), 200)]
        [ProducesResponseType(typeof(ResponseModel), 500)]
        [HttpPost]
        [Route("register")]
        public IActionResult Register(AccountRegisterModel registerModel)
        {
            var dbRet = DatabaseApi.Account.Register(registerModel);

            return ResponseBuilder.Create(dbRet);
        }

        [HttpGet]
        [Route("confirm_email")]
        public IActionResult ConfirmEmail(Guid code)
        {
            var dbRet = DatabaseApi.Account.ConfirmEmail(code);
            return ResponseBuilder.Create(dbRet);
        }

        [HttpGet]
        [Route("login")]
        public IActionResult Login(AccountAuthModel authModel)
        {
            var dbRet = DatabaseApi.Account.OpenSession(authModel);

            if (dbRet.Ok)
            {
                var cookie = dbRet.Content[ResponseContentConstants.Cookie].ToString();
                Response.Cookies.Append(ResponseContentConstants.Cookie, cookie);

                var userId = dbRet.Content[ResponseContentConstants.UserId].ToString();
                Response.Cookies.Append(ResponseContentConstants.UserId, userId);

                dbRet.Content.Remove(ResponseContentConstants.Cookie);
            }

            return ResponseBuilder.Create(dbRet);
        }

        [HttpGet]
        [Route("logout")]
        public IActionResult Logout()
        {
            if (TryGetSessionAttributes(out string cookie, out long userId))
                DatabaseApi.Account.Logout(userId, cookie);

            var cookieExpiredOption = new CookieOptions { Expires = DateTime.Now.AddDays(-1) };
            Response.Cookies.Append(ResponseContentConstants.Cookie, "", cookieExpiredOption);
            Response.Cookies.Append(ResponseContentConstants.UserId, "", cookieExpiredOption);

            return ResponseBuilder.Create(ResponseModel.OK());
        }

        #region Вспомогательные методы

        private bool TryGetSessionAttributes(out string cookie, out long userId)
        {
            if (Request.Cookies.ContainsKey(ResponseContentConstants.Cookie) &&
                Request.Headers.ContainsKey(ResponseContentConstants.UserId))
            {
                cookie = Request.Cookies[ResponseContentConstants.Cookie];
                userId = long.Parse(Request.Headers.GetCommaSeparatedValues(ResponseContentConstants.UserId)[0]);

                return true;
            }
            else
            {
                cookie = default;
                userId = default;

                return false;
            }
        }

        #endregion
    }
}
