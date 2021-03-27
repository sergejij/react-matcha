using Matcha.Server.Extensions;
using Matcha.Server.Filters;
using Matcha.Server.Models.Profile;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using server.Response;
using System;
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
                new MySqlParameter("smoking_attitude", profileInfo.AttitudeToSmoking),
                new MySqlParameter("alcohol_attitude", profileInfo.AttitudeToAlcohol),
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
                return new ResponseModel(HttpStatusCode.NoContent, "Пользователь с таким ID не найден").ToResult();

            reader.Read();
            var fields = new Dictionary<string, object>
            {
                { "name", reader.StringOrEmpty("name") },
                { "surname", reader.StringOrEmpty("surname") },
                { "location", reader.StringOrEmpty("location") },
                { "relationshipStatus", reader.StringOrEmpty("relationship_status") },
                { "attitudeToAlcohol", reader.StringOrEmpty("attitude_to_alcohol") },
                { "attitudeToSmoking", reader.StringOrEmpty("attitude_to_smoking") },
                { "age", reader.StringOrEmpty("age") },
                { "post", reader.StringOrEmpty("post") },
                { "sex", reader.StringOrEmpty("sex") },
                { "sexPreference", reader.StringOrEmpty("sex_preference") },
                { "biography", reader.StringOrEmpty("biography") }
            };

            return new ResponseModel(HttpStatusCode.OK, null, fields).ToResult();
        }

        [HttpPost]
        [Route("visit_notification")]
        public IActionResult ProfileVisitEvent([FromQuery][Required] long visitedProfileId)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("AddProfileVisiter", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("visiter_id", UserId),
                new MySqlParameter("visited_id", visitedProfileId)
            });

            connection.Open();
            using var reader = command.ExecuteReader();

            return ResponseModel.OK().ToResult();
        }

        [HttpPost]
        [Route("like_notification")]
        public IActionResult ProfileLikeEvent([FromQuery][Required] long likedProfileId)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            connection.Open();

            using (var command = new MySqlCommand("AddProfileLike", connection) { CommandType = CommandType.StoredProcedure })
            {
                command.Parameters.AddRange(new[]
                {
                    new MySqlParameter("liker_id", UserId),
                    new MySqlParameter("liked_id", likedProfileId)
                });

                command.ExecuteNonQuery();
            }

            using (var command = new MySqlCommand("IsLikesMutuals", connection) { CommandType = CommandType.StoredProcedure })
            {
                command.Parameters.AddRange(new[]
                {
                    new MySqlParameter("first_id", UserId),
                    new MySqlParameter("second_id", likedProfileId),

                    new MySqlParameter("mutual", MySqlDbType.Bit) { Direction = ParameterDirection.ReturnValue }
                });

                command.ExecuteNonQuery();

                return new ResponseModel(HttpStatusCode.OK, null, new Dictionary<string, object>
                                                                  {
                                                                      { "mutual", Convert.ToBoolean(command.Parameters["mutual"].Value) }
                                                                  })
                    .ToResult();
            }
        }

        [HttpPut]
        [Route("upload_avatar")]
        public IActionResult UploadAvatar([FromForm][Required] IFormFile avatar)
        {
            MediaClient.MediaClient.Image.UploadAvatar(avatar, UserId);

            return ResponseModel.OK().ToResult();
        }

        [HttpGet]
        [Route("get_avatar")]
        public IActionResult GetAvatar()
        {
            var avatarBytes = MediaClient.MediaClient.Image.GetAvatarBytes(UserId);

            return new ResponseModel(HttpStatusCode.OK, null, new Dictionary<string, object>
                                                              {
                                                                  { "avatar", avatarBytes }
                                                              })
                .ToResult();
        }

        [HttpGet]
        [Route("get_photos")]
        public IActionResult GetPhotos()
        {
            var photos = MediaClient.MediaClient.Image.GetAllPhotos(UserId);

            return new ResponseModel(HttpStatusCode.OK, null, new Dictionary<string, object>
                                                              {
                                                                  { "photos", photos }
                                                              })
                .ToResult();
        }

        [HttpPost]
        [Route("change_email")]
        public IActionResult ChangeEmail(EmailChangeModel emailChangeModel)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("IsEmailRegistered", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("email", emailChangeModel.NewEmail),
                new MySqlParameter("registered", MySqlDbType.Bit) { Direction = ParameterDirection.ReturnValue }
            });

            connection.Open();
            command.ExecuteNonQuery();

            bool registered = Convert.ToBoolean(command.Parameters["registered"].Value);
            if (registered)
                return new ResponseModel(HttpStatusCode.Conflict, "Email уже используется").ToResult();

            var confirmationCode = Guid.NewGuid();
            AccountController.AddConfirmationCode(UserId, emailChangeModel.NewEmail, confirmationCode);
            AccountController.SendConfirmationCode(emailChangeModel.NewEmail, confirmationCode);

            return ResponseModel.OK().ToResult();
        }

        [HttpPost]
        [Route("upload_photo")]
        public IActionResult UploadPhoto([FromForm][Required] PhotoUploadModel photo)
        {
            MediaClient.MediaClient.Image.UploadPhoto(photo, UserId);

            return ResponseModel.OK().ToResult();
        }

        [HttpPost]
        [Route("update_interests")]
        public IActionResult UpdateInterests(InterestsModel interests)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("AddInterestsList", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("user_id", UserId),
                new MySqlParameter("interests", string.Join(',', interests.Interests))
            });

            connection.Open();
            command.ExecuteNonQuery();

            return ResponseModel.OK().ToResult();
        }
    }
}
