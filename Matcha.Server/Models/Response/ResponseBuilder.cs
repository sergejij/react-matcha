using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using server.Response;

namespace Matcha.Server.Models.Response
{
    public static class ResponseBuilder
    {
        public static IActionResult Create(ResponseModel responseModel)
        {
            var responceBody = JsonConvert.SerializeObject(responseModel, Formatting.Indented);

            return new ContentResult
            {
                Content = responceBody,
                StatusCode = (int)responseModel.Code
            };
        }
    }
}
