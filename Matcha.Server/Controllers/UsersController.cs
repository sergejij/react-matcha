using Matcha.Server.Extensions;
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
        private sealed record ProfileFullDataModel
        {
            public string Name { get; set; }

            public string Surname { get; set; }

            public string Location { get; set; }

            public int? Age { get; set; }

            public string Post { get; set; }

            public string Biography { get; set; }

            public string Sex { get; set; }

            public string SexPreference { get; set; }

            public string RelationshipStatus { get; set; }

            public string AttitudeToSmoking { get; set; }

            public string AttitudeToAlcohol { get; set; }

            public HashSet<string> Interests { get; set; }

            public int Rating { get; set; }

            public List<SessionDataModel> Sessions { get; set; }
        }

        private sealed record SessionDataModel
        {
            public long Id { get; set; }

            public string OS { get; set; }

            public string IP { get; set; }

            public string Country { get; set; }

            public string City { get; set; }

            public string Browser { get; set; }

            public GeoCoordinate InitialCoordinates { get; set; }

            public GeoCoordinate CurrentCoordinates { get; set; }
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetUsersList([Required][FromQuery] SortParametersModel sortParameters)
        {
            var profiles = new Dictionary<long, ProfileFullDataModel>();

            #region Получение списка пользователей

            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("GetUsersFullDataList", connection) { CommandType = System.Data.CommandType.StoredProcedure };

            connection.Open();
            using var reader = await command.ExecuteReaderAsync();

            while (reader.Read())
            {
                var userId = Convert.ToInt64(reader["user_id"]);

                profiles.Add(userId, new ProfileFullDataModel
                {
                    Name = reader.StringOrEmpty("name"),
                    Surname = reader.StringOrEmpty("surname"),
                    Location = reader.StringOrEmpty("location"),
                    Age = reader.NullableInt("age"),
                    Post = reader.StringOrEmpty("post"),
                    Biography = reader.StringOrEmpty("biography"),
                    Sex = reader.StringOrEmpty("sex"),
                    SexPreference = reader.StringOrEmpty("sex_preference"),
                    RelationshipStatus = reader.StringOrEmpty("relationship_status"),
                    AttitudeToSmoking = reader.StringOrEmpty("attitude_to_smoking"),
                    AttitudeToAlcohol = reader.StringOrEmpty("attitude_to_alcohol"),
                    Interests = reader.StringOrEmpty("interests")?.Split(',').ToHashSet(),
                    Rating = Convert.ToInt32(reader["rating"]),

                    Sessions = new List<SessionDataModel>()
                });
            }

            reader.NextResult();

            while (reader.Read())
            {
                var userId = Convert.ToInt64(reader["user_id"]);

                profiles[userId].Sessions.Add(new SessionDataModel
                {
                    Id = Convert.ToInt64(reader["session_id"]),
                    Country = reader.StringOrEmpty("country"),
                    City = reader.StringOrEmpty("city"),
                    OS = reader.StringOrEmpty("OS"),
                    IP = reader.StringOrEmpty("IP"),
                    Browser= reader.StringOrEmpty("browser"),
                    InitialCoordinates = reader.TryParseGeoCoordinate("initial_latitude", "initial_longitude"),
                    CurrentCoordinates = reader.TryParseGeoCoordinate("current_latitude", "current_longitude")
                });
            }

            #endregion

            IEnumerable<KeyValuePair<long, ProfileFullDataModel>> matches = null;

            switch (sortParameters.OrderBy)
            {
                case OrderMethodsEnum.Id:
                    {
                        matches = profiles
                            .OrderBy(arg => arg.Key);
                        break;
                    }

                case OrderMethodsEnum.Rating:
                    {
                        matches = profiles
                            .OrderByDescending(arg => arg.Value.Rating)
                            .Where(arg => !sortParameters.Min.HasValue || arg.Value.Rating >= sortParameters.Min.Value);
                        break;
                    }

                case OrderMethodsEnum.Age:
                    {
                        matches = profiles
                            .OrderByDescending(arg => arg.Value.Age.HasValue)
                            .ThenBy(arg => arg.Value.Age)
                            .Where(arg => !sortParameters.Min.HasValue || arg.Value.Age >= sortParameters.Min.Value)
                            .Where(arg => !sortParameters.Max.HasValue || arg.Value.Age <= sortParameters.Max.Value);
                        break;
                    }

                case OrderMethodsEnum.CommonInterests:
                    {
                        var me = profiles[UserId];

                        matches = profiles
                            .Where(arg => me.Interests.Intersect(arg.Value.Interests).Count() >= (sortParameters.Min ?? 1))
                            .OrderByDescending(arg => me.Interests.Intersect(arg.Value.Interests).Count());
                        break;
                    }

                case OrderMethodsEnum.Distance:
                    {
                        break;
                    }
            }

            var previewModels = matches
                .Where(arg => arg.Key != UserId)
                .Skip((sortParameters.Page - 1) * sortParameters.Size)
                .Take(sortParameters.Size)
                .Select(arg => new ProfilePreviewModel
                {
                    Id = arg.Key,
                    Name = arg.Value.Name,
                    Surname = arg.Value.Surname,
                    Avatar = MediaClient.MediaClient.Image.GetAvatarBytes(arg.Key)
                });

            return new ResponseModel(
                HttpStatusCode.OK,
                null,
                new Dictionary<string, object>
                {
                    { "users", previewModels }
                })
                .ToResult();
        }
        //public async Task<IActionResult> GetUsersList([Required][FromQuery] SortParametersModel sortParameters)
        //{
        //    using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
        //    using var command = new MySqlCommand("GetUsersFullDataList", connection) { CommandType = System.Data.CommandType.StoredProcedure };

        //    command.Parameters.AddRange(new[]
        //    {
        //        new MySqlParameter("order_by", sortParameters.OrderBy.ToString()),
        //        new MySqlParameter("min", sortParameters.)
        //        new MySqlParameter("skip", (sortParameters.Page - 1) * sortParameters.Size),
        //        new MySqlParameter("take", sortParameters.Size)
        //    });

        //    connection.Open();
        //    using var reader = await command.ExecuteReaderAsync();

        //    var profiles = new List<ProfileInfoModel>();



        //    //IEnumerable<ProfileInfoModel> usersList = null;

        //    //switch (sortParameters.OrderBy)
        //    //{
        //    //    case OrderMethodsEnum.Id:
        //    //        {
        //    //            usersList = UsersCache.UsersCache.GetAllUsers() UsersCache.GetProfiles()
        //    //                    .Where(arg => arg.Key != UserId)
        //    //                    .Select(arg => arg.Value);
        //    //            break;
        //    //        }

        //    //    case OrderMethodsEnum.Age:
        //    //        {
        //    //            usersList = UsersCache.GetProfiles()
        //    //                    .Where(arg => arg.Key != UserId)
        //    //                    .Select(arg => arg.Value)
        //    //                    .OrderByDescending(arg => arg.Age.HasValue)
        //    //                    .ThenBy(arg => arg.Age)
        //    //                    .Where(arg => !sortParameters.MinAge.HasValue || arg.Age >= sortParameters.MinAge.Value)
        //    //                    .Where(arg => !sortParameters.MaxAge.HasValue || arg.Age <= sortParameters.MaxAge.Value);
        //    //            break;
        //    //        }

        //    //    case OrderMethodsEnum.Rating:
        //    //        {
        //    //            usersList = UsersCache.GetProfiles()
        //    //                    .Where(arg => arg.Key != UserId)
        //    //                    .Select(arg => arg.Value)
        //    //                    .OrderByDescending(arg => arg.Rating)
        //    //                    .Where(arg => !sortParameters.MinRating.HasValue || arg.Rating >= sortParameters.MinRating.Value);
        //    //            break;
        //    //        }

        //    //    case OrderMethodsEnum.Distance:
        //    //        {
        //    //            //var me = UsersCache.GetUserCacheModel(UserId);
        //    //            //var myCurrentSession = me.Sessions[SessionId];

        //    //            //if (myCurrentSession.CurrentGeoposition is null && myCurrentSession.InitialGeoposition is null)
        //    //            //    return null; // return orderbiyd

        //    //            //var myGeoposition = myCurrentSession.CurrentGeoposition ?? myCurrentSession.InitialGeoposition;


        //    //            //var data = UsersCache.GetUsersCache().Where(arg => arg.Key != UserId);

        //    //            //var profilesWithNearestSession = new Dictionary<ProfileInfoModel, double>();
        //    //            //foreach ((var user_id, var user_data) in data)
        //    //            //{
        //    //            //    var sessionsList = user_data.Sessions.Values;

        //    //            //    var sessionsWithDistance = sessionsList
        //    //            //        .Where(arg => arg.CurrentGeoposition is not null || arg.InitialGeoposition is not null)
        //    //            //        .Select(arg => (arg, arg.CurrentGeoposition is not null ? ))
        //    //            //.Select(arg => (arg, arg.)

        //    //            //sessionsList.Select()
        //    //            //}
        //    //            //.GroupBy(arg => arg.)
        //    //            //var sessions = UsersCache.GetSessions();
        //    //            //usersList = UsersCache.GetProfiles()


        //    //            break;
        //    //        }

        //    //    case OrderMethodsEnum.CommonInterests:
        //    //        {
        //    //            var myInterests = UsersCache.GetUserInterests(UserId);

        //    //            usersList = UsersCache.GetProfilesWithInterests()
        //    //                .Where(arg => arg.Key != UserId)
        //    //                .Where(arg => arg.Value.Item2.Intersect(myInterests).Count() >= sortParameters.MinCommonInterests)
        //    //                .OrderByDescending(arg => arg.Value.Item2.Intersect(myInterests).Count())
        //    //                .Select(arg => arg.Value.Item1);

        //    //            break;
        //    //        }


        //    //    default:
        //    //        throw new Exception();
        //    //}

        //    //usersList = usersList.Skip(skip).Take(take);

        //    //return new ResponseModel(HttpStatusCode.OK, null, new()
        //    //{
        //    //    { "users", usersList }
        //    //})
        //    //.ToResult();

        //    return default;
        //}

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
