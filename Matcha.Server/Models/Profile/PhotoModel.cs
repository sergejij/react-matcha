namespace Matcha.Server.Models.Profile
{
    public sealed record PhotoModel
    {
        public int Id { get; set; }

        public byte[] Content { get; set; }
    }
}
