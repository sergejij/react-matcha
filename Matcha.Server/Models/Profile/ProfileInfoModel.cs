using System.ComponentModel.DataAnnotations;

namespace Matcha.Server.Models.Profile
{
    public sealed record ProfileInfoModel
    {
        [Required]
        public string Sex { get; set; }

        [Required]
        public string SexPreference { get; set; }

        [Required]
        public string RelationshipStatus { get; set; }

        [Required]
        public string Biography { get; set; }

        public string Post { get; set; }

        public string Location { get; set; }

        [Required]
        public int? Age { get; set; }

        public string AttitudeToAlcohol { get; set; }

        public string AttitudeToSmoking { get; set; }
    }
}
