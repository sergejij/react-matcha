using Matcha.Server.Filters;
using Matcha.Server.Models.Profile;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using server.Response;
using System.Data;
using System.Net;
using System.Threading.Tasks;

namespace Matcha.Server.Controllers
{
    [Route("geoposition")]
    [ApiController]
    [AuthorizeFilter]
    [ExceptionHandlerFilter]
    public class GeopositionController : BaseMatchaController
    {
        [HttpPatch]
        [Route("update")]
        public async Task<IActionResult> UpdateSessionLocation(LocationModel location)
        {
            UsersCache.UpdateGeolocation(UserId, SessionId, location);

            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("UpdateSessionGeoposition", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("session_id", SessionId),
                new MySqlParameter("longitude", location.Longitude),
                new MySqlParameter("latitude", location.Latitude)
            });

            connection.Open();
            await command.ExecuteNonQueryAsync();

            return ResponseModel.OK.ToResult();
        }

        public static async Task DetectAndSaveSessionGeopositionAsync(HttpRequest request, long userId, long sessionId)
        {
            var location = await DetectClientGeopositionAsync(request);
            if (location.Determined is false)
                return;

            UsersCache.SaveInitialSessionGeoposition(userId, sessionId, location);

            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("InitializeSessionGeoposition", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("session_id", sessionId),
                new MySqlParameter("country", location.Country),
                new MySqlParameter("city", location.City),
                new MySqlParameter("longitude", location.Longitude),
                new MySqlParameter("latitude", location.Latitude)
            });

            connection.Open();
            await command.ExecuteNonQueryAsync();
        }

        #region Вспомогательные методы

        private static async Task<LocationModel> DetectClientGeopositionAsync(HttpRequest request)
        {

            var IP = GetRequestIP(request);
            if (IP is null)
                return LocationModel.Unknown;
            else
            {
                // TODO: remove
                if (IP.ToString().Equals("127.0.0.1"))
                    IP = IPAddress.Parse("195.170.42.12");

                var apiUri = $"http://ip-api.com/json/{IP}?fields=status,country,city,lat,lon&lang=ru";

                var response = await new WebClient().DownloadStringTaskAsync(apiUri);
                var jsonContent = JObject.Parse(response);

                if (jsonContent["status"].ToString().Equals("success") is false)
                    return LocationModel.Unknown;

                var location = JsonConvert.DeserializeObject<LocationModel>(response);
                location.Determined = true;
                return location;
            }
        }

        private readonly static string[] serverVars = new[]
        {
            "HTTP_X_FORWARDED_FOR",
            "REMOTE_ADDR"
        };

        private static IPAddress GetRequestIP(HttpRequest request)
        {
            if (request.HttpContext.Connection.RemoteIpAddress is not null)
                return request.HttpContext.Connection.RemoteIpAddress;

            foreach (var serverVar in serverVars)
            {
                var value = request.HttpContext.GetServerVariable(serverVar);

                if (value is not null)
                    return IPAddress.Parse(value);
            }

            return null;
        }

        #endregion
    }
}
