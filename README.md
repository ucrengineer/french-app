# French Vocabulary Study (Blazor WASM)

A mobile-friendly Blazor WebAssembly app for studying French vocabulary from weekly JSON files.

## Features
- Weeks list (`/vocabulary`)
- Week detail (term list)
- Flashcards study mode (single week or all weeks)

## Getting started
1. Run the app.
2. Add weekly vocab JSON files under `french-app/wwwroot/files/`.

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
