using Matcha.Server.Filters;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using server.Response;
using System;
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
            return new ResponseModel(
                HttpStatusCode.OK,
                null,
                new Dictionary<string, object>
                    {
                        { "sockets", WebSocketsManager.WebSocketsManager.All }
                    })
                .ToResult();
        }

        #region Тестовые пользователи

        [HttpPost]
        [Route("test_users")]
        public IActionResult CreateTestUsers(int? amount)
        {
            if (amount.HasValue is false)
                amount = 50;

            var webClient = new WebClient();
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            connection.Open();

            for (var i = 0; i < amount; i += 1)
            {
                var jsonData = webClient.DownloadString("http://api.randomdatatools.ru?unescaped=false?count=1");

                var jsonObject = (JObject)JsonConvert.DeserializeObject(jsonData);

                var name = jsonObject!["FirstName"]!.ToString();
                var surname = jsonObject!["LastName"]!.ToString();

                var login = jsonObject!["Login"];
                var email = jsonObject!["Email"]!.ToString();

                var password = jsonObject["Password"].ToString();
                var salt = "1";
                
                var location = jsonObject["City"].ToString();
                var relStatus = "Свободен";
                var alc = "Нейтральное";
                var smo = "Нейтральное";
                var age = Convert.ToInt32(jsonObject["YearsOld"]) % 30 + 1;
                var post = jsonObject["EduSpecialty"].ToString();
                var sex = jsonObject!["Gender"]!.ToString().Equals("Мужчина") ? "Мужской" : "Женский";
                var sexPreference = sex == "Мужской" ? "Женский" : "Мужской";
                var biography = jsonObject["Address"].ToString();

                using var command = new MySqlCommand("AddTestUser", connection) { CommandType = System.Data.CommandType.StoredProcedure };

                command.Parameters.AddRange(new[]
                {
                    new MySqlParameter("name", name),
                    new MySqlParameter("surname", surname),
                    new MySqlParameter("login", login),
                    new MySqlParameter("email", email),
                    new MySqlParameter("password", password),
                    new MySqlParameter("salt", salt),

                    new MySqlParameter("location", location),
                    new MySqlParameter("relStatus", relStatus),
                    new MySqlParameter("alc", alc),
                    new MySqlParameter("smoking", smo),
                    new MySqlParameter("age", age),
                    new MySqlParameter("post", post),
                    new MySqlParameter("sex", sex),
                    new MySqlParameter("sexPreference", sexPreference),
                    new MySqlParameter("biography", biography)
                });
                
                command.ExecuteNonQuery();
            }
            /*
            if (amount.HasValue is false)
                amount = 50;
            
            for (var i = 0; i < amount; ++i)
            {
                var profile = new ProfileInfoModel();

                FirstStep(i, amount, profile);

                string src;

                

                var gluedNames = JsonConvert.DeserializeObject<List<string>>(src);
                var names = gluedNames.Select(arg => arg.Split('_'));

                var request = (HttpWebRequest)WebRequest.Create("https://random.api.randomkey.io/v1/location");
                request.Method = "POST";
                request.Headers.Add("Content-Type", "application/json");
                request.Headers.Add("auth", "88f8de9d8150dfb2ec7d7c3b8202b107");

                using (var stream = request.GetRequestStream())
                {
                    stream.Write(Encoding.UTF8.GetBytes("{\"region\": \"ru\", \"records\": 1}}"));
                    stream.Close();
                }

                var response = request.GetResponse();

                using (var responseStream = response.GetResponseStream())
                {
                    using var reader = new StreamReader(responseStream, Encoding.UTF8);

                    var json = reader.ReadToEnd();
                    
                    var content = Regex.Replace(json, @"\\u([0-9A-Fa-f]{4})", m => "" + (char)Convert.ToInt32(m.Groups[1].Value, 16));

                    var x = (JObject)JsonConvert.DeserializeObject(content);

                    var location = x.GetValue("location").ToArray();
                }
            }*/
            /*
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("CreateTestUsers", connection) { CommandType = System.Data.CommandType.StoredProcedure };

            command.Parameters.Add(new MySqlParameter("amount", amount ?? 50));

            connection.Open();
            command.ExecuteNonQuery();
            */

            return ResponseModel.OK.ToResult();
        }

        [HttpDelete]
        [Route("test_users")]
        public IActionResult DeleteTestUsers()
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("DeleteTestUsers", connection) { CommandType = CommandType.StoredProcedure };

            connection.Open();

            command.ExecuteNonQuery();

            return ResponseModel.OK.ToResult();
        }

        #endregion
    }

    #region Модели

    #endregion
}
