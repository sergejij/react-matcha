using Matcha.Server.Models.Response;
using Microsoft.AspNetCore.Mvc.Filters;
using MySql.Data.MySqlClient;
using server.Response;
using System;
using System.Net;

namespace Matcha.Server.Filters
{
    public class ExceptionHandlerFilterAttribute : Attribute, IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            context.ExceptionHandled = true;

            var mySqlException = context.Exception as MySqlException;
            if (mySqlException is not null)
            {
                SetResult(context, "Необработанная ошибка базы данных", HttpStatusCode.InternalServerError);
                return;
            }

            SetResult(context, "Необработанная ошибка сервера", HttpStatusCode.InternalServerError);
        }

        private void SetResult(ExceptionContext context, string message, HttpStatusCode code)
        {
            var response = new ResponseModel(code, message);

            context.Result = ResponseBuilder.Create(response);
        }
    }
}
