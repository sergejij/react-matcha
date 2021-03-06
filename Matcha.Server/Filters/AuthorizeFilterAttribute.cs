﻿using Matcha.Server.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using MySql.Data.MySqlClient;
using server.Response;
using System;
using System.Data;

namespace Matcha.Server.Filters
{
    [AttributeUsage(AttributeTargets.All)]
    public class AuthorizeFilterAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (BaseMatchaController.TryGetSessionAttributes(context.HttpContext.Request, out long userId, out long sessionId) == false)
            {
                context.Result = ResponseModel.Unauthorized.ToResult();
                return;
            }

            if (SessionExists(userId, sessionId) == false)
                context.Result = ResponseModel.Unauthorized.ToResult();
        }

        private static bool SessionExists(long userId, long sessionId)
        {
            using var connection = new MySqlConnection(AppConfig.Constants.DbConnectionString);
            using var command = new MySqlCommand("IsSessionExists", connection) { CommandType = CommandType.StoredProcedure };

            command.Parameters.AddRange(new[]
            {
                    new MySqlParameter("user_id", userId),
                    new MySqlParameter("session_id", sessionId),

                    new MySqlParameter("exists", MySqlDbType.Bit) { Direction = ParameterDirection.ReturnValue }
                });

            connection.Open();
            command.ExecuteNonQuery();

            return command.Parameters["exists"].Value.ToString().Equals("1");
        }
    }
}
