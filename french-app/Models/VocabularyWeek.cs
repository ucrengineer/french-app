namespace french_app.Models;

public sealed class VocabularyWeek
{
    public required string WeekId { get; init; }

    public required IReadOnlyList<VocabularyTerm> Terms { get; init; }
}
