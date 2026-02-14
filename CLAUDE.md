# HVL Tech Website

Community meetup website for Havelland Tech (React SPA, bilingual DE/EN, retro pixel aesthetic).

## Tech Stack

- React 19 + TypeScript + Vite (SWC)
- Tailwind CSS 4 + MUI (icons, Dialog only)
- i18next for translations (EN default, DE)
- dayjs for dates, Swiper for gallery
- Deployed to GitHub Pages via GitHub Actions on push to `main`

## Commands

```bash
npm run dev          # Dev server
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # TypeScript check (tsc --noEmit)
```

## Project Structure

```
src/
├── App.tsx              # Main layout with all sections
├── next_meetup.ts       # Next meetup date config (dayjs, Europe/Berlin)
├── component/           # React components (functional, typed props)
│   └── ui/              # Reusable UI primitives (buttonPixel)
├── translate/           # en.ts, de.ts - translation objects
├── utils/i18n.ts        # i18next config
└── assets/              # Images, SVGs, favicons
```

## Conventions

- **Components**: Functional with explicit TypeScript prop types (e.g. `type CardProps = { ... }`)
- **Styling**: Tailwind utility classes inline. Key colors: `#00274a` (primary blue), `#fefefe` (off-white), `#0d1b21` (dark bg)
- **Fonts**: `Press Start 2P` for headings (pixel style), `Iosevka` / `Roboto` for body
- **Borders/Shadows**: 4px solid black borders, pixelated shadows `shadow-[4px_4px_0px_#...]`
- **Path aliases**: `@/` = `src/`, `@asset/` = `src/assets/`

## Translations

Both `src/translate/en.ts` and `src/translate/de.ts` must stay in sync. Structure:

```typescript
const xx = { translation: { countdown: {...}, aboutAs: {...}, oldEvents: [...], newEvents: [...], ... } }
```

Events are stored as arrays with `returnObjects: true`. When adding/editing events, update both language files.

## No Tests

There is no test framework configured. Do not add test files unless explicitly asked.
