namespace Matcha.Server.Models.Chats
{
    public sealed record SendMessageModel
    {
        public long Whom { get; set; }

        public string Content { get; set; }
    }
}
