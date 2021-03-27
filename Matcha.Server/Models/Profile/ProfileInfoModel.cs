namespace Matcha.Server.Models.Profile
{
    public class ProfileInfoModel
    {
        public string Sex { get; set; }

        public string SexPreference { get; set; }

        public string RelationshipStatus { get; set; }

		public string Biography { get; set; }

        public string Post { get; set; }

        public string Location { get; set; }

        public int? Age { get; set; }

        public string AttitudeToAlcohol { get; set; }

        public string AttitudeToSmoking { get; set; }

        public ProfilePhotosModel Photos { get; set; }
    }
}
