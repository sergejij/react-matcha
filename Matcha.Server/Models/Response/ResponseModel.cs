using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net;

namespace server.Response
{
    public partial class ResponseModel
    {
        [JsonIgnore]
        public readonly bool Ok;

        [JsonIgnore]
        public readonly HttpStatusCode Code;

        [JsonProperty(PropertyName = "ErrorMessage")]
        public readonly string ErrorMessage;

        [JsonProperty(PropertyName = "Content")]
        public Dictionary<string, object> Content { get; set; }

        public ResponseModel(HttpStatusCode code, string errorMessage, Dictionary<string, object> content) : this(code, errorMessage)
        {
            Content = content;
        }

        public ResponseModel(HttpStatusCode code, string errorMessage)
        {
            Code = code;
            ErrorMessage = errorMessage;
            Content = null;

            Ok = code < HttpStatusCode.BadRequest;
        }

        public static ResponseModel OK() => new ResponseModel(HttpStatusCode.OK, null);

        public static ResponseModel Unauthorized() => new ResponseModel(HttpStatusCode.Unauthorized, null);

        public IActionResult ToResult()
        {
            var responceBody = JsonConvert.SerializeObject(this, Formatting.Indented);

            return new ContentResult
            {
                Content = responceBody,
                StatusCode = (int)Code
            };
        }
    }
}
