namespace Matcha.Server.Models.Profile
{
    public sealed record ProfileShortInfoModel
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }
    }
}
