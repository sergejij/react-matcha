using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Matcha.Server.Models.Users
{
    public sealed record SortParametersModel : IValidatableObject
    {
        [Required]
        public int Page { get; set; }

        [Required]
        public int Size { get; set; }

        private string OrderByStr { get; set; }

        public OrderMethodsEnum OrderBy { get; set; }

        public int? minAge { get; set; }

        public int? maxAge { get; set; }

        #region Валидация модели

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (OrderByStr is null)
                OrderByStr = "id";

            if (KnownOrderMethodsStrings.ContainsKey(OrderByStr) is false)
                yield return new ValidationResult($"Неизвестный тип сортировки: {OrderByStr}. Поддерживаемые сортировки: {string.Join(',', KnownOrderMethodsStrings.Values)}");

            OrderBy = KnownOrderMethodsStrings[OrderByStr];
        }

        #endregion

        #region Вспомогательные структуры

        public enum OrderMethodsEnum
        {
            Id,
            Age,
            Distance,
            Rating,
            CommonTags
        }

        private readonly Dictionary<string, OrderMethodsEnum> KnownOrderMethodsStrings = new()
        {
            { "id", OrderMethodsEnum.Id },
            { "age", OrderMethodsEnum.Age },
            { "distance", OrderMethodsEnum.Distance },
            { "rating", OrderMethodsEnum.Rating },
            { "commonTags", OrderMethodsEnum.CommonTags }
        };

        #endregion
    }
}
