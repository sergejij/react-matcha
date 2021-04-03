using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Matcha.Server.Models.Profile
{
    public sealed record PhotoUploadModel
    {
        [Required(AllowEmptyStrings = false)]
        public int Id { get; set; }

        [Required]
        public IFormFile Photo { get; set; }
    }
}
