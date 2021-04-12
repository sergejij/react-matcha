using Matcha.Server.Filters;
using Matcha.Server.Models.Profile;
using Matcha.Server.Models.Users;
using Microsoft.AspNetCore.Mvc;
using server.Response;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Net;
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

            IEnumerable<ProfileInfoModel> usersList = null;
            
            switch (sortParameters.OrderBy)
            {
                case OrderMethodsEnum.Id:
                {
                    usersList = UsersCache.GetProfiles()
                            .Where(arg => arg.Key != UserId)
                            .Select(arg => arg.Value);
                    break;
                }

                case OrderMethodsEnum.Age:
                {
                    usersList = UsersCache.GetProfiles()
                            .Where(arg => arg.Key != UserId)
                            .Select(arg => arg.Value)
                            .OrderByDescending(arg => arg.Age.HasValue)
                            .ThenBy(arg => arg.Age)
                            .Where(arg => !sortParameters.MinAge.HasValue || arg.Age >= sortParameters.MinAge.Value)
                            .Where(arg => !sortParameters.MaxAge.HasValue || arg.Age <= sortParameters.MaxAge.Value);
                    break;
                }

                case OrderMethodsEnum.Rating:
                {
                    usersList = UsersCache.GetProfiles()
                            .Where(arg => arg.Key != UserId)
                            .Select(arg => arg.Value)
                            .OrderByDescending(arg => arg.Rating)
                            .Where(arg => !sortParameters.MinRating.HasValue || arg.Rating >= sortParameters.MinRating.Value);
                    break;
                }

                case OrderMethodsEnum.Distance:
                {
                        //var sessions = UsersCache.GetSessions();
                        //usersList = UsersCache.GetProfiles()


                        break;
                }

                case OrderMethodsEnum.CommonInterests:
                    {
                        var myInterests = UsersCache.GetUserInterests(UserId);

                        usersList = UsersCache.GetProfilesWithInterests()
                            .Where(arg => arg.Key != UserId)
                            .Where(arg => arg.Value.Item2.Intersect(myInterests).Count() >= sortParameters.MinCommonInterests)
                            .Select(arg => arg.Value.Item1);

                        break;
                    }


                default:
                    throw new System.Exception();
            }

            usersList = usersList.Skip(skip).Take(take);

            return new ResponseModel(HttpStatusCode.OK, null, new()
            {
                { "users", usersList }
            })
            .ToResult();
        }
    }
}
