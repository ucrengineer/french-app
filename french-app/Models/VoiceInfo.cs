namespace french_app.Models;

using System.Text.Json.Serialization;

public class VoiceInfo
{
    [JsonPropertyName("voiceURI")]
    public string VoiceUri { get; set; } = "";

    [JsonPropertyName("name")]
    public string Name { get; set; } = "";

    [JsonPropertyName("lang")]
    public string Lang { get; set; } = "";

    [JsonPropertyName("localService")]
    public bool LocalService { get; set; }

    [JsonPropertyName("default")]
    public bool Default { get; set; }
}
