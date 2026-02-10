# Simulator Milonga

A modern web application built with the latest 2026 best practices and tooling.

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite (lightning-fast builds)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui-style components with patterns
- **Code Quality**: ESLint, Prettier
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Code Quality

#### Format Code

```bash
npm run format
```

#### Check Formatting

```bash
npm run format:check
```

#### Lint Code

```bash
npm run lint
```

## Project Structure

```
src/
├── components/          # React components
│   └── ui/            # shadcn-style UI components (Button, Card, etc.)
├── lib/               # Utility functions
│   └── utils.ts       # Helper functions (cn, etc.)
├── assets/            # Static assets
├── App.tsx            # Main App component
├── main.tsx           # Application entry point
└── index.css          # Global styles with Tailwind directives
```

## Key Features

### Component Library

This project includes shadcn/ui-style components with full TypeScript support:

- **Button**: Versatile button component with multiple variants and sizes
- **Card**: Container component with header, content, and footer sections
- **Utilities**: `cn()` function for merging Tailwind CSS classes

Components are located in `src/components/ui/` and can be easily extended with additional shadcn components.

### TypeScript

- Strict mode enabled
- Full type checking with `@types` packages
- Path aliases configured (`@/` → `src/`)

### Tailwind CSS

- Configured with CSS variables for theming
- Light and dark mode support
- Custom color variables for shadcn components

### Code Quality Tools

- **ESLint**: Catches errors and enforces best practices
- **Prettier**: Automatic code formatting with Tailwind class ordering

## VS Code Setup

Recommended extensions are listed in `.vscode/extensions.json`:

- **Prettier** - Code formatter
- **ESLint** - Lint integration
- **Tailwind CSS IntelliSense** - Class suggestions
- **React Component Generator**

The workspace is configured to auto-format on save.

## Dark Mode

The project includes CSS variables for light and dark mode theming. Add `dark` class to the root HTML element to enable dark mode:

```html
<html class="dark"></html>
```

## Adding Components

To add new shadcn-style components:

1. Create a new file in `src/components/ui/`
2. Follow the pattern of existing components (use CVA for variants)
3. Export from the component file
4. Import and use in your application

Example:

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

## Performance

- Vite provides instant server start and lightning-fast HMR
- React 19 with optimized rendering
- Tree-shaking and code splitting for smaller bundle sizes
- CSS variables instead of large CSS-in-JS libraries

## Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

**Live Site**: https://danieldekay.github.io/simulator_milonga/

**Features**:

- Automatic builds on every push to `main` branch
- Configured with base path `/simulator_milonga/`
- Uses GitHub Actions workflow in `.github/workflows/deploy.yml`

**Manual Deployment**:
If needed, you can deploy manually:

```bash
npm run deploy
```

**Setup Requirements**:

1. Ensure GitHub Pages is enabled in repository settings
2. Set deployment source to "GitHub Actions" in repository settings
3. SSH key configured for `git@github.com` (already set up)

**Push to Main**:

```bash
git push origin main
```

The GitHub Actions workflow will automatically:

1. Install dependencies
2. Build the project with Vite
3. Deploy the `dist/` folder to GitHub Pages

## Learn More

- [React Documentation](https://react.dev)
- [Vite Guide](https://vite.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## License

MIT
