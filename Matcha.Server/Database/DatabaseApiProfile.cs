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
