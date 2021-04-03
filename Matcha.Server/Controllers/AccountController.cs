using Matcha.Server.Filters;
using Matcha.Server.Models.Account;
using Matcha.Server.Models.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using server.Response;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Net;

namespace Matcha.Server.Controllers
{
    [Route("account")]
    [ApiController]
    [ExceptionHandlerFilter]
    public class AccountController : BaseMatchaController
    {
        #region Регистрация

        [HttpPost]
        [Route("register")]
        public IActionResult Register(AccountRegisterModel registerModel)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("RegisterUser", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                    new MySqlParameter("login", registerModel.Login),
                    new MySqlParameter("email", registerModel.Email),
                    new MySqlParameter("password", registerModel.Password),
                    new MySqlParameter("name", registerModel.Name),
                    new MySqlParameter("surname", registerModel.Surname),

                    new MySqlParameter("user_id", MySqlDbType.Int64) { Direction = ParameterDirection.ReturnValue }
                });

            connection.Open();
            command.ExecuteNonQuery();

            var userId = Convert.ToInt64(command.Parameters["user_id"].Value);

            var confirmationCode = Guid.NewGuid();
            AddConfirmationCode(userId, registerModel.Email, confirmationCode);
            SendConfirmationCode(registerModel.Email, confirmationCode);

            return ResponseModel.OK.ToResult();
        }

        #endregion

        #region Вход/выход

        [HttpPost]
        [Route("login")]
        public IActionResult Login(AccountAuthModel authModel)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("Login", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("email", authModel.Email),
                new MySqlParameter("password", authModel.Password),

                new MySqlParameter("user_id", MySqlDbType.Int64) { Direction = ParameterDirection.Output },
                new MySqlParameter("session_id", MySqlDbType.VarChar) { Direction = ParameterDirection.Output }
            });

            connection.Open();
            command.ExecuteNonQuery();

            var userId = command.Parameters["user_id"].Value.ToString();
            var sessionId = command.Parameters["session_id"].Value.ToString();

            Response.Cookies.Append(ResponseContentConstants.SessionId, sessionId);
            Response.Cookies.Append(ResponseContentConstants.UserId, userId);

            return new ResponseModel(HttpStatusCode.OK, null, new Dictionary<string, object>
                                                              {
                                                                  { "userId", userId }
                                                              })
                .ToResult();
        }

        [HttpPost]
        [Route("logout")]
        public IActionResult Logout()
        {
            if (Authorized)
            {
                using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
                using var command = new MySqlCommand("Logout", connection) { CommandType = CommandType.StoredProcedure };

                command.Parameters.AddRange(new[]
                {
                    new MySqlParameter("user_id", UserId),
                    new MySqlParameter("session_id", SessionId)
                });

                connection.Open();
                command.ExecuteNonQuery();
            }

            var cookieExpiredOption = new CookieOptions { Expires = DateTime.Now.AddDays(-1) };
            Response.Cookies.Append(ResponseContentConstants.SessionId, string.Empty, cookieExpiredOption);
            Response.Cookies.Append(ResponseContentConstants.UserId, string.Empty, cookieExpiredOption);

            return ResponseModel.OK.ToResult();
        }

        #endregion

        #region Работа с почтой

        [HttpPost]
        [Route("confirm_email")]
        public IActionResult ConfirmEmail([Required][FromQuery] Guid code)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("ConfirmEmail", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.Add(new MySqlParameter("code", code.ToString()));

            connection.Open();
            command.ExecuteNonQuery();

            return ResponseModel.OK.ToResult();
        }

        public static void AddConfirmationCode(long userId, string email, Guid code)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("AddConfirmationCode", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("user_id", userId),
                new MySqlParameter("email", email),
                new MySqlParameter("code", code.ToString())
            });

            connection.Open();
            command.ExecuteNonQuery();
        }

        public static void SendConfirmationCode(string email, Guid code)
        {
            var codeToStr = code.ToString();

            var body = $"Тык: http://localhost:3000/confirm-email?code={codeToStr}\nhttps://81.177.141.123:637/confirm_email?code={codeToStr}";
            MailClient.MailClient.SendMail(email, "Подтверждение почты для Matcha", body);
        }

        #endregion
    }
}
