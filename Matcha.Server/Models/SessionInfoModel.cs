namespace Matcha.Server.Models
{
    public sealed record SessionInfoModel
    {
        public long Id { get; set; }

        public string OS { get; set; }

        public string IP { get; set; }

        public string Browser { get; set; }

        public string Country { get; set; }

        public string City { get; set; }
    }
}
