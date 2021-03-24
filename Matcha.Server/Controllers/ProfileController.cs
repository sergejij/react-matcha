using Matcha.Server.Database;
using Matcha.Server.Models.Profile;
using Matcha.Server.Models.Response;
using Microsoft.AspNetCore.Mvc;

namespace Matcha.Server.Controllers
{
    [Route("profile")]
    [ApiController]
    public class ProfileController : BaseMatchaController
    {
        [HttpPut]
        [Route("update_info")]
        public IActionResult UpdateProfileInfo(ProfileInfoModel infoModel)
        {
            var dbRet = DatabaseApi.Profile.UpdateProfileInfo(infoModel);

            return ResponseBuilder.Create(dbRet);
        }

        [HttpGet]
        [Route("sexes_list")]
        public IActionResult GetSexesList()
        {
            var dbRet = DatabaseApi.Profile.GetSexesList();

            return ResponseBuilder.Create(dbRet);
        }

        [HttpGet]
        [Route("attitudes_list")]
        public IActionResult GetAttitudesList()
        {
            var dbRet = DatabaseApi.Profile.GetAttitudesList();

            return ResponseBuilder.Create(dbRet);
        }
    }
}
