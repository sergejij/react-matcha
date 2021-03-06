﻿using Matcha.Server.CustomExceptions;
using Matcha.Server.Extensions;
using Matcha.Server.Filters;
using Matcha.Server.Models;
using Matcha.Server.Models.Profile;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using server.Response;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Dynamic;
using System.Net;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;

namespace Matcha.Server.Controllers
{
    [Route("profile")]
    [ApiController]
    [AuthorizeFilter]
    [ExceptionHandlerFilter]
    public class ProfileController : BaseMatchaController
    {
        #region Получение выпадающих списков
    
        [HttpGet]
        [Route("attitudes_list")]
        public async Task<IActionResult> GetAttitudesListAsync()
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("GetAttitudesList", connection) { CommandType = CommandType.StoredProcedure };

            connection.Open();
            using var reader = await command.ExecuteReaderAsync();

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
        public async Task<IActionResult> GetSexesListAsync()
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("GetSexesList", connection) { CommandType = CommandType.StoredProcedure };

            connection.Open();
            using var reader = await command.ExecuteReaderAsync();

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

        [HttpGet]
        [Route("relationships_list")]
        public async Task<IActionResult> GetRelationshipsStatusesListAsync()
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("GetRelationshipsStatusesList", connection) { CommandType = CommandType.StoredProcedure };

            connection.Open();
            using var reader = await command.ExecuteReaderAsync();

            var statuses = new HashSet<string>();

            while (reader.Read())
                statuses.Add(reader.GetString(0));

            return new ResponseModel(HttpStatusCode.OK, null,
                                     new Dictionary<string, object>
                                     {
                                         { "relationshipsStatuses", statuses }
                                     })
                .ToResult();
        }

        #endregion

        #region Обновление данных авторизации

        [HttpPut]
        [Route("change_email")]
        public async Task<IActionResult> ChangeEmailAsync(EmailChangeModel emailChangeModel)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("IsEmailRegistered", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("email", emailChangeModel.NewEmail),
                new MySqlParameter("registered", MySqlDbType.Bit) { Direction = ParameterDirection.ReturnValue }
            });

            connection.Open();
            await command.ExecuteNonQueryAsync();

            bool registered = Convert.ToBoolean(command.Parameters["registered"].Value);
            if (registered)
                return new ResponseModel(HttpStatusCode.Conflict, "Email уже используется").ToResult();

            var confirmationCode = Guid.NewGuid();
            await AccountController.AddConfirmationCodeAsync(MyId, emailChangeModel.NewEmail, confirmationCode);
            await AccountController.SendConfirmationCodeAsync(emailChangeModel.NewEmail, confirmationCode);

            return ResponseModel.OK.ToResult();
        }

        [HttpPut]
        [Route("change_password")]
        public async Task<IActionResult> ChangePassword(PasswordChangeModel passwordModel)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("ChangePassword", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("user_id", MyId),
                new MySqlParameter("current_password", passwordModel.CurrentPassword),
                new MySqlParameter("new_password", passwordModel.NewPassword)
            });

            connection.Open();
            await command.ExecuteNonQueryAsync();

            return ResponseModel.OK.ToResult();
        }

        [HttpPut]
        [Route("change_login")]
        public async Task<IActionResult> ChangeLogin(LoginChangeModel loginModel)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("ChangeLogin", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("user_id", MyId),
                new MySqlParameter("new_login", loginModel.NewLogin),
                new MySqlParameter("password", loginModel.Password)
            });

            connection.Open();
            await command.ExecuteNonQueryAsync();

            return ResponseModel.OK.ToResult();
        }

        #endregion

        #region Работа с фото

        [HttpPut]
        [Route("avatar")]
        public IActionResult UploadAvatar([FromForm][Required] IFormFile avatar)
        {
            MediaClient.MediaClient.Image.SaveAvatar(MyId, avatar);

            return ResponseModel.OK.ToResult();
        }

        [HttpGet]
        [Route("avatar")]
        public IActionResult GetAvatar([FromQuery] long? userId)
        {
            var avatarBytes = MediaClient.MediaClient.Image.GetAvatarBytes(userId ?? MyId);

            return new ResponseModel(HttpStatusCode.OK, null, new Dictionary<string, object>
                                                              {
                                                                  { "avatar", avatarBytes }
                                                              })
                .ToResult();
        }

        [HttpPut]
        [Route("photo")]
        public IActionResult UploadPhoto([FromForm][Required] PhotoUploadModel photo)
        {
            MediaClient.MediaClient.Image.SavePhoto(MyId, photo);

            return ResponseModel.OK.ToResult();
        }

        [HttpDelete]
        [Route("photo")]
        public IActionResult DeletePhoto([FromQuery][Required] int id)
        {
            MediaClient.MediaClient.Image.DeletePhoto(MyId, id);

            return ResponseModel.OK.ToResult();
        }

        [HttpGet]
        [Route("photos")]
        public IActionResult GetPhotos([FromQuery] long? userId)
        {
            var photos = MediaClient.MediaClient.Image.GetAllPhotos(userId ?? MyId);

            return new ResponseModel(HttpStatusCode.OK, null, new Dictionary<string, object>
                                                              {
                                                                  { "photos", photos }
                                                              })
                .ToResult();
        }

        #endregion

        #region Информация о профиле

        [HttpGet]
        [Route("auth_data")]
        public async Task<IActionResult> GetAuthDataAsync()
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("GetAuthData", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("user_id", MyId),

                new MySqlParameter("login", MySqlDbType.VarChar) { Direction = ParameterDirection.Output },
                new MySqlParameter("email", MySqlDbType.VarChar) { Direction = ParameterDirection.Output }
            });

            connection.Open();
            await command.ExecuteNonQueryAsync();

            return new ResponseModel(HttpStatusCode.OK,
                                     null,
                                     new Dictionary<string, object>
                                     {
                                         { "login", command.Parameters["login"].Value },
                                         { "email", command.Parameters["email"].Value },
                                     })
                .ToResult();
        }

        [HttpPatch]
        [Route("biography")]
        public async Task<IActionResult> UpdateBiographyAsync(UpdateBiographyModel biography)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("UpdateBiography", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("user_id", MyId),
                new MySqlParameter("biography", biography.Biography)
            });

            connection.Open();
            await command.ExecuteNonQueryAsync();

            return ResponseModel.OK.ToResult();
        }

        [HttpGet]
        [Route("info")]
        public async Task<IActionResult> GetProfileInfoAsync([FromQuery] long? userId)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("GetProfileInfo", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("user_id", userId ?? MyId)
            });

            connection.Open();
            using var reader = await command.ExecuteReaderAsync();

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
                { "biography", reader.StringOrEmpty("biography") },
                { "rating", reader.StringOrEmpty("rating") }
            };

            return new ResponseModel(HttpStatusCode.OK, null, fields).ToResult();
        }

        [HttpPost]
        [Route("info")]
        public async Task<IActionResult> InitProfileInfoAsync(ProfileInfoModel profileInfo)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("PutProfileInfo", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("user_id", MyId),
                new MySqlParameter("post", profileInfo.Post),
                new MySqlParameter("location", profileInfo.Location),
                new MySqlParameter("age", profileInfo.Age),
                new MySqlParameter("sex", profileInfo.Sex),
                new MySqlParameter("rel_status", profileInfo.RelationshipStatus),
                new MySqlParameter("sex_preference", profileInfo.SexPreference),
                new MySqlParameter("smoking_attitude", profileInfo.AttitudeToSmoking),
                new MySqlParameter("alcohol_attitude", profileInfo.AttitudeToAlcohol),
                new MySqlParameter("biography", profileInfo.Biography),

                //TODO: убрать
                new MySqlParameter("error_message", MySqlDbType.VarChar) { Direction = ParameterDirection.ReturnValue }
            });

            connection.Open();
            await command.ExecuteNonQueryAsync();

            var errorMessage = command.Parameters["error_message"].Value.ToString();
            if (string.IsNullOrEmpty(errorMessage) == false)
                return new ResponseModel(HttpStatusCode.Conflict, errorMessage).ToResult();

            return ResponseModel.OK.ToResult();
        }

        [HttpPut]
        [Route("info")]
        public async Task<IActionResult> UpdateInfoAsync(ProfileInfoModel profileInfo)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("UpdateProfileInfo", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("user_id", MyId),
                new MySqlParameter("name", profileInfo.Name),
                new MySqlParameter("surname", profileInfo.Surname),
                new MySqlParameter("age", profileInfo.Age),
                new MySqlParameter("post", profileInfo.Post),
                new MySqlParameter("location", profileInfo.Location)
            });

            connection.Open();
            await command.ExecuteNonQueryAsync();

            return ResponseModel.OK.ToResult();
        }

        #region Обновление выпадающих списков

        [HttpPatch]
        [Route("sex")]
        public async Task<IActionResult> UpdateSex(UpdateDropDownFieldModel dropDownField)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = connection.CreateCommand();

            command.CommandText = BuildPatchDropDownListCommand("sexes", "sex", "sex", dropDownField.Sex);

            connection.Open();
            await command.ExecuteNonQueryAsync();

            return ResponseModel.OK.ToResult();
        }

        [HttpPatch]
        [Route("sex_preference")]
        public async Task<IActionResult> UpdateSexPreference(UpdateDropDownFieldModel dropDownField)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = connection.CreateCommand();

            command.CommandText = BuildPatchDropDownListCommand("sexes", "sex", "sex_preference", dropDownField.SexPreference);

            connection.Open();
            await command.ExecuteNonQueryAsync();

            return ResponseModel.OK.ToResult();
        }

        [HttpPatch]
        [Route("relationship_status")]
        public async Task<IActionResult> UpdateRelationshipStatus(UpdateDropDownFieldModel dropDownField)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = connection.CreateCommand();

            command.CommandText = BuildPatchDropDownListCommand("relationship_statuses", "status", "relationship_status", dropDownField.RelationshipStatus);

            connection.Open();
            await command.ExecuteNonQueryAsync();

            return ResponseModel.OK.ToResult();
        }

        [HttpPatch]
        [Route("attitude_to_alcohol")]
        public async Task<IActionResult> UpdateAttitudeToAlcohol(UpdateDropDownFieldModel dropDownField)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = connection.CreateCommand();

            command.CommandText = BuildPatchDropDownListCommand("attitudes", "attitude", "attitude_to_alcohol", dropDownField.AttitudeToAlcohol);

            connection.Open();
            await command.ExecuteNonQueryAsync();

            return ResponseModel.OK.ToResult();
        }

        [HttpPatch]
        [Route("attitude_to_smoking")]
        public async Task<IActionResult> UpdateAttitudeToSmoking(UpdateDropDownFieldModel dropDownField)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = connection.CreateCommand();

            command.CommandText = BuildPatchDropDownListCommand("attitudes", "attitude", "attitude_to_smoking", dropDownField.AttitudeToSmoking);

            connection.Open();
            await command.ExecuteNonQueryAsync();

            return ResponseModel.OK.ToResult();
        }

        private string BuildPatchDropDownListCommand(string table, string table_column, string user_data_column, string value)
        {
            return
                $"UPDATE user_full_data\n" +
                $"SET {user_data_column} = (SELECT id FROM {table} WHERE {table}.{table_column} = '{value}')\n" +
                $"WHERE id = {MyId};";
        }

        #endregion

        #endregion

        #region Интересы пользователя

        [HttpPost]
        [HttpPut]
        [Route("interests")]
        public async Task<IActionResult> UpdateInterestsAsync(InterestsModel interests)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("AddInterestsList", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("user_id", MyId),
                new MySqlParameter("interests", string.Join(',', interests.Interests))
            });

            connection.Open();
            await command.ExecuteNonQueryAsync();

            return ResponseModel.OK.ToResult();
        }

        [HttpGet]
        [Route("interests")]
        public async Task<IActionResult> GetInterestsListAsync([FromQuery] long? userId)
        {
            if (userId.HasValue is false)
                userId = MyId;

            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("GetUserInterests", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("user_id", userId),
                new MySqlParameter("interests", MySqlDbType.VarChar) { Direction = ParameterDirection.ReturnValue }
            });

            connection.Open();
            await command.ExecuteNonQueryAsync();

            var interestsList = command.Parameters["interests"]?.Value.ToString()
                .Split(',');

            return new ResponseModel(
                HttpStatusCode.OK,
                null,
                new Dictionary<string, object>
                {
                    { "interests", interestsList }
                })
                .ToResult();
        }

        #endregion

        #region Сессии

        [HttpGet]
        [Route("sessions")]
        public async Task<IActionResult> GetSessions()
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("GetUserSessions", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.Add(new MySqlParameter("user_id", MyId));

            connection.Open();
            using var reader = await command.ExecuteReaderAsync();

            var sessions = new List<SessionInfoModel>();

            while (reader.Read())
            {
                sessions.Add(new SessionInfoModel
                {
                    Id = Convert.ToInt64(reader["session_id"]),
                    OS = reader.StringOrEmpty("OS"),
                    IP = reader.StringOrEmpty("IP"),
                    Browser = reader.StringOrEmpty("browser"),
                    Country = reader.StringOrEmpty("country"),
                    City = reader.StringOrEmpty("city")
                });
            }

            return new ResponseModel(
                HttpStatusCode.OK,
                null,
                new Dictionary<string, object>
                {
                    { "sessions", sessions }
                })
            .ToResult();
        }

        [HttpPost]
        [Route("close_other_sessions")]
        public async Task<IActionResult> CloseSessionsButCurrentAsync()
        {
            WebSocketsManager.WebSocketsManager.CloseAllButOne(MyId, SessionId);

            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("CloseAllSessionsButOne", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.Add(new MySqlParameter("untouchable_session_id", SessionId));

            connection.Open();
            await command.ExecuteNonQueryAsync();

            return new ResponseModel(
                    HttpStatusCode.OK,
                    null,
                    new Dictionary<string, object>
                    {
                        { "mySessionID", SessionId }
                    })
                .ToResult();
        }

        [HttpPost]
        [Route("close_session_remotely")]
        public async Task<IActionResult> CloseSessionById(CloseSessionModel session)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("CloseSessionById", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("user_id", MyId),
                new MySqlParameter("session_id", session.SessionId)
            });

            connection.Open();
            await command.ExecuteNonQueryAsync();

            return ResponseModel.OK.ToResult();
        }

        #endregion

        #region Лайки-дизлайки-посещения

        [HttpPost]
        [Route("visit")]
        public async Task<IActionResult> VisitProfile([FromQuery][Required] long userId)
        {
            if (userId == MyId)
                return ResponseModel.OK.ToResult();

            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("VisitProfile", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("who", MyId),
                new MySqlParameter("whom", userId)
            });

            connection.Open();
            await command.ExecuteNonQueryAsync();
            
            await WebSocketsManager.WebSocketsManager.Send(
                userId,
                new WebSocketResponseModel
                {
                    Type = WebSocketRequestType.Notification.ToString(),
                    Sender = WebSocketsController.GetProfileShortInfo(MyId),
                    Notification = new WebSocketResponseNotification
                    {
                        Type = WebSocketNotificationType.Visit.ToString(),
                        Actioner = MyId
                    }
                }
            );

            return ResponseModel.OK.ToResult();
        }

        [HttpPost]
        [Route("like")]
        public async Task<IActionResult> LikeProfile([FromQuery][Required] long userId)
        {
            if (userId == MyId)
                throw new MatchaException(HttpStatusCode.Forbidden, "Нельзя поставить лайк самому себе");

            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("LikeProfile", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("who", MyId),
                new MySqlParameter("whom", userId),

                new MySqlParameter("liked_yet", MySqlDbType.Bit) {Direction = ParameterDirection.ReturnValue }
            });
            
            connection.Open();
            await command.ExecuteNonQueryAsync();

            var liked = Convert.ToBoolean(command.Parameters["liked_yet"].Value);
            if (liked is false)
            {
                await WebSocketsManager.WebSocketsManager.Send(
                    userId,
                    new WebSocketResponseModel
                    {
                        Type = WebSocketRequestType.Notification.ToString(),
                        Sender = WebSocketsController.GetProfileShortInfo(MyId),
                        Notification = new WebSocketResponseNotification
                        {
                            Type = WebSocketNotificationType.Like.ToString(),
                            Actioner = MyId
                        }
                    }
                );
            }

            return ResponseModel.OK.ToResult();
        }

        [HttpPost]
        [Route("dislike")]
        public async Task<IActionResult> DislikeProfile([FromQuery][Required] long userId)
        {
            if (userId == MyId)
                throw new MatchaException(HttpStatusCode.Forbidden, "Нельзя поставить дизлайк самому себе");

            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("DislikeProfile", connection) { CommandType = CommandType.StoredProcedure };
            
            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("who", MyId),
                new MySqlParameter("whom", userId),

                new MySqlParameter("disliked_yet", MySqlDbType.Bit) { Direction = ParameterDirection.ReturnValue }
            });

            connection.Open();
            await command.ExecuteNonQueryAsync();

            var disliked = Convert.ToBoolean(command.Parameters["disliked_yet"].Value);
            if (disliked is false)
            {
                await WebSocketsManager.WebSocketsManager.Send(
                    userId,
                    new WebSocketResponseModel
                    {
                        Type = WebSocketRequestType.Notification.ToString(),
                        Sender = WebSocketsController.GetProfileShortInfo(MyId),
                        Notification = new WebSocketResponseNotification
                        {
                            Type = WebSocketNotificationType.Dislike.ToString(),
                            Actioner = MyId
                        }
                    }
                );
            }

            return ResponseModel.OK.ToResult();
        }

        #endregion
    }
}
