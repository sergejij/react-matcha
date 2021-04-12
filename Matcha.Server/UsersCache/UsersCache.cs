using Matcha.Server.Extensions;
using Matcha.Server.Models.Profile;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Matcha.Server.UsersCache
{
    public class UsersCache
    {
        #region Singletone

        private readonly static UsersCache _cache;

        static UsersCache()
        {
            _cache = new UsersCache();
        }

        private UsersCache()
        {
            _users = new Dictionary<long, UserCacheModel>();

            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("GetUsersList", connection);

            connection.Open();
            using var reader = command.ExecuteReader();

            while (reader.Read())
            {
                var userId = Convert.ToInt64(reader["user_id"]);

                _users.Add(userId, new UserCacheModel
                {
                    Sessions = new Dictionary<long, SessionModel>(),
                    Profile = new UserCachedProfile
                    {
                        Info = new ProfileInfoModel
                        {
                            Name = reader.StringOrEmpty("name"),
                            Surname = reader.StringOrEmpty("surname"),
                            Sex = reader.StringOrEmpty("sex"),
                            SexPreference = reader.StringOrEmpty("sex_preference"),
                            RelationshipStatus = reader.StringOrEmpty("relationship_status"),
                            Biography = reader.StringOrEmpty("biography"),
                            Location = reader.StringOrEmpty("location"),
                            Age = reader.NullableInt("age"),
                            AttitudeToAlcohol = reader.StringOrEmpty("attitude_to_alcohol"),
                            AttitudeToSmoking = reader.StringOrEmpty("attitude_to_smoking"),
                            Rating = Convert.ToInt32(reader["rating"].ToString())
                        }
                    } 
                });
            }

            while (reader.NextResult() && reader.Read() && reader.FieldCount == 2)
            {
                var userId = Convert.ToInt64(reader["user_id"]);

                _users[userId].Profile.Interests = reader["interests"].ToString().Split(',').ToHashSet();
            }

            while (reader.Read())
            {
                var userId = Convert.ToInt64(reader["user_id"]);
                var sessionId = Convert.ToInt64(reader["session_id"]);

                _users[userId].Sessions.Add(sessionId, new SessionModel
                {
                    Country = reader.StringOrEmpty("country"),
                    City = reader.StringOrEmpty("city"),
                    InitialLongitude = reader.NullableDouble("initial_longitude"),
                    InitialLatitude =  reader.NullableDouble("initial_latitude"),
                    CurrentLongitude = reader.NullableDouble("current_longitude"),
                    CurrentLatitude = reader.NullableDouble("current_latitude")
                });
            }
        }

        public static UsersCache Instanse => _cache;

        #endregion

        private readonly Dictionary<long, UserCacheModel> _users;

        #region Обновление состояния кеша

        public void AddUser(long userId)
        {
            _users.Add(userId, new UserCacheModel());
        }

        public void AddSession(long userId, long sessionId)
        {
            _users[userId].Sessions.Add(sessionId, new SessionModel());
        }

        public void DeleteSession(long userId, long sessionId)
        {
            _users[userId].Sessions.Remove(sessionId);
        }

        public void UpdateGeolocation(long userId, long sessionId, LocationModel location)
        {
            var sessionRecord = _users[userId].Sessions[sessionId];

            sessionRecord.CurrentLatitude = location.Latitude;
            sessionRecord.CurrentLongitude = location.Longitude;
        }

        public void SaveInitialSessionGeoposition(long userId, long sessionId, LocationModel location)
        {
            var sessionRecord = _users[userId].Sessions[sessionId];

            sessionRecord.Country = location.Country;
            sessionRecord.City = location.City;
            sessionRecord.InitialLatitude = location.Latitude;
            sessionRecord.InitialLongitude = location.Longitude;
        }

        public void UpdateBiography(long userId, string biography)
        {
            _users[userId].Profile.Info.Biography = biography;
        }

        public void InitProfileInfo(long userId, ProfileInfoModel profileInfo)
        {
            _users[userId].Profile.Info = profileInfo;
        }

        public void UpdateProfileInfo(long userId, ProfileInfoModel profileInfo)
        {
            var profile = _users[userId].Profile;

            profile.Info.Name = profileInfo.Name;
            profile.Info.Surname = profileInfo.Surname;
            profile.Info.Age = profileInfo.Age;
            profile.Info.Post = profileInfo.Post;
            profile.Info.Location = profileInfo.Location;
        }

        public void UpdateSex(long userId, string sex)
        {
            _users[userId].Profile.Info.Sex = sex;
        }

        public void UpdateSexPreference(long userId, string sexPreference)
        {
            _users[userId].Profile.Info.SexPreference = sexPreference;
        }

        public void UpdateRelatioshipStatus(long userId, string relationshipStatus)
        {
            _users[userId].Profile.Info.RelationshipStatus = relationshipStatus;
        }

        public void UpdateAttitudeToAlcohol(long userId, string attitudeToAlcohol)
        {
            _users[userId].Profile.Info.AttitudeToAlcohol = attitudeToAlcohol;
        }

        public void UpdateAttitudeToSmoking(long userId, string attitudeToSmoking)
        {
            _users[userId].Profile.Info.AttitudeToSmoking = attitudeToSmoking;
        }

        public void UpdateInterests(long userId, HashSet<string> interests)
        {
            _users[userId].Profile.Interests = interests;
        }

        #endregion

        #region Получение информации

        public Dictionary<long, ProfileInfoModel> GetProfiles()
        {
            return _users.ToDictionary(arg => arg.Key, arg => arg.Value.Profile.Info);
        }

        public Dictionary<long, HashSet<SessionModel>> GetSessions()
        {
            return _users.ToDictionary(arg => arg.Key, arg => arg.Value.Sessions.Values.ToHashSet());
        }

        #endregion

        #region Вспомогательные методы

        public bool UserExists(long userId) => _users.ContainsKey(userId);

        #endregion

        #region Структуры

        private sealed record UserCacheModel
        {
            public UserCachedProfile Profile { get; set; }

            public Dictionary<long, SessionModel> Sessions { get; set; }
        }

        public sealed record UserCachedProfile
        {
            public ProfileInfoModel Info { get; set; }

            public HashSet<string> Interests { get; set; }
        }

        public sealed record SessionModel
        {
            public string Country { get; set; }

            public string City { get; set; }

            public double? InitialLatitude { get; set; }

            public double? InitialLongitude { get; set; }

            public double? CurrentLatitude { get; set; }

            public double? CurrentLongitude { get; set; }
        }

        #endregion
    }
}
