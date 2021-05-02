using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Matcha.Server.MailClient
{
    public static class MailClient
    {
        public static string BuildConfirmEmailMessageBody(Guid code)
        {
            var body = string.Format(
                "<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.0 Transitional//RU'>" +
                "<tr><th>" +
                "" +
                "    <table bgcolor='#5D535E' border='0' cellpadding='0' cellspacing='0' width='100%'>" +
                "        <tbody>" +
                "        <tr>" +
                "            <th align='left' style='width:590'>" +
                "" +
                "        <table border='0' cellpadding='0' cellspacing='0' width='100%'>" +
                "            <tbody><tr><th>" +
                "            <table align='left' border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><td style='padding-bottom:0px;padding-left:80px;padding-top:0px;text-align:left;'>" +
                "                <span style='color: #EC96A4; font-size:30px;font-family: Verdana, Geneva, sans-serif;' charset='utf-8' lang='ru'>Matcha — найди свою судьбу</span>" +
                "            </td></tr></tbody></table>" +
                "        </th></tr></tbody>" +
                "        </table>" +
                "    </th>" +
                "            <th align='right' style='width:80px'>" +
                "        <table align='right' border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><th style='padding:0;width:80px'>" +
                "            <div style='background:#9A9EAB;width:80px;height:80px;'></div>" +
                "        </th></tr></tbody></table>" +
                "" +
                "            </th>" +
                "        </tr>" +
                "    </tbody>" +
                "    </table>" +
                "" +
                "" +
                "    <table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><th style='background:#5D535E;padding:0;width:80px'>" +
                "        &nbsp;" +
                "    </th><th style='background:#EC96A4;padding:0;width:590px'>" +
                "        <table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><th>" +
                "            <table align='right' border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><th style='padding:0 80px 0 490px;width:20px'>" +
                "                <div style='background:#b9d6e5;width:20px;height:20px;'></div>" +
                "            </th></tr></tbody></table>" +
                "        </th></tr><tr><th  style='color:#ffffff; font-weight:300; text-align:left; border:medium;padding:32px 75px 32px 75px;vertical-align:middle;width:100%'>" +
                "            <p>" +
                "            Привет, мой одинокий друг! Ты зарегистрировался на сайте двух прекрасных разработчиков: ubartemi и dbendu." +
                "            <br>" +
                "            Наш сайт непременно поможет найти тебе вторую половинку. Тыкай на кнопку ниже, чтобы начать пользоваться сайтом!" +
                "        </p>" +
                "                 <table align='left' border='0' cellpadding='0' cellspacing='0'><tbody><tr><td style='background:#ffffff;padding:10px 24px 10px 24px'>" +
                "" +
                "                <a style='color:#5D535E' href='{0}' rel='noopener noreferrer'>Подтвердить Email<img valign='middle'></a>" +
                "            </td></tr></tbody></table>" +
                "" +
                "" +
                "        </th></tr><tr><th style='width:100%'>" +
                "            <table align='left' border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><th  style='padding:0 562px 0 0;width:28px'>" +
                "                <div style='background:#e2e3e7;width:28px;height:28px;'></div>" +
                "            </th></tr></tbody></table>" +
                "        </th></tr></tbody></table>" +
                "    </th></tr></tbody></table>" +
                "" +
                "" +
                "    <table align='left' bgcolor='#5D535E' border='0' cellpadding='0' cellspacing='0' width='100%'><tbody><tr><th style='padding:0 590px 0 0;width:80px'>" +
                "        <div style='background:#9A9EAB;width:80px;height:80px;'></div>" +
                "    </th></tr></tbody></table>" +
                "" +
                "</th></tr>",
                $"http://localhost:3000/confirm-email?code={code}");

            return body;
        }

        public static async Task SendMailAsync(string to, string subject, string body)
        {
            using var mail = new MailMessage()
            {
                From = new MailAddress("mishayagudin2012@gmail.ru"),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
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
