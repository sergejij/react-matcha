using Microsoft.AspNetCore.Mvc.Filters;
using MySql.Data.MySqlClient;
using server.Response;
using System;
using System.Net;

namespace Matcha.Server.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class ExceptionHandlerFilterAttribute : Attribute, IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            context.ExceptionHandled = true;

            var mySqlException = context.Exception as MySqlException;
            if (mySqlException is not null)
            {
                //TODO: удалить
                if (mySqlException.Number > 500)
                    SetResult(context, mySqlException.Message, (HttpStatusCode)500);
                else
                    SetResult(context, mySqlException.Message, (HttpStatusCode)mySqlException.Number);

                //SetResult(context, mySqlException.Message, (HttpStatusCode)mySqlException.Number);
                return;
            }

            SetResult(context, $"Необработанная ошибка сервера: {mySqlException.Message}", HttpStatusCode.InternalServerError);
        }

        private static void SetResult(ExceptionContext context, string message, HttpStatusCode code)
        {
            context.Result = new ResponseModel(code, message).ToResult();
        }
    }
}
