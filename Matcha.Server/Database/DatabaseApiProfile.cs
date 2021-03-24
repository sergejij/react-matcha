using Matcha.Server.Models.Profile;
using MySql.Data.MySqlClient;
using server.Response;
using System.Collections.Generic;
using System.Data;
using System.Net;

namespace Matcha.Server.Database
{
    public sealed partial class DatabaseApi
    {
        public sealed class Profile
        {
            public static ResponseModel UpdateProfileInfo(ProfileInfoModel profileInfo)
            {
                using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
                using var command = new MySqlCommand("UpdateProfileInfo", connection) { CommandType = CommandType.StoredProcedure };

                command.Parameters.AddRange(new[]
                {
                    new MySqlParameter("user_id", profileInfo.UserId),
                    new MySqlParameter("post", profileInfo.Post),
                    new MySqlParameter("location", profileInfo.Location),
                    new MySqlParameter("age", profileInfo.Age),
                    new MySqlParameter("sex", profileInfo.Sex),
                    new MySqlParameter("rel_status", profileInfo.RelationshipStatus),
                    new MySqlParameter("sex_preference", profileInfo.SexPreference),
                    new MySqlParameter("alcohol_attitude", profileInfo.AlcoholAttitude),
                    new MySqlParameter("smoking_attitude", profileInfo.SmokingAttitude),
                    new MySqlParameter("biography", profileInfo.Biography),

                    new MySqlParameter("error_message", MySqlDbType.VarChar) { Direction = ParameterDirection.Output }
                });

                connection.Open();
                command.ExecuteNonQuery();

                //TODO: изменить код ошибки
                var errorMessage = command.Parameters["error_message"].Value.ToString();
                if (string.IsNullOrEmpty(errorMessage) == false)
                    return new ResponseModel(HttpStatusCode.Conflict, errorMessage);

                return ResponseModel.OK();
            }

            public static ResponseModel GetSexesList()
            {
                using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
                using var command = new MySqlCommand("GetSexesList", connection) { CommandType = CommandType.StoredProcedure };

                connection.Open();
                using var reader = command.ExecuteReader();

                var sexes = new HashSet<string>();

                while (reader.Read())
                    sexes.Add(reader.GetString(0));

                return new ResponseModel(HttpStatusCode.OK, null,
                                         new Dictionary<string, object>
                                         {
                                         { "sexes", sexes }
                                         });
            }

            public static ResponseModel GetAttitudesList()
            {
                using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
                using var command = new MySqlCommand("GetAttitudesList", connection) { CommandType = CommandType.StoredProcedure };

                connection.Open();
                using var reader = command.ExecuteReader();

                var attitudes = new HashSet<string>();

                while (reader.Read())
                    attitudes.Add(reader.GetString(0));

                return new ResponseModel(HttpStatusCode.OK, null,
                                         new Dictionary<string, object>
                                         {
                                         { "attitudes", attitudes }
                                         });
            }
        }
    }
}
