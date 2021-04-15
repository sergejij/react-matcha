using System;
using System.Net;

namespace Matcha.Server.CustomExceptions
{
    /// <summary>
    /// Маркерное исключение для отлова ошибок, сообщения которых могут быть переданы пользователю
    /// </summary>
    public class MatchaException : Exception
    {
        public readonly HttpStatusCode HttpCode;

        public MatchaException(HttpStatusCode code, string message) : base(message)
        {
            HttpCode = code;
        }
    }
}
