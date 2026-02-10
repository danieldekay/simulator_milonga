<!--
Sync Impact Report:
- Version change: New -> 1.0.0
- List of modified principles: Initial creation of all principles
- Added sections: Core Principles, Technology Standards, Development Workflow
- Removed sections: N/A
- Templates requiring updates: N/A (Initial Setup)
- Follow-up TODOs: None
-->

# Simulator Milonga Constitution

## Core Principles

### I. Component-Driven UI Architecture

The user interface MUST be built using the shadcn/ui pattern. Reusable components reside in `src/components/ui`. Base components MUST be accessible, type-safe, and styleable via Tailwind CSS classes. Styling MUST rely on the `cn()` utility for class merging and conflict resolution to ensure consistency and extendability.

### II. Strict Type Safety

TypeScript is mandatory for all source code. Strict mode is enabled and enforced by `tsconfig.json`. The usage of the `any` type is forbidden unless strictly necessary and documented with a rationale. All components, hooks, and utility functions MUST have proper type definitions for props, arguments, and return values.

### III. Modern React Practices

Use React Functional Components and Hooks exclusively. Legacy patterns (e.g., class components) are prohibited. State management should be kept local or lifted to the nearest common ancestor; global state solutions are introduced only when necessary. Effect hooks (`useEffect`) should be minimized in favor of event handlers and derived state.

### IV. Automated Quality Gates

No code shall be committed or deployed without passing automated quality checks. The project mandates zero ESLint warnings and zero Prettier formatting issues. The build process (Vite + TSC) MUST succeed without errors. GitHub Actions automatically enforcing these gates on deployment ensures production stability.

### V. Continuous Deployment

The `main` branch represents the production state and MUST always be deployable. Every push to `main` triggers an automatic deployment to GitHub Pages via GitHub Actions. The application architecture must support hosting in a subdirectory (specifically `/simulator_milonga/`) as configured in `vite.config.ts`.

## Technology Standards

- **Framework**: React 19+, built with Vite.
- **Styling**: Tailwind CSS (v4+) using CSS Variables for theming (supporting light/dark modes). Direct CSS usage is restricted to global resets or complex animations not coverable by utilities.
- **Language**: TypeScript (ESNext target) with strict type checking.
- **Deployment**: GitHub Pages via GitHub Actions (Static site generation).

## Development Workflow

Feature work should be performed on dedicated feature branches. Pull Requests or merges to the `main` branch automatically trigger the CI/CD pipeline defined in `.github/workflows/deploy.yml`. Developers MUST verify that `npm run lint`, `npm run format:check`, and `npm run build` pass locally before pushing changes to ensure the integrity of the release pipeline.

## Governance

This Constitution serves as the primary source of truth for architectural decisions and development standards. It supersedes oral tradition or ad-hoc practices. Amendments to this document require a documented rationale, approval, and a corresponding version bump.

All Pull Requests and code reviews must verify compliance with these principles. Non-compliant code (e.g., using `any`, bypassing the linter, or breaking the build) must be rejected. The `README.md` and codebase configuration (ESLint, TSConfig) serve as the functional implementation of these governance rules.

**Version**: 1.0.0 | **Ratified**: 2026-02-10 | **Last Amended**: 2026-02-10
