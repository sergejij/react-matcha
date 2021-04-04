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

        public string OrderBy { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (OrderBy is null)
                OrderBy = "id";

            if (KnownOrderMethods.Contains(OrderBy) is false)
                yield return new ValidationResult($"Неизвестный вид сортировки: {OrderBy}. Поддерживаемые виды: {string.Join(',', KnownOrderMethods)}");
        }

        public static HashSet<string> KnownOrderMethods = new HashSet<string>
        {
            "id",
            "age",
            //"location",
            "rating",
            //"common_tags"
        };
    }
}
