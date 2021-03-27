using Matcha.Server.Models.Profile;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

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

            private readonly static int MaxPhotos = 4;

            static Image()
            {
                if (Directory.Exists(BaseDir) == false)
                    Directory.CreateDirectory(BaseDir);
            }

            public static void UploadAvatar(IFormFile image, long userId)
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

            public static IEnumerable<PhotoModel> GetAllPhotos(long userId)
            {
                var photos = new List<PhotoModel>(MaxPhotos);
                for (var i = 0; i < MaxPhotos; ++i)
                    photos.Add(new PhotoModel());

                var userDir = Path.Combine(BaseDir, userId.ToString());
                if (Directory.Exists(userDir) == false)
                    return photos;

                foreach (var file in Directory.GetFiles(userDir))
                {
                    if (Path.GetFileNameWithoutExtension(file).Equals(AvatarName))
                        continue;

                    var index = Convert.ToInt32(Path.GetFileNameWithoutExtension(file));

                    photos[index].Id = Convert.ToInt32(Path.GetFileNameWithoutExtension(file));
                    photos[index].Content = File.ReadAllBytes(file);

                }

                return photos;
            }

            public static void UploadPhoto(PhotoUploadModel photoModel, long userId)
            {
                var userDir = Path.Combine(BaseDir, userId.ToString());
                if (Directory.Exists(userDir) == false)
                    Directory.CreateDirectory(userDir);

                var photoPath = Path.Combine(userDir, photoModel.PhotoId.ToString());

                using (var fs = new FileStream(photoPath, FileMode.Create))
                {
                    photoModel.Content.CopyTo(fs);
                }
            }
        }
    }
}
