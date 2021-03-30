namespace Matcha.Server.Models.Profile
{
    public sealed record UpdateCoordinatesModel
    {
        public double Latitude { get; set; }

        public double Longitude { get; set; }
    }
}
