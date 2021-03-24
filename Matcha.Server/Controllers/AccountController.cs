using Matcha.Server.Database;
using Matcha.Server.Models.Account;
using Matcha.Server.Models.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Response;
using System;
using System.ComponentModel.DataAnnotations;

namespace Matcha.Server.Controllers
{
    [Route("account")]
    [ApiController]
    public class AccountController : BaseMatchaController
    {
        [HttpPost]
        [Route("register")]
        public IActionResult Register(AccountRegisterModel registerModel)
        {
            var dbRet = DatabaseApi.Account.Register(registerModel);

            return ResponseBuilder.Create(dbRet);
        }

        [HttpPost]
        [Route("confirm_email")]
        public IActionResult ConfirmEmail([Required][FromQuery] Guid code)
        {
            var dbRet = DatabaseApi.Account.ConfirmEmail(code);
            return ResponseBuilder.Create(dbRet);
        }

        [HttpPost]
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

        [HttpPost]
        [Route("logout")]
        public IActionResult Logout()
        {
            if (UserId != default)
                DatabaseApi.Account.Logout(UserId, Cookie);

            var cookieExpiredOption = new CookieOptions { Expires = DateTime.Now.AddDays(-1) };
            Response.Cookies.Append(ResponseContentConstants.Cookie, "", cookieExpiredOption);
            Response.Cookies.Append(ResponseContentConstants.UserId, "", cookieExpiredOption);

            return ResponseBuilder.Create(ResponseModel.OK());
        }
    }
}
