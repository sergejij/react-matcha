using System.ComponentModel.DataAnnotations;

namespace Matcha.Server.Models.Profile
{
    public sealed record PasswordChangeModel
    {
        [Required]
        public string CurrentPassword { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string NewPassword { get; set; }
    }
}
