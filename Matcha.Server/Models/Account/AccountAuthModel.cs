using Newtonsoft.Json;

namespace Matcha.Server.Models.Account
{
    public class AccountAuthModel
    {
        [JsonProperty(PropertyName = "Email", Required = Required.Always)]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "Password", Required = Required.Always)]
        public string Password { get; set; }
    }
}
