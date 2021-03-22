using System;

namespace Matcha.Server.AppConfig
{
    public static class Constants
    {
        public readonly static string DbConnectionString = Environment.GetEnvironmentVariable("DbConnectionString");

        public readonly static string GmailLogin = Environment.GetEnvironmentVariable("GmailLogin");
        public readonly static string GmailPassword = Environment.GetEnvironmentVariable("GmailPassword");
    }
}
