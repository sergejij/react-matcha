using System.ComponentModel.DataAnnotations;
using System.IO;

namespace Matcha.Server.Models.Profile
{
    public sealed record PhotoModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        [Required]
        public byte[] Content { get; set; }

        public void Rename(string name)
        {
            if (Name is null)
                Name = name;
            else
                Name = name + Path.GetExtension(Name);
        }
    }

    public sealed record ProfilePhotosModel
    {
        public PhotoModel Avatar { get; set; }

        public PhotoModel[] Photos { get; set; }
    }
}
