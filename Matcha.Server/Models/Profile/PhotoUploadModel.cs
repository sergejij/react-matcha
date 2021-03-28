using Microsoft.AspNetCore.Http;

namespace Matcha.Server.Models.Profile
{
    public sealed record PhotoUploadModel
    {
        public int PhotoId { get; set; }

        public IFormFile Content { get; set; }
    }
}
