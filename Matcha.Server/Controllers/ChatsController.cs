using Matcha.Server.Filters;
using Matcha.Server.Models;
using Matcha.Server.Models.Chats;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using server.Response;
using System.Data;
using System.Threading.Tasks;

namespace Matcha.Server.Controllers
{
    [ApiController]
    [AuthorizeFilter]
    [WebSocketRequestFilter]
    [ExceptionHandlerFilter]
    [Route("chat")]
    public class ChatsController : BaseMatchaController
    {
        /*
        [HttpGet]
        [Route("chats_preview")]
        public async Task<IActionResult> GetChatsPreview()
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("GetChatsPreview", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.Add(new MySqlParameter("user_id", UserId));

            using var reader = await command.ExecuteReaderAsync();

            var chats = new List<ChatPreviewModel>();

            while (reader.Read())
            {
                var interlocutorId = Convert.ToInt64(reader["interlocutor_id"]);

                chats.Add(new ChatPreviewModel
                {
                    Profile = new ProfilePreviewModel
                    {
                        Id = interlocutorId,
                        Name = reader.StringOrEmpty("interlocutor_name"),
                        Surname = reader.StringOrEmpty("interlocutor_surname"),
                        Avatar = MediaClient.MediaClient.Image.GetAvatarBytes(interlocutorId)
                    },
                    LastMessage = new MessageModel
                    {
                        Content = reader["last_message_content"].ToString(),
                        Read = Convert.ToBoolean(reader["is_last_message_read"]),
                        SendTime = Convert.ToDateTime(reader["last_message_send_time"])
                    }
                });
            }

            return new ResponseModel(
                HttpStatusCode.OK,
                null,
                new Dictionary<string, object>
                {
                    { "chats", chats }
                })
                .ToResult();
        }

        public sealed record ChatPreviewModel
        {
            public MessageModel LastMessage { get; set; }

            public ProfilePreviewModel Profile { get; set; }
        }

        public sealed record MessageModel
        {
            public DateTime SendTime { get; set; }

            public bool Read { get; set; }

            public string Content { get; set; }
        }
        */
    }
}
