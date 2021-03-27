using System;
using System.IO;

namespace Matcha.Server.AppConfig
{
    public static class Constants
    {
        public readonly static string DbConnectionString = Environment.GetEnvironmentVariable("DbConnectionString");

        public readonly static string GmailLogin = Environment.GetEnvironmentVariable("GmailLogin");
        public readonly static string GmailPassword = Environment.GetEnvironmentVariable("GmailPassword");

        public readonly static string MediaDirectory = Path.Combine(AppContext.BaseDirectory, "media");

        public readonly static string PhotosDirectory = Path.Combine(MediaDirectory, "photos");
    }
}
