namespace Matcha.Server.Models
{
    #region Request

    public sealed record WebSocketRequestModel
    {
        public WebSocketRequestType Type { get; set; }

        public WebSocketMessageModel Message { get; set; }

        public WebSocketRequestNotification Notification { get; set; }
    }

    public sealed record WebSocketRequestNotification
    {
        public long UserId { get; set; }

        public WebSocketNotificationType Type { get; set; }
    }

    public enum WebSocketRequestType
    {
        Close,
        Message,
        Notification
    }

    #endregion

    #region Response

    public sealed record WebSocketResponseModel
    {
        public string Type { get; set; }

        public WebSocketMessageModel Message { get; set; }

        public WebSocketResponseNotification Notification { get; set; }
    }

    public sealed record WebSocketResponseNotification
    {
        public long UserId { get; set; }

        public string Type { get; set; }
    }

    #endregion

    public sealed record WebSocketMessageModel
    {
        public long Receiver { get; set; }

        public long Sender { get; set; }

        public string Content { get; set; }
    }
    
    public enum WebSocketNotificationType
    {
        Like,
        Dislike,
        Visit
    }
}
