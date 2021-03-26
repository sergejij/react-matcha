using Matcha.Server.Filters;
using Matcha.Server.Models.Profile;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using server.Response;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Net;

namespace Matcha.Server.Controllers
{
    [Route("profile")]
    [ApiController]
    [AuthorizeFilter]
    [ExceptionHandlerFilter]
    public class ProfileController : BaseMatchaController
    {
        [HttpGet]
        [Route("attitudes_list")]
        public IActionResult GetAttitudesList()
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("GetAttitudesList", connection) { CommandType = CommandType.StoredProcedure };

            connection.Open();
            using var reader = command.ExecuteReader();

            var attitudes = new HashSet<string>();

            while (reader.Read())
                attitudes.Add(reader.GetString(0));

            return new ResponseModel(HttpStatusCode.OK, null,
                                     new Dictionary<string, object>
                                     {
                                         { "attitudes", attitudes }
                                     })
                .ToResult();
        }

        [HttpGet]
        [Route("sexes_list")]
        public IActionResult GetSexesList()
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("GetSexesList", connection) { CommandType = CommandType.StoredProcedure };

            connection.Open();
            using var reader = command.ExecuteReader();

            var sexes = new HashSet<string>();
            while (reader.Read())
                sexes.Add(reader.GetString(0));

            return new ResponseModel(HttpStatusCode.OK, null,
                                     new Dictionary<string, object>
                                     {
                                         { "sexes", sexes }
                                     })
                .ToResult();
        }

        [HttpPut]
        [Route("update_info")]
        public IActionResult UpdateProfileInfo(ProfileInfoModel profileInfo)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("UpdateProfileInfo", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("user_id", UserId),
                new MySqlParameter("post", profileInfo.Post),
                new MySqlParameter("location", profileInfo.Location),
                new MySqlParameter("age", profileInfo.Age),
                new MySqlParameter("sex", profileInfo.Sex),
                new MySqlParameter("rel_status", profileInfo.RelationshipStatus),
                new MySqlParameter("sex_preference", profileInfo.SexPreference),
                new MySqlParameter("alcohol_attitude", profileInfo.AlcoholAttitude),
                new MySqlParameter("smoking_attitude", profileInfo.SmokingAttitude),
                new MySqlParameter("biography", profileInfo.Biography),

                new MySqlParameter("error_message", MySqlDbType.VarChar) { Direction = ParameterDirection.ReturnValue }
            });

            connection.Open();
            command.ExecuteNonQuery();

            //TODO: изменить код ошибки
            var errorMessage = command.Parameters["error_message"].Value.ToString();
            if (string.IsNullOrEmpty(errorMessage) == false)
                return new ResponseModel(HttpStatusCode.Conflict, errorMessage).ToResult();

            return ResponseModel.OK().ToResult();
        }

        [HttpGet]
        [Route("get_info")]
        public IActionResult GetProfileInfo([FromQuery][Required] long userId)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("GetProfileInfo", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                    new MySqlParameter("user_id", userId),
                    new MySqlParameter("error_message", MySqlDbType.VarChar) { Direction = ParameterDirection.Output }
                });

            connection.Open();
            using var reader = command.ExecuteReader();

            var errorMessage = command.Parameters["error_message"].Value?.ToString();
            if (string.IsNullOrEmpty(errorMessage) == false)
                return new ResponseModel(HttpStatusCode.NoContent, errorMessage).ToResult();

            reader.Read();
            var fields = new Dictionary<string, object>
            {
                { "name", reader["name"] },
                { "surname", reader["surname"] },
                { "location", reader["location"] },
                { "relationshipstatus", reader["relationship_status"] },
                { "attitudeToAlcohol", reader["attitude_to_alcohol"] },
                { "attitudeToSmoking", reader["attitude_to_smoking"] },
                { "age", reader["age"] },
                { "post", reader["post"] },
                { "sex", reader["sex"] },
                { "sexPreference", reader["sex_preference"] },
                { "biography", reader["biography"] }
            };

            return new ResponseModel(HttpStatusCode.OK, null, fields).ToResult();
        }
    }
}
