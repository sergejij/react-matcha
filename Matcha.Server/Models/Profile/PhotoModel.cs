using System.ComponentModel.DataAnnotations;
using System.IO;

namespace Matcha.Server.Models.Profile
{
    public sealed record PhotoModel
    {
        public int Id { get; set; }

        [Required]
        public byte[] Content { get; set; }
    }
}
