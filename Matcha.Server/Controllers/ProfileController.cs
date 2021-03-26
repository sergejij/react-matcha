using Matcha.Server.Database;
using Matcha.Server.Filters;
using Matcha.Server.Models.Profile;
using Matcha.Server.Models.Response;
using Microsoft.AspNetCore.Mvc;
using System;
using System.ComponentModel.DataAnnotations;

namespace Matcha.Server.Controllers
{
    [Route("profile")]
    [ApiController]
    [AuthorizeFilter]
    public class ProfileController : BaseMatchaController
    {
        [HttpPut]
        [Route("update_info")]
        public IActionResult UpdateProfileInfo(ProfileInfoModel infoModel)
        {
            return DatabaseApi.Profile.UpdateProfileInfo(infoModel).ToResult();
        }

        [HttpGet]
        [Route("sexes_list")]
        public IActionResult GetSexesList()
        {
            return DatabaseApi.Profile.GetSexesList().ToResult();

        }

        [HttpGet]
        [Route("attitudes_list")]
        public IActionResult GetAttitudesList()
        {
            return DatabaseApi.Profile.GetAttitudesList().ToResult();
        }

        [HttpGet]
        [Route("profile_info")]
        public IActionResult GetProfileInfo([FromQuery][Required] long userId)
        {
            return DatabaseApi.Profile.GetProfileInfo(userId).ToResult();
        }
    }
}
