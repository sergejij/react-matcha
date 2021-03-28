using System.ComponentModel.DataAnnotations;

namespace Matcha.Server.Models.Profile
{
    public sealed record LoginChangeModel
    {
        [Required(AllowEmptyStrings = false)]
        public string NewLogin { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string Password { get; set; }
    }
}
