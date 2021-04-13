namespace Matcha.Server.Models.Profile
{
    public sealed record GeoCoordinate
    {
        public readonly double Latitude;
        public readonly double Longitude;

        public GeoCoordinate(double latitude, double longitude)
        {
            Latitude = latitude;
            Longitude = longitude;
        }
    }
}
