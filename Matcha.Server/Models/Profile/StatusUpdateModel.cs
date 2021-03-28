namespace Matcha.Server.Models.Profile
{
    public sealed record StatusUpdateModel
    {
        public string Field { get; set; }

        public string Status { get; set; }
    }
}
