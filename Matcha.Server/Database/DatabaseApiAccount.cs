using Matcha.Server.Models.Account;
using Matcha.Server.Models.Response;
using MySql.Data.MySqlClient;
using server.Response;
using System;
using System.Collections.Generic;
using System.Data;
using System.Net;
using static server.Response.ResponseModel;

namespace Matcha.Server.Database
{
    public sealed partial class DatabaseApi
    {
        public sealed class Account
        {
            public static ResponseModel Register(AccountRegisterModel userRegData)
            {
                using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
                using var command = new MySqlCommand("RegisterUser", connection) { CommandType = CommandType.StoredProcedure };

                command.Parameters.AddRange(new[]
                {
                    new MySqlParameter("login", userRegData.Login),
                    new MySqlParameter("email", userRegData.Email),
                    new MySqlParameter("password", userRegData.Password),
                    new MySqlParameter("name", userRegData.Name),
                    new MySqlParameter("surname", userRegData.Surname),

                    new MySqlParameter("error_message", MySqlDbType.VarChar) { Direction = ParameterDirection.ReturnValue }
                });

                connection.Open();
                command.ExecuteNonQuery();

                var errorMessage = command.Parameters["error_message"].Value.ToString();
                if (string.IsNullOrEmpty(errorMessage) == false)
                    return new ResponseModel(HttpStatusCode.Conflict, errorMessage);

                var confirmationCode = Guid.NewGuid();
                AddConfirmationCode(userRegData.Email, confirmationCode);
                SendConfirmationCode(userRegData.Email, confirmationCode);

                return ResponseModel.OK();
            }

            public static ResponseModel ConfirmEmail(Guid code)
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
                    return new ResponseModel(HttpStatusCode.InternalServerError, errorMessage);

                return ResponseModel.OK();
            }

            public static ResponseModel OpenSession(AccountAuthModel authModel)
            {
                using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
                using var command = new MySqlCommand("OpenSession", connection) { CommandType = CommandType.StoredProcedure };

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
                    return new ResponseModel(HttpStatusCode.Unauthorized, errorMessage);

                var cookie = command.Parameters["cookie"].Value;
                var userId = command.Parameters["user_id"].Value;

                return new ResponseModel(HttpStatusCode.OK,
                                         null,
                                         new Dictionary<string, object> {
                                             { ResponseContentConstants.Cookie, cookie },
                                             { ResponseContentConstants.UserId, userId }
                                         });
            }

            public static void Logout(long userId, string cookie)
            {
                using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
                using var command = new MySqlCommand("CloseSession", connection) { CommandType = CommandType.StoredProcedure };

                command.Parameters.AddRange(new[]
                {
                    new MySqlParameter("userId", userId),
                    new MySqlParameter("cookie", cookie)
                });

                connection.Open();
                command.ExecuteNonQuery();
            }

            #region Вспомогательные методы

            private static ResponseModel AddConfirmationCode(string email, Guid code)
            {
                using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
                using var command = new MySqlCommand("AddConfirmationCode", connection) { CommandType = CommandType.StoredProcedure };

                command.Parameters.AddRange(new[]
                {
                    new MySqlParameter("email", email),
                    new MySqlParameter("code", code.ToString()),

                    new MySqlParameter("error_message", MySqlDbType.VarChar) { Direction = ParameterDirection.ReturnValue }
                });

                connection.Open();
                command.ExecuteNonQuery();

                var errorMessage = command.Parameters["error_message"].Value.ToString();
                if (string.IsNullOrEmpty(errorMessage) == false)
                    return new ResponseModel(HttpStatusCode.NotFound, errorMessage);

                return ResponseModel.OK();
            }

            private static void SendConfirmationCode(string email, Guid code)
            {
                var codestr = code.ToString();

                var body = $"Тык: https://localhost:637/account/confirm_email?code={codestr}";
                MailClient.MailClient.SendMail(email, "Подтверждение регистрации в Matcha", body);
            }

            #endregion
        }
    }
}
