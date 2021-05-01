using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Matcha.Server.Filters;
using Matcha.Server.Models;
using Matcha.Server.Models.Chats;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using server.Response;
using System.Data;
using System.Net;
using System.Threading.Tasks;
using Matcha.Server.Extensions;
using Matcha.Server.Models.Profile;

namespace Matcha.Server.Controllers
{
    [ApiController]
    [AuthorizeFilter]
    [ExceptionHandlerFilter]
    [Route("chats")]
    public class ChatsController : BaseMatchaController
    {
        [HttpGet]
        [Route("preview")]
        public async Task<IActionResult> GetChatsPreview([Required][FromQuery] int page, [Required][FromQuery] int size)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("GetChatsPreview", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("my_id", UserId),
                new MySqlParameter("skip", (page - 1) * size),
                new MySqlParameter("take", size)
            });

            connection.Open();
            using var reader = await command.ExecuteReaderAsync();

            var chats = new List<ChatPreviewModel>();

            while (reader.Read())
            {
                var userId = Convert.ToInt64(reader["user_id"]);

                chats.Add(new ChatPreviewModel
                {
                    Profile = new ProfilePreviewModel
                    {
                        Id = userId,
                        Name = reader.StringOrEmpty("name"),
                        Surname = reader.StringOrEmpty("surname"),
                        Avatar = MediaClient.MediaClient.Image.GetAvatarBytes(userId)
                    },
                    LastMessage = new MessageModel
                    {
                        Content = reader.StringOrEmpty("last_message_content"),
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

        [HttpGet]
        [Route("messages")]
        public async Task<IActionResult> GetChatMessages([Required][FromQuery] long userId,
                                                         [Required][FromQuery] int page,
                                                         [Required][FromQuery] int size)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("GetMessages", connection) {CommandType = CommandType.StoredProcedure};

            command.Parameters.AddRange(new[]
            {
                new MySqlParameter("my_id", UserId),
                new MySqlParameter("receiver", userId),
                new MySqlParameter("skip", (page - 1) * size),
                new MySqlParameter("take", size)
            });

            connection.Open();
            using var reader = await command.ExecuteReaderAsync();

            var messages = new List<MessageModel>();
            
            while (reader.Read())
            {
                messages.Add(new MessageModel
                {
                    SendTime = Convert.ToDateTime(reader["time"]),
                    Read = Convert.ToBoolean(reader["readed"]),
                    Content = reader["content"].ToString(),
                    MyMessage = Convert.ToBoolean(reader["my_message"])
                });
            }

            return new ResponseModel(
                HttpStatusCode.OK,
                null,
                new Dictionary<string, object>
                {
                    { "messages", messages }
                })
                .ToResult();
        }

        #region Структуры

        public sealed record ChatPreviewModel
        {
            public MessageModel LastMessage { get; set; }

            public ProfilePreviewModel Profile { get; set; }
        }

        #endregion
    }
}

//TODO: общую структуру пагинации