using System.ComponentModel.DataAnnotations;

namespace Matcha.Server.Models.Profile
{
    public sealed record LocationSharingStatusModel
    {
        [Required]
        public bool Status { get; set; }
    }
}
