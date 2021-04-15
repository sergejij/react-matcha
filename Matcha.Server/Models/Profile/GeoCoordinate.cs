using System;

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

        public static double Distance(GeoCoordinate a, GeoCoordinate b)
        {
            const double EarthRadius = 6371; // km

            var aLat = a.Latitude / 180 * Math.PI;
            var aLon = a.Longitude / 180 * Math.PI;

            var bLat = b.Latitude / 180 * Math.PI;
            var bLon = b.Longitude / 180 * Math.PI;

            var latitudeHaversin = Math.Pow((bLat - aLat) / 2, 2);
            var longidudeHaversin = Math.Pow((bLon - aLon) / 2, 2);

            var underRoot = latitudeHaversin + Math.Cos(aLat) * Math.Cos(bLat) * longidudeHaversin;

            var result = 2 * EarthRadius * Math.Asin(Math.Sqrt(underRoot));

            return result;
        }
    }
}
