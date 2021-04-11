using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Matcha.Server.MailClient
{
    public static class MailClient
    {
        public static async Task SendMailAsync(string to, string subject, string body)
        {
            using var mail = new MailMessage()
            {
                From = new MailAddress("mishayagudin2012@gmail.ru"),
                Subject = subject,
                Body = body
            };
            mail.To.Add(new MailAddress(to));

            using var client = new SmtpClient()
            {
                Host = "smtp.gmail.com",
                Port = 587,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(AppConfig.Constants.GmailLogin, AppConfig.Constants.GmailPassword),
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network
            };

            await client.SendMailAsync(mail);
        }
    }
}
