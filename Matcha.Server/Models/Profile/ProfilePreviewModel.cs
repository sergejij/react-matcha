namespace Matcha.Server.Models.Profile
{
    public sealed record ProfilePreviewModel
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public byte[] Avatar { get; set; }
    }
}
