using System;
using System.IO;

namespace Matcha.Server.AppConfig
{
    public static class Constants
    {
        public readonly static string DbConnectionString = Environment.GetEnvironmentVariable("DbConnectionString");

        public readonly static string GmailLogin = Environment.GetEnvironmentVariable("GmailLogin");
        public readonly static string GmailPassword = Environment.GetEnvironmentVariable("GmailPassword");

        public readonly static string MediaDirectory = "media";

        public readonly static string PhotoDirectory = Path.Combine(MediaDirectory, "photos");
        public readonly static string PhotosPath = Path.Combine(Environment.CurrentDirectory, PhotoDirectory);
    }
}
