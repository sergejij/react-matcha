using Matcha.Server.AppConfig;
using Matcha.Server.Models.Profile;
using MySql.Data.MySqlClient;
using server.Response;
using System.Collections.Generic;
using System.Data;
using System.IO;
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

                //if (profileInfo.Photos is not null)
                //    return UpdateProfilePhotos(profileInfo.Photos);

                return ResponseModel.OK();
            }

            //static ResponseModel UpdateProfilePhotos(long userId, ProfilePhotosModel profilePhotos)
            //{
            //    var userPhotosPath = Path.Combine(Constants.PhotosPath, userId.ToString());
            //    if (Directory.Exists(userPhotosPath) == false)
            //        Directory.CreateDirectory(userPhotosPath);

            //    if (profilePhotos.Avatar is not null)
            //    {
            //        profilePhotos.Avatar.Rename("avatar");

            //        var avatarPath = Path.Combine(userPhotosPath, profilePhotos.Avatar.Name);
            //        File.Delete()
            //    }


            //    return default;
            //}

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

            public static ResponseModel GetProfileInfo(long userId)
            {
                using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
                using var command = new MySqlCommand("GetProfileInfo", connection) { CommandType = CommandType.StoredProcedure };

                command.Parameters.AddRange(new[]
                {
                    new MySqlParameter("user_id", userId),
                    new MySqlParameter("error_message", MySqlDbType.VarChar) { Direction = ParameterDirection.Output }
                });

                connection.Open();
                using var reader = command.ExecuteReader();

                var errorMessage = command.Parameters["error_message"].Value?.ToString();
                if (string.IsNullOrEmpty(errorMessage) == false)
                    return new ResponseModel(HttpStatusCode.NoContent, errorMessage);

                reader.Read();
                var fields = new Dictionary<string, object>
                {
                    { "name", reader["name"] },
                    { "surname", reader["surname"] },
                    { "location", reader["location"] },
                    { "relationship_status", reader["relationship_status"] },
                    { "attitude_to_alcohol", reader["attitude_to_alcohol"] },
                    { "attitude_to_smoking", reader["attitude_to_smoking"] },
                    { "age", reader["age"] },
                    { "post", reader["post"] },
                    { "sex", reader["sex"] },
                    { "sex_preference", reader["sex_preference"] },
                    { "biography", reader["biography"] }
                };

                return new ResponseModel(HttpStatusCode.OK, null, fields);
            }
        }
    }
}
