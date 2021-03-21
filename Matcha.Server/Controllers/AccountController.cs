using Matcha.Server.Database;
using Matcha.Server.Models.Account;
using Matcha.Server.Models.Response;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Matcha.Server.Controllers
{
    [Route("account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        [HttpPost]
        [Route("register")]
        public IActionResult Register(AccountRegisterModel user)
        {
            var dbRet = DatabaseApi.Account.Register(user);

            return ResponseBuilder.Create(dbRet);
        }

        [HttpGet]
        [Route("confirm_email")]
        public IActionResult ConfirmEmail(Guid code)
        {
            var dbRet = DatabaseApi.Account.ConfirmEmail(code);

            return ResponseBuilder.Create(dbRet);
        }
    }
}
