using System.ComponentModel.DataAnnotations;

namespace Matcha.Server.Models.Profile
{
    public sealed record EmailChangeModel
    {
        [Required(AllowEmptyStrings = false)]
        public string NewEmail { get; set; }
    }
}
