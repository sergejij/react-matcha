namespace Matcha.Server.Models
{
    public sealed record WebSocketRequestModel
    {
        public WebSocketRequestType Type { get; set; }

        public WebSocketMessageModel Message { get; set; }

        public WebSocketNotification Notification { get; set; }
    }

    public enum WebSocketRequestType
    {
        Close,
        Message,
        Notification
    }

    public sealed record WebSocketMessageModel
    {
        public long Receiver { get; set; }

        public string Content { get; set; }
    }

    public sealed record WebSocketNotification
    {
        public long UserId { get; set; }

        public WebSocketNotificationType Type { get; set; }
    }

    public enum WebSocketNotificationType
    {
        Like,
        Dislike,
        Visit
    }
}
