using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Matcha.Server.Models.Profile
{
    public class ProfileInfoModel
    {
        [Required]
        public long UserId { get; set; }

        public string Sex { get; set; }

        public string SexPreference { get; set; }

        public string RelationshipStatus { get; set; }

		public string Biography { get; set; }

        public string Post { get; set; }

        public string Location { get; set; }

        public int? Age { get; set; }

        public string AlcoholAttitude { get; set; }

        public string SmokingAttitude { get; set; }
    }
}
