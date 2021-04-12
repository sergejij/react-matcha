using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Matcha.Server.Models.Users
{
    public sealed record SortParametersModel 
    {
        [Required]
        public int Page { get; set; }

        [Required]
        public int Size { get; set; }

        public OrderMethodsEnum OrderBy { get; set; }

        public int? minAge { get; set; }

        public int? maxAge { get; set; }

        public int? minRating { get; set; }

        #region Валидация модели


        #endregion

        #region Вспомогательные структуры

        public enum OrderMethodsEnum
        {
            Id,
            Age,
            Distance,
            Rating,
            CommonInterests
        }

        private readonly Dictionary<string, OrderMethodsEnum> KnownOrderMethodsStrings = new()
        {
            { "id", OrderMethodsEnum.Id },
            { "age", OrderMethodsEnum.Age },
            { "distance", OrderMethodsEnum.Distance },
            { "rating", OrderMethodsEnum.Rating },
            { "commonTags", OrderMethodsEnum.CommonInterests }
        };

        #endregion
    }
}
