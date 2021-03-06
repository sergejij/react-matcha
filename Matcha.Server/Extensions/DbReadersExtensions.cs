﻿using Matcha.Server.Models.Profile;
using System;
using System.Data;

namespace Matcha.Server.Extensions
{
    public static class DbReadersExtensions
    {
        public static string StringOrEmpty(this IDataReader reader, string field)
        {
            object value = reader[field];

            if (value is DBNull)
                return string.Empty;
            else
                return value.ToString();
        }

        public static double? NullableDouble(this IDataReader reader, string field)
        {
            object value = reader[field];

            if (value is DBNull)
                return default;
            else
                return Convert.ToDouble(value);
        }

        public static int? NullableInt(this IDataReader reader, string field)
        {
            object value = reader[field];

            if (value is DBNull)
                return default;
            else
                return Convert.ToInt32(value);
        }

        public static GeoCoordinate TryParseGeoCoordinate(this IDataReader reader, string latitudeField, string longitudeField)
        {
            try
            {
                return new GeoCoordinate(
                    Convert.ToDouble(reader[latitudeField]),
                    Convert.ToDouble(reader[longitudeField])
                );
            }
            catch
            {
                return null;
            }
        }
    }
}
