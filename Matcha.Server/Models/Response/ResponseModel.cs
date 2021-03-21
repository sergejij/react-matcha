using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net;

namespace server.Response
{
    public sealed partial class ResponseModel
    {
        [JsonProperty(PropertyName = "Status")]
        public readonly ResponseStatus Status;

        [JsonProperty(PropertyName = "Content")]
        public Dictionary<string, object> Content { get; set; }

        public ResponseModel(ResponseStatus status, Dictionary<string, object> content)
        {
            Status = status;
            Content = content;
        }

        public ResponseModel(HttpStatusCode code, string errorMessage)
        {
            Status = new ResponseStatus(code, errorMessage);
            Content = null;
        }

        public static ResponseModel Ok() => new ResponseModel(HttpStatusCode.OK, null);
    }
}
