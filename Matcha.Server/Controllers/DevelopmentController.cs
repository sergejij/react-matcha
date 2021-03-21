using Matcha.Server.Models.Response;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using server.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static server.Response.ResponseModel;

namespace Matcha.Server.Controllers
{
    [Route("dev")]
    public class DevelopmentController : ControllerBase
    {
        [HttpGet]
        [Route("users_list")]
        public IActionResult GetUsersList()
        {
            var users = new List<User>();

            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("select * from user_data", connection);

            connection.Open();
            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    users.Add(new User
                    {
                        Id = long.Parse(reader["id"].ToString()),
                        Login = reader["login"].ToString(),
                        Email = reader["email"].ToString(),
                        NeedConfirmEmail = reader["need_confirm_email"].ToString().Equals("1")
                    });
                }
            }

            command.CommandText = "select * from user_full_data;";

            using (var reader = command.ExecuteReader())
            {
                int i = 0;

                while (reader.Read())
                {
                    users[i].Age = string.IsNullOrEmpty(reader["age"].ToString()) ? null : int.Parse(reader["age"].ToString());
                    users[i].Post = string.IsNullOrEmpty(reader["post"].ToString()) ? null : reader["post"].ToString();
                    users[i].Name = reader["name"].ToString();
                    users[i].Surname = reader["surname"].ToString();
                }
            }

            return Ok(users);
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

            return ResponseBuilder.Create(ResponseModel.Ok());
        }

        [HttpPost]
        [Route("test_cors")]
        public IActionResult Cors()
        {
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            Response.Headers.Add("Access-Control-Allow-Headers", "origin, x-requested-with, content-type");
            Response.Headers.Add("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");

            return Ok();
        }
    }

    #region Модели

    public sealed class User
    {
        [JsonProperty(PropertyName = "Id", Required = Required.Always)]
        public long Id { get; set; }

        [JsonProperty(PropertyName = "Email", Required = Required.Always)]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "Login", Required = Required.Always)]
        public string Login { get; set; }

        [JsonProperty(PropertyName = "Name", Required = Required.Always)]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "Surname", Required = Required.Always)]
        public string Surname { get; set; }

        [JsonProperty(PropertyName = "NeedConfirmEmail", Required = Required.Always)]
        public bool NeedConfirmEmail { get; set; }

        [JsonProperty(PropertyName = "Post")]
        public string Post { get; set; }

        [JsonProperty(PropertyName = "Age")]
        public int? Age { get; set; }
    }

    #endregion
}
