using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Matcha.Server.Models.Account
{
    public sealed class AccountRegisterModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Login { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }
    }
}
