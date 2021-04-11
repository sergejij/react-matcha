using Matcha.Server.Filters;
using Matcha.Server.Models.Profile;
using Matcha.Server.Models.Users;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using static Matcha.Server.Models.Users.SortParametersModel;

namespace Matcha.Server.Controllers
{
    [Route("users")]
    [ApiController]
    [AuthorizeFilter]
    [ExceptionHandlerFilter]
    public class UsersController : BaseMatchaController
    {
        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetUsersList([Required][FromQuery] SortParametersModel sortParameters)
        {
            var skip = (sortParameters.Page - 1) * sortParameters.Size;
            var take = sortParameters.Size;

            IEnumerable<ProfileInfoModel> usersList;
            
            switch (sortParameters.OrderBy)
            {
                case OrderMethodsEnum.Id:
                {
                    usersList = UsersCache.GetProfiles()
                            .Select(arg => arg.Value)
                            .Skip(skip)
                            .Take(take);
                    break;
                }

                case OrderMethodsEnum.Age:
                {
                    usersList = UsersCache.GetProfiles()
                            .Select(arg => arg.Value)
                            .OrderBy(arg => arg.Age)
                            .Where(arg => !sortParameters.minAge.HasValue || arg.Age >= sortParameters.minAge.Value)
                            .Where(arg => !sortParameters.maxAge.HasValue || arg.Age <= sortParameters.maxAge.Value);
                    break;
                }

                case OrderMethodsEnum.Distance:
                {
                        //var sessions = UsersCache.GetSessions();
                        //usersList = UsersCache.GetProfiles()


                        break;
                }
            }

            return default;
        }
    }
}
