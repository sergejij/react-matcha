using Matcha.Server.Models.Account;
using MySql.Data.MySqlClient;
using server.Response;
using System;
using System.Data;
using System.Net;

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

                return ResponseModel.Ok();
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

                return ResponseModel.Ok();
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

                return ResponseModel.Ok();
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
