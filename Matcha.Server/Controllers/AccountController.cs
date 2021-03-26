using Matcha.Server.Filters;
using Matcha.Server.Models.Account;
using Matcha.Server.Models.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using server.Response;
using System;
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

                    new MySqlParameter("user_id", MySqlDbType.Int64) { Direction = ParameterDirection.Output },
                    new MySqlParameter("error_message", MySqlDbType.VarChar) { Direction = ParameterDirection.Output }
                });

            connection.Open();
            command.ExecuteNonQuery();

            var errorMessage = command.Parameters["error_message"].Value.ToString();
            if (string.IsNullOrEmpty(errorMessage) == false)
                return new ResponseModel(HttpStatusCode.Conflict, errorMessage).ToResult();

            var userId = Convert.ToInt64(command.Parameters["user_id"].Value);

            var confirmationCode = Guid.NewGuid();
            AddConfirmationCode(userId, registerModel.Email, confirmationCode);
            SendConfirmationCode(registerModel.Email, confirmationCode);

            return ResponseModel.OK().ToResult();
        }

        [HttpPost]
        [Route("confirm_email")]
        public IActionResult ConfirmEmail([Required][FromQuery] Guid code)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("ConfirmEmail", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                    new MySqlParameter("code", code.ToString()),
                    new MySqlParameter("error_message", MySqlDbType.VarChar) { Direction = ParameterDirection.ReturnValue }
                });

            connection.Open();
            command.ExecuteNonQuery();

            var errorMessage = command.Parameters["error_message"].Value.ToString();
            if (string.IsNullOrEmpty(errorMessage) == false)
                return new ResponseModel(HttpStatusCode.InternalServerError, errorMessage).ToResult();

            return ResponseModel.OK().ToResult();
        }



        ////TODO: change_email, update_email
        //[AuthorizeFilter]
        //[HttpPost]
        //[Route("change_email")]
        //public IActionResult ChangeEmail([FromQuery] string email)
        //{
        //    var dbRet = DatabaseApi.Account.ChangeEmail(UserId, email);
        //}


        [HttpPost]
        [Route("login")]
        public IActionResult Login(AccountAuthModel authModel)
        {
            // TODO: Переименовать loginbylogin и loginbyemail в A_B case
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("Login", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                    new MySqlParameter("email", authModel.Email),
                    new MySqlParameter("password", authModel.Password),

                    new MySqlParameter("user_id", MySqlDbType.Int64) { Direction = ParameterDirection.Output },
                    new MySqlParameter("cookie", MySqlDbType.VarChar) { Direction = ParameterDirection.Output },

                    new MySqlParameter("error_message", MySqlDbType.VarChar) { Direction = ParameterDirection.Output }
                });

            connection.Open();
            command.ExecuteNonQuery();

            var errorMessage = command.Parameters["error_message"].Value.ToString();
            if (string.IsNullOrEmpty(errorMessage) == false)
                return new ResponseModel(HttpStatusCode.Unauthorized, errorMessage).ToResult();

            var cookie = command.Parameters["cookie"].Value.ToString();
            var userId = command.Parameters["user_id"].Value.ToString();

            Response.Cookies.Append(ResponseContentConstants.Cookie, cookie);
            Response.Cookies.Append(ResponseContentConstants.UserId, userId);

            return ResponseModel.OK().ToResult();
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
                    new MySqlParameter("userId", UserId),
                    new MySqlParameter("cookie", Cookie)
                });

                connection.Open();
                command.ExecuteNonQuery();
            }

            var cookieExpiredOption = new CookieOptions { Expires = DateTime.Now.AddDays(-1) };
            Response.Cookies.Append(ResponseContentConstants.Cookie, "", cookieExpiredOption);
            Response.Cookies.Append(ResponseContentConstants.UserId, "", cookieExpiredOption);

            return ResponseModel.OK().ToResult();
        }

        #region Вспомогательные методы

        private static void AddConfirmationCode(long userId, string email, Guid code)
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

        private static void SendConfirmationCode(string email, Guid code)
        {
            var codestr = code.ToString();

            var body = $"Тык: http://localhost:3000/confirm-email?code={codestr}\nhttps://81.177.141.123:637/confirm_email?code={codestr}";
            MailClient.MailClient.SendMail(email, "Подтверждение регистрации в Matcha", body);
        }

        #endregion
    }
}
