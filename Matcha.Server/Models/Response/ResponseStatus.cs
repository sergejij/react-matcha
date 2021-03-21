using Newtonsoft.Json;
using System.Net;

namespace server.Response
{
    public sealed partial class ResponseModel
    {
        public sealed class ResponseStatus
        {
            [JsonProperty(PropertyName = "Ok")]
            public readonly bool Ok;

            [JsonProperty(PropertyName = "Code")]
            public readonly HttpStatusCode Code;

            [JsonProperty(PropertyName = "ErrorMessage")]
            public readonly string ErrorMessage;

            public ResponseStatus(HttpStatusCode code, string errorMessage)
            {
                Code = code;
                ErrorMessage = errorMessage;

                Ok = code < HttpStatusCode.BadRequest;
            }
        }
    }
}
