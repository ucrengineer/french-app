using System.Net.Http.Json;
using System.Text.Json;
using french_app.Models;

namespace french_app.Services;

public sealed class VocabularyService
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web)
    {
        PropertyNameCaseInsensitive = true
    };

    private readonly HttpClient _http;

    public VocabularyService(HttpClient http)
    {
        _http = http;
    }

    public async Task<IReadOnlyList<string>> GetAvailableWeeksAsync(CancellationToken cancellationToken = default)
    {
        // wwwroot/files/index.json should contain: ["week1", "week2", ...]
        var weeks = await _http.GetFromJsonAsync<List<string>>("files/index.json", JsonOptions, cancellationToken);
        return (weeks ?? new List<string>())
            .Where(w => !string.IsNullOrWhiteSpace(w))
            .Select(w => w.Trim().TrimEnd('/'))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .OrderBy(w => w, StringComparer.OrdinalIgnoreCase)
            .ToList();
    }

    public async Task<VocabularyWeek?> LoadWeekAsync(string weekId, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(weekId))
        {
            return null;
        }

        weekId = weekId.Trim().TrimEnd('/');

        // wwwroot/files/{weekId}/vocab.json by convention
        var terms = await _http.GetFromJsonAsync<List<VocabularyTerm>>($"files/{Uri.EscapeDataString(weekId)}/vocab.json", JsonOptions, cancellationToken);
        var cleaned = (terms ?? new List<VocabularyTerm>())
            .Where(t => !string.IsNullOrWhiteSpace(t.FrenchText) || !string.IsNullOrWhiteSpace(t.EnglishText))
            .ToList();

        return new VocabularyWeek
        {
            WeekId = weekId,
            Terms = cleaned
        };
    }
}
