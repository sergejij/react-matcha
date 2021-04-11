using Matcha.Server.Models.Profile;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

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

            #region Получение

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

            #endregion

            #region Сохранение

            public static void SaveAvatar(long userId, IFormFile avatar)
            {
                var path = Path.Combine(BaseDir, userId.ToString());

                if (Directory.Exists(path) == false)
                    Directory.CreateDirectory(path);

                var fullName = Path.Combine(path, AvatarName);

                using (var fs = new FileStream(fullName, FileMode.Create))
                {
                    avatar.CopyTo(fs);
                }
            }

            public static void SavePhoto(long userId, PhotoUploadModel photoModel)
            {
                var path = Path.Combine(BaseDir, userId.ToString());

                if (Directory.Exists(path) == false)
                    Directory.CreateDirectory(path);

                var fullName = Path.Combine(path, photoModel.Id.ToString());

                using (var fs = new FileStream(fullName, FileMode.Create))
                {
                    photoModel.Photo.CopyTo(fs);
                }
            }

            #endregion
        }
    }
}
