using System.Text.Json.Serialization;

namespace french_app.Models;

public sealed class VocabularyTerm
{
    [JsonPropertyName("french")]
    public string? French { get; set; }

    [JsonPropertyName("fr")]
    public string? Fr { get; set; }

    [JsonPropertyName("english")]
    public string? English { get; set; }

    [JsonPropertyName("en")]
    public string? En { get; set; }

    [JsonPropertyName("example")]
    public string? Example { get; set; }

    [JsonPropertyName("notes")]
    public string? Notes { get; set; }

    [JsonIgnore]
    public string FrenchText => (French ?? Fr ?? string.Empty).Trim();

    [JsonIgnore]
    public string EnglishText => (English ?? En ?? string.Empty).Trim();
}
