## Commands

**Development:**
- `npm run dev` - Start Vite development server with hot module replacement
- `npm run build` - Build production bundle using Vite
- `npm run preview` - Preview production build locally

**Code Quality:**
- `npm run lint` - Run ESLint for code quality checks
- `npm run type-check` - Run TypeScript type checking without emitting files
- `npm run watch` - Watch mode for TypeScript type checking

**Deployment:**
- `npm run deploy` - Build and deploy to GitHub Pages (uses gh-pages package)

## Project Architecture

This is a React + TypeScript single-page application for the Havelland Technology Meetup website, built with Vite and styled using Tailwind CSS and Material-UI.

**Key Technologies:**
- React 19 with TypeScript
- Vite for bundling with SWC for fast refresh
- Tailwind CSS v4 integrated via @tailwindcss/vite
- Material-UI v7 components
- i18next for internationalization (German/English)
- dayjs for date handling with timezone support

**Core Structure:**
- `/src/App.tsx` - Main application component with sections for hero, event, and about us
- `/src/next_meetup.ts` - Configuration for upcoming meetup date and location
- `/src/translate/` - Translation files for German and English
- `/src/component/` - Reusable React components (countdown, event details, footer, etc.)
- `/src/utils/i18n.ts` - i18next configuration, defaults to English

**Important Files:**
- Next meetup date/location is configured in `/src/next_meetup.ts`
- Translations are managed in `/src/translate/de.ts` and `/src/translate/en.ts`
- The app uses `font-['Press_Start_2P']` for retro pixel font styling

**TypeScript Configuration:**
- Strict mode enabled with all strict checks
- Module resolution set to bundler mode
- Target ES2020 with React JSX transform