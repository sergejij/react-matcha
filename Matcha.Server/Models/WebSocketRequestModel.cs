using Matcha.Server.Models.Chats;
using Matcha.Server.Models.Profile;

namespace Matcha.Server.Models
{
    #region Request

    public sealed record WebSocketRequestModel
    {
        public long Receiver { get; set; }

        public WebSocketRequestType Type { get; set; }

        public MessageModel Message { get; set; }
    }

    public enum WebSocketRequestType
    {
        Close,
        Message,
        Notification
    }

    public enum WebSocketNotificationType
    {
        Like,
        Dislike,
        Visit
    }

    #endregion

    #region Response

    public sealed record WebSocketResponseModel
    {
        public string Type { get; set; }

        public ProfileShortInfoModel Sender { get; set; }

        public MessageModel Message { get; set; }

        public WebSocketResponseNotification Notification { get; set; }
    }

    public sealed record WebSocketResponseNotification
    {
        public long Actioner { get; set; }

        public string Type { get; set; }
    }

    #endregion
}
