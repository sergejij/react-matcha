using Matcha.Server.Filters;
using Matcha.Server.Models.Response;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using server.Response;
using System;
using System.Collections.Generic;
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
                        Email = reader["email"]?.ToString()
                    });
                }
            }

            command.CommandText = "select * from user_full_data;";

            using (var reader = command.ExecuteReader())
            {
                int i = 0;

                while (reader.Read())
                {
                    users[i].Name = reader["name"].ToString();
                    users[i].Surname = reader["surname"].ToString();
                    users[i].Age = string.IsNullOrEmpty(reader["age"].ToString()) ? null : int.Parse(reader["age"].ToString());
                    users[i].Post = reader["post"].ToString();
                    users[i].Location = reader["location"].ToString();
                    users[i].RelationshipStatus = reader["relationship_status"].ToString();
                    users[i].AtttitudeToAlcohol = reader["attitude_to_alcohol"].ToString();
                    users[i].AtttitudeToSmoking = reader["attitude_to_smoking"].ToString();
                    users[i].Age = string.IsNullOrEmpty(reader["age"].ToString()) ? -1 : int.Parse(reader["age"].ToString());
                    users[i].Post = reader["post"].ToString();
                    users[i].Sex = reader["sex"].ToString();
                    users[i].SexPreference = reader["sex_preference"].ToString();
                    users[i].Biography = reader["biography"].ToString() ?? "";

                    i += 1;
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

            return ResponseModel.OK().ToResult();
        }

        [HttpGet]
        [Route("img")]
        public IActionResult Img()
        {
            string file_path = @"C:\Users\user\Desktop\jpgs\s.jpg";
            var bytes = System.IO.File.ReadAllBytes(file_path);

            var model = new ResponseModel(HttpStatusCode.OK, null, new Dictionary<string, object>
            {
                { "img", bytes }
            });

            return model.ToResult();
        }

        [HttpGet]
        [Route("test")]
        public void TestEx()
        {
            throw new Exception("exception");
        }

        [HttpGet]
        [Route("check_session")]
        [AuthorizeFilter]
        public IActionResult SessionCheck()
        {
            return ResponseModel.OK().ToResult();
        }
    }

    #region Модели

    public sealed class User
    {
        public string Login { get; set; }
        public string Email { get; set; }
        public long Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Location { get; set; }
        public string RelationshipStatus { get; set; }
        public string AtttitudeToAlcohol { get; set; }
        public string AtttitudeToSmoking { get; set; }
        public int? Age { get; set; }
        public string Post { get; set; }
        public string Sex { get; set; }
        public string SexPreference { get; set; }
        public string Biography { get; set; }
    }

    #endregion
}
