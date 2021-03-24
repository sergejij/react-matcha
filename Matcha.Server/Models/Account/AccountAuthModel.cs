using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Matcha.Server.Models.Account
{
    public class AccountAuthModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
