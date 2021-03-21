using System.Net;
using System.Net.Mail;

namespace Matcha.Server.MailClient
{
    public static class MailClient
    {
        public static void SendMail(in string to, in string subject, in string body)
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
                Credentials = new NetworkCredential("mishayagudin2012@gmail.com", "*Itoses80*"),
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network
            };

            client.Send(mail);
        }
    }
}
