namespace Matcha.Server.Models.Profile
{
    public sealed record ProfileInfoResponseModel
    {
        public string Name { get; set; }

        public string Surname { get; set; }

        public string Sex { get; set; }

        public string SexPreference { get; set; }

        public string RelationshipStatus { get; set; }

        public string Biography { get; set; }

        public string Post { get; set; }

        public string Location { get; set; }

        public string Age { get; set; }

        public string AttitudeToAlcohol { get; set; }

        public string AttitudeToSmoking { get; set; }
    }
}
