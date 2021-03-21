using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Matcha.Server.Models.Account
{
    [BindProperties(SupportsGet = true)]
    public sealed class AccountRegisterModel
    {
        [JsonProperty(PropertyName = "Email", Required = Required.Always)]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "Login", Required = Required.Always)]
        public string Login { get; set; }

        [JsonProperty(PropertyName = "Password", Required = Required.Always)]
        public string Password { get; set; }

        [JsonProperty(PropertyName = "Name", Required = Required.Always)]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "Surname", Required = Required.Always)]
        public string Surname { get; set; }
    }
}
