using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Matcha.Server.Models.Account
{
    [BindProperties(SupportsGet = true)]
    public sealed class AccountRegisterModel
    {
        [JsonProperty(PropertyName = "Email")]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "Login")]
        public string Login { get; set; }

        [JsonProperty(PropertyName = "Password")]
        public string Password { get; set; }

        [JsonProperty(PropertyName = "Name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "Surname")]
        public string Surname { get; set; }
    }
}
