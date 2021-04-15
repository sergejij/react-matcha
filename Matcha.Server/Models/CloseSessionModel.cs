namespace Matcha.Server.Models
{
    public sealed record CloseSessionModel
    {
        public long SessionId { get; set; }
    }
}
