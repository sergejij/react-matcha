using System.Collections.Generic;

namespace Matcha.Server.Models.Profile
{
    public sealed record InterestsModel
    {
        public HashSet<string> Interests { get; set; }
    }
}
