using System.ComponentModel.DataAnnotations;

namespace Matcha.Server.Models.Profile
{
    public sealed record UpdateBiographyModel
    {
        [Required(AllowEmptyStrings = true)]
        public string Biography { get; set; }
    }
}
