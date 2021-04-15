using System.ComponentModel.DataAnnotations;

namespace Matcha.Server.Models.Users
{
    public sealed record SortParametersModel
    {
        [Required]
        public int Page { get; set; }

        [Required]
        public int Size { get; set; }

        public OrderMethodsEnum OrderBy { get; set; }

        public int? Min { get; set; }

        public int? Max { get; set; }

        #region Вспомогательные структуры

        public enum OrderMethodsEnum
        {
            Id,
            Age,
            Distance,
            Rating,
            CommonInterests
        }

        #endregion
    }
}
