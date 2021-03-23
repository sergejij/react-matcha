using Newtonsoft.Json;

namespace Matcha.Server.Models.Profile
{
    public class ProfileInfoModel
    {
        [JsonProperty(PropertyName = "UserId", Required = Required.Always)]
        public long UserId { get; set; }

        [JsonProperty(PropertyName = "Sex", Required = Required.Always)]
        public string Sex { get; set; }

        [JsonProperty(PropertyName = "SexPreference", Required = Required.Always)]
        public string SexPreference { get; set; }

        [JsonProperty(PropertyName = "RelationshipStatus", Required = Required.Always)]
        public string RelationshipStatus { get; set; }

        [JsonProperty(PropertyName = "Biography", Required = Required.Always)]
		public string Biography { get; set; }

        [JsonProperty(PropertyName = "Post", Required = Required.Always)]
        public string Post { get; set; }

        [JsonProperty(PropertyName = "Location")]
        public string Location { get; set; }

        [JsonProperty(PropertyName = "Age")]
        public int? Age { get; set; }

        [JsonProperty(PropertyName = "AlcoholAttitude")]
        public string AlcoholAttitude { get; set; }

        [JsonProperty(PropertyName = "SmokingAttitude")]
        public string SmokingAttitude { get; set; }
    }
}
