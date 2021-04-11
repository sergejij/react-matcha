using System.Net;

namespace Matcha.Server.Models.Profile
{
    public sealed record SessionLocationModel
    {
        public string OS { get; set; }

        public LocationModel Location { get; set; }

        public IPAddress IP { get; set; }
    }
}
