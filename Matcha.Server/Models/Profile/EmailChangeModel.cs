using System.ComponentModel.DataAnnotations;

namespace Matcha.Server.Models.Profile
{
    public sealed record EmailChangeModel
    {
        [EmailAddress]
        [Required(AllowEmptyStrings = false)]
        public string NewEmail { get; set; }
    }
}
