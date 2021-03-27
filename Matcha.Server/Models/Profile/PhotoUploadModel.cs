using Microsoft.AspNetCore.Http;

namespace Matcha.Server.Models.Profile
{
    public class PhotoUploadModel
    {
        public int Id { get; set; }

        public IFormFile Content { get; set; }
    }
}
