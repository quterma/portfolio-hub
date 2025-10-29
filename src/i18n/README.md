# i18n Implementation

Internationalization (i18n) setup using next-intl for Next.js App Router.

## Structure

```
src/i18n/
├── index.ts                    # Main exports
├── locales.ts                  # Locale definitions and types
├── request.ts                  # next-intl configuration
├── i18n-utils.ts               # Helper functions
├── i18n-utils.test.ts          # Comprehensive tests
└── README.md                   # This file
```

## Testing

The test file includes:

### Core Utils (Unit Tests)

- `getMessages()` - Message retrieval and fallback
- `isSupportedLocale()` - Locale validation
- `getAvailableLocales()` - Available locales list
- `getDefaultLocale()` - Default locale getter
- Type safety validation
- Integration tests

### HTTP Integration (MSW Tests)

- Mock server setup for API testing
- HTTP request mocking examples
- Error handling scenarios
- Override patterns for specific tests

Run tests:

```bash
npm test src/i18n/
```

## Usage

```typescript
import { getMessages, isSupportedLocale } from "@/i18n"

// Check supported locale
if (isSupportedLocale("en")) {
  const messages = getMessages("en")
  console.log(messages.nav.home) // "Home"
}
```
