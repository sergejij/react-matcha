using Matcha.Server.Filters;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using server.Response;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Net;

namespace Matcha.Server.Controllers
{
    [ExceptionHandlerFilter]
    [Route("dev")]
    public class DevelopmentController : BaseMatchaController
    {
        [HttpGet]
        [Route("users_list")]
        public IActionResult GetUsersList()
        {
            return new JsonResult(UsersCache.GetProfiles());
        }

        [HttpGet]
        [Route("reset")]
        public IActionResult Reset()
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("call reset;", connection);

            connection.Open();
            try
            {
                command.ExecuteNonQuery();
            }
            catch { }

            return ClearPhotos();
        }

        [HttpGet]
        [Route("clear_photos")]
        public IActionResult ClearPhotos()
        {
            if (Directory.Exists(AppConfig.Constants.PhotosDirectory))
                Directory.Delete(AppConfig.Constants.PhotosDirectory, true);

            return ResponseModel.OK.ToResult();
        }

        [HttpGet]
        [Route("test")]
        public IActionResult Test()
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("Test", connection)
            {
                CommandType = System.Data.CommandType.StoredProcedure
            };

            connection.Open();
            using var reader = command.ExecuteReader();

            var strs = new List<(string, string)>();

            while (reader.Read())
            {
                strs.Add((reader["a"].ToString(), reader["b"].ToString()));
            }

            reader.NextResult();

            var ints = new List<(int, int)>();

            while (reader.Read())
            {
                ints.Add((int.Parse(reader["c"].ToString()), int.Parse(reader["d"].ToString())));
            }

            return new ResponseModel(HttpStatusCode.OK, null, new Dictionary<string, object>
            {
                { "strs", strs },
                { "ints", ints }
            })
                .ToResult();
        }

        #region Тестовые пользователи

        [HttpPost]
        [Route("test_users")]
        public IActionResult CreateTestUsers(int? amount)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("CreateTestUsers", connection) { CommandType = System.Data.CommandType.StoredProcedure };

            command.Parameters.Add(new MySqlParameter("amount", amount ?? 50));

            connection.Open();
            command.ExecuteNonQuery();

            return ResponseModel.OK.ToResult();
        }

        [HttpDelete]
        [Route("test_users")]
        public IActionResult DeleteTestUsers()
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("DeleteTestUsers", connection) { CommandType = System.Data.CommandType.StoredProcedure };

            connection.Open();

            command.ExecuteNonQuery();

            return ResponseModel.OK.ToResult();
        }

        #endregion
    }

    #region Модели

    #endregion
}
