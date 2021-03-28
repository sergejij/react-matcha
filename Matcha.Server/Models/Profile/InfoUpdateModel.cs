using System.ComponentModel.DataAnnotations;

namespace Matcha.Server.Models.Profile
{
    public sealed record InfoUpdateModel
    {
        public string Name { get; set; }

        public string Surname { get; set; }

        public int? Age { get; set; }

        public string Post { get; set; }

        public string Location { get; set; }
    }
}
