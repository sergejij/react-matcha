using Matcha.Server.Database;
using Matcha.Server.Models.Account;
using Matcha.Server.Models.Profile;
using Matcha.Server.Models.Response;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace Matcha.Server.Controllers
{
    [Route("profile")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        [HttpPut]
        [Route("update_info")]
        public IActionResult UpdateProfileInfo(ProfileInfoModel infoModel)
        {
            var dbRet = DatabaseApi.Profile.UpdateProfileInfo(infoModel);

            return ResponseBuilder.Create(dbRet);
        }
    }
}
