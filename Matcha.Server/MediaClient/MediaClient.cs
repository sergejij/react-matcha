using Matcha.Server.Models.Profile;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;

namespace Matcha.Server.MediaClient
{
    public static class MediaClient
    {
        static MediaClient()
        {
            if (Directory.Exists(AppConfig.Constants.MediaDirectory) == false)
                Directory.CreateDirectory(AppConfig.Constants.MediaDirectory);
        }

        public static class Image
        {
            private readonly static string BaseDir = AppConfig.Constants.PhotosDirectory;

            private readonly static string AvatarName = "avatar";

            static Image()
            {
                if (Directory.Exists(BaseDir) == false)
                    Directory.CreateDirectory(BaseDir);
            }

            public static void SaveAvatar(IFormFile image, long userId)
            {
                var userDir = Path.Combine(BaseDir, userId.ToString());

                if (Directory.Exists(userDir) == false)
                    Directory.CreateDirectory(userDir);

                var avatarPath = Path.Combine(userDir, AvatarName);

                using (var fs = new FileStream(avatarPath, FileMode.Create))
                {
                    image.CopyTo(fs);
                }
            }

            public static byte[] GetAvatarBytes(long userId)
            {
                var userDir = Path.Combine(BaseDir, userId.ToString());
                var avatarPath = Path.Combine(userDir, AvatarName);

                if (File.Exists(avatarPath) == false)
                    return null;
                else
                    return File.ReadAllBytes(avatarPath);
            }

            public static List<PhotoModel> GetAllPhotos(long userId)
            {
                var photos = new List<PhotoModel>();

                var userDir = Path.Combine(BaseDir, userId.ToString());
                if (Directory.Exists(userDir) == false)
                    return photos;

                foreach (var file in Directory.GetFiles(userDir))
                {
                    photos.Add(new PhotoModel
                    {
                        Id = Convert.ToInt32(Path.GetFileNameWithoutExtension(file)),
                        Content = File.ReadAllBytes(file)
                    });
                }

                return photos;
            }
        }
    }
}
