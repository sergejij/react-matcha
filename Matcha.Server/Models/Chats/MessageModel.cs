using System;

namespace Matcha.Server.Models.Chats
{
    public record MessageModel
    {
        public DateTime? SendTime { get; set; }

        public bool? Read { get; set; }

        public string Content { get; set; }

        public bool MyMessage { get; set; }
    }
}
