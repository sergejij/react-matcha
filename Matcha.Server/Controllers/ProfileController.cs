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

        

        #region Работа с фото

        [HttpPut]
        [Route("upload_avatar")]
        public IActionResult UploadAvatar([FromForm][Required] IFormFile avatar)
        {
            MediaClient.MediaClient.Image.SaveAvatar(UserId, avatar);

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

        [HttpPost]
        [Route("upload_photo")]
        public IActionResult UploadPhoto([FromForm][Required] PhotoUploadModel photo)
        {
            MediaClient.MediaClient.Image.SavePhoto(UserId, photo);

            return ResponseModel.OK().ToResult();
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

        #endregion

        #region Информация о профиле

        [HttpGet]
        [Route("info")]
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
        [Route("info")]
        public IActionResult UpdateProfileInfo(ProfileInfoModel profileInfo)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("PutProfileInfo", connection) { CommandType = CommandType.StoredProcedure };

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

            var errorMessage = command.Parameters["error_message"].Value.ToString();
            if (string.IsNullOrEmpty(errorMessage) == false)
                return new ResponseModel(HttpStatusCode.Conflict, errorMessage).ToResult();

            return ResponseModel.OK().ToResult();
        }

        [HttpPut]
        [Route("info")]
        public IActionResult UpdateInfo(InfoUpdateModel infoModel)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("UpdateProfileInfo", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("user_id", UserId),
                new MySqlParameter("name", infoModel.Name),
                new MySqlParameter("surname", infoModel.Surname),
                new MySqlParameter("age", infoModel.Age),
                new MySqlParameter("post", infoModel.Post),
                new MySqlParameter("location", infoModel.Location)
            });

            connection.Open();
            command.ExecuteNonQuery();

            return ResponseModel.OK().ToResult();
        }

        [HttpPatch]
        [Route("info")]
        public IActionResult UpdateStatus([FromBody] StatusUpdateModel statusUpdateModel)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            connection.Open();

            var table = FieldToTable[statusUpdateModel.Field].tableName;
            var tableCol = FieldToTable[statusUpdateModel.Field].columnName;
            var userDataCol = FieldToTable[statusUpdateModel.Field].userDataColumnMane;

            using var command = connection.CreateCommand();
            command.CommandText = $"IF NOT EXISTS(SELECT * FROM {table} WHERE {table}.{tableCol} = '{statusUpdateModel.Status}')\n" +
                                  $"THEN\n" +
                                  $"INSERT INTO {table} ({tableCol}) VALUES ('{statusUpdateModel.Status}');\n" +
                                  $"END IF;";

            command.ExecuteNonQuery();

            command.CommandText = $"UPDATE user_full_data\n" +
                                  $"SET {userDataCol} = (SELECT id FROM {table} WHERE {table}.{tableCol} = '{statusUpdateModel.Status}')\n" +
                                  $"WHERE id = {UserId};";

            command.ExecuteNonQuery();

            return ResponseModel.OK().ToResult();
        }

        private readonly static Dictionary<string, (string tableName, string columnName, string userDataColumnMane)> FieldToTable = new Dictionary<string, (string, string, string)>
        {
            { "relationshipStatus", ("relationship_statuses", "status",   "relationship_status") },
            { "sex",                ("sexes",                 "sex",      "sex") },
            { "sexPreference",      ("sexes",                 "sex",      "sex_preference") },
            { "attitudeToAlcohol",  ("attitudes",             "attitude", "attitude_to_alcohol") },
            { "attitudeToSmoking",  ("attitudes",             "attitude", "attitude_to_smoking") }
        };

        #endregion

        #region Интересы пользователя

        [HttpPost]
        [HttpPut]
        [Route("interests")]
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

        [HttpGet]
        [Route("interests")]
        public IActionResult GetInterestsList()
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("GetInterestsList", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("user_id", UserId)
            });

            connection.Open();
            
            var interests = new HashSet<string>();

            var reader = command.ExecuteReader();
            while (reader.Read())
            {
                interests.Add(reader.GetString(0));
            }

            return new ResponseModel(HttpStatusCode.OK, null, new Dictionary<string, object>
                                                              {
                                                                  { "interests", interests }
                                                              })
                .ToResult();
        }

        #endregion
    }
}
