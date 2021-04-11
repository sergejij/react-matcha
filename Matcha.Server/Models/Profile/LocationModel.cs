using Newtonsoft.Json;

namespace Matcha.Server.Models.Profile
{
    public sealed record LocationModel
    {
        public string Country { get; set; }

        public string City { get; set; }

        [JsonProperty(PropertyName = "lon")]
        public double Longitude { get; set; }

        [JsonProperty(PropertyName = "lat")]
        public double Latitude { get; set; }

        [JsonIgnore]
        public bool Determined { get; set; }

        public readonly static LocationModel Unknown = new LocationModel()
        {
            Determined = false
        };

    }
}
