using System.ComponentModel.DataAnnotations;

namespace Matcha.Server.Models.Account
{
    public class AccountAuthModel
    {
        /// <summary>
        /// В этом поле может содержаться как email, так и login
        /// </summary>
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
