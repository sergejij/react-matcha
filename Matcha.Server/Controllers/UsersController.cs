using Matcha.Server.Extensions;
using Matcha.Server.Filters;
using Matcha.Server.Models.Profile;
using Matcha.Server.Models.Users;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using server.Response;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Net;

namespace Matcha.Server.Controllers
{
    [Route("users")]
    [ApiController]
    [AuthorizeFilter]
    [ExceptionHandlerFilter]
    public class UsersController : BaseMatchaController
    {
        [HttpGet]
        [Route("list")]
        public IActionResult GetUsersList([Required][FromQuery] SortParametersModel sortParameters)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("GetUsersList", connection) { CommandType = System.Data.CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("take", sortParameters.Size),
                new MySqlParameter("skip", (sortParameters.Page - 1) * sortParameters.Size),
                new MySqlParameter("order_by", sortParameters.OrderBy)
            });

            connection.Open();
            using var reader = command.ExecuteReader();

            var users = new List<ProfileInfoResponseModel>();

            while (reader.Read())
            {
                users.Add(new ProfileInfoResponseModel
                {
                    Name = reader.StringOrEmpty("name"),
                    Surname = reader.StringOrEmpty("surname"),
                    Location = reader.StringOrEmpty("location"),
                    RelationshipStatus = reader.StringOrEmpty("relationship_status"),
                    AttitudeToAlcohol = reader.StringOrEmpty("attitude_to_alcohol"),
                    AttitudeToSmoking = reader.StringOrEmpty("attitude_to_smoking"),
                    Age = reader.StringOrEmpty("age"),
                    Post = reader.StringOrEmpty("post"),
                    Sex = reader.StringOrEmpty("sex"),
                    SexPreference = reader.StringOrEmpty("sex_preference"),
                    Biography = reader.StringOrEmpty("biography"),
                    Rating = reader.StringOrEmpty("rating")
                });
            };

            return new ResponseModel(HttpStatusCode.OK, null, new Dictionary<string, object>
                                                              {
                                                                  { "users", users }
                                                              })
            .ToResult();
        }
    }
}
