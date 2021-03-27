using MySql.Data.MySqlClient;
using System;

namespace Matcha.Server.Extensions
{
    public static class MySqlDataReaderExtensions
    {
        public static string StringOrEmpty(this MySqlDataReader reader, string field)
        {
            object value = reader[field];

            if (value is DBNull)
                return string.Empty;
            else
                return value.ToString();
        }
    }
}
