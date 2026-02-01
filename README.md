# French Vocabulary Study (Blazor WASM)

Blazor WebAssembly app for studying weekly French vocabulary for **FREN 102-601** at **Southwestern Community College**.

## Features
- Weeks list (`/vocabulary`)
- Week detail (term list)
- Flashcards study mode (single week or all weeks)

## Getting started
1. Run the app.
2. Add weekly vocab JSON files under `french-app/wwwroot/files/`.

> Note: This repo is tailored to the FREN 102-601 course workflow/content. If you are using it for a different course/section, update the vocabulary JSON files and any course-specific wording.

### File layout
- `french-app/wwwroot/files/index.json`
  - JSON array of week folder names:
    - `["week1", "week2"]`
- `french-app/wwwroot/files/<week>/vocab.json`
  - JSON array of vocabulary terms.

### Term schema
Each term supports:
- `french` or `fr`
- `english` or `en`
- optional `example`
- optional `notes`

Example:
- `french-app/wwwroot/files/week1/vocab.json`

```json
[
  { "french": "bonjour", "english": "hello" },
  { "fr": "au revoir", "en": "goodbye", "example": "Au revoir et à bientôt." }
]
```

## Routes
- `/` Home
- `/vocabulary` Weeks
- `/vocabulary/{weekId}` Week terms
- `/vocabulary/study` Study picker
- `/vocabulary/study/{weekId}` Flashcards (`weekId` can be `all`)

## License
MIT. See `LICENSE`.
