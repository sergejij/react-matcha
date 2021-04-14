using Matcha.Server.Filters;
using Matcha.Server.Models.Profile;
using Matcha.Server.Models.Users;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using server.Response;
using System;
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
                        //var me = UsersCache.GetUserCacheModel(UserId);
                        //var myCurrentSession = me.Sessions[SessionId];

                        //if (myCurrentSession.CurrentGeoposition is null && myCurrentSession.InitialGeoposition is null)
                        //    return null; // return orderbiyd

                        //var myGeoposition = myCurrentSession.CurrentGeoposition ?? myCurrentSession.InitialGeoposition;


                        //var data = UsersCache.GetUsersCache().Where(arg => arg.Key != UserId);

                        //var profilesWithNearestSession = new Dictionary<ProfileInfoModel, double>();
                        //foreach ((var user_id, var user_data) in data)
                        //{
                        //    var sessionsList = user_data.Sessions.Values;

                        //    var sessionsWithDistance = sessionsList
                        //        .Where(arg => arg.CurrentGeoposition is not null || arg.InitialGeoposition is not null)
                        //        .Select(arg => (arg, arg.CurrentGeoposition is not null ? ))
                                //.Select(arg => (arg, arg.)

                            //sessionsList.Select()
                        //}
                            //.GroupBy(arg => arg.)
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
                            .OrderByDescending(arg => arg.Value.Item2.Intersect(myInterests).Count())
                            .Select(arg => arg.Value.Item1);

                        break;
                    }


                default:
                    throw new Exception();
            }

            usersList = usersList.Skip(skip).Take(take);

            return new ResponseModel(HttpStatusCode.OK, null, new()
            {
                { "users", usersList }
            })
            .ToResult();
        }

        [HttpGet]
        [Route("likes")]
        public async Task<IActionResult> GetLikesList([FromQuery][Required] int page, [FromQuery][Required] int size)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("GetLikedUsersList", connection) { CommandType = System.Data.CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("user_id", UserId),
                new MySqlParameter("skip", (page - 1) * size),
                new MySqlParameter("take", size)
            });

            connection.Open();
            using var reader = await command.ExecuteReaderAsync();

            var profiles = new List<ProfilePreviewModel>();

            while (reader.Read())
            {
                var profile = new ProfilePreviewModel
                {
                    Id = Convert.ToInt64(reader["id"]),
                    Name = reader["name"].ToString(),
                    Surname = reader["surname"].ToString(),
                };
                profile.Avatar = MediaClient.MediaClient.Image.GetAvatarBytes(profile.Id);

                profiles.Add(profile);
            }

            return new ResponseModel(
                HttpStatusCode.OK,
                null,
                new Dictionary<string, object>
                {
                    { "profiles", profiles }
                })
                .ToResult();
        }

        [HttpGet]
        [Route("visits")]
        public async Task<IActionResult> GetVisitsList([FromQuery][Required] int page, [FromQuery][Required] int size)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("GetVisitsList", connection) { CommandType = System.Data.CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("user_id", UserId),
                new MySqlParameter("skip", (page - 1) * size),
                new MySqlParameter("take", size)
            });

            connection.Open();
            using var reader = await command.ExecuteReaderAsync();

            var profiles = new List<ProfilePreviewModel>();

            while (reader.Read())
            {
                var profile = new ProfilePreviewModel
                {
                    Id = Convert.ToInt64(reader["id"]),
                    Name = reader["name"].ToString(),
                    Surname = reader["surname"].ToString(),
                };
                profile.Avatar = MediaClient.MediaClient.Image.GetAvatarBytes(profile.Id);

                profiles.Add(profile);
            }

            return new ResponseModel(
                HttpStatusCode.OK,
                null,
                new Dictionary<string, object>
                {
                    { "profiles", profiles }
                })
                .ToResult();
        }
    }
}
