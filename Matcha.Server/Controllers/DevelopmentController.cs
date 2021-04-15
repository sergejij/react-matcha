using Matcha.Server.Filters;
using Matcha.Server.Models.Profile;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using server.Response;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using UAParser;

namespace Matcha.Server.Controllers
{
    [ExceptionHandlerFilter]
    [Route("dev")]
    public class DevelopmentController : BaseMatchaController
    {
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
