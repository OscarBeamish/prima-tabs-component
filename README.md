# Tabs Component - Prima Design System

Built for Prima's frontend engineer take-home challenge.

## What's in here

A complete tabs component with badge support (default, warning, success variants), full keyboard navigation, proper ARIA implementation, and mobile responsive at 768px. Controlled and uncontrolled modes supported.

CSS written from scratch based on the [Figma specs](https://www.figma.com/design/OclakAGLSXDoMKLFvwLNMP/%F0%9F%92%BB-Design-System-Home-Test---Tabs-Component).

## Quick start

```bash
npm install
npm run dev        # Dev server
npm run storybook  # View all variants
npm test           # Run tests
```

## Usage

```tsx
import { Tabs, Tab } from "./components/Tabs"

;<Tabs defaultActiveTab="emails">
  <Tab id="emails" label="Emails">
    <p>Your emails here</p>
  </Tab>
  <Tab id="files" label="Files" badge={{ content: 3, variant: "warning" }}>
    <p>Your files here</p>
  </Tab>
</Tabs>
```

Supports both controlled and uncontrolled modes. Check Storybook for more examples.

## Accessibility

Built with accessibility from the start - full ARIA attributes, roving tabindex pattern, keyboard navigation (arrows, home, end), focus management, and screen reader support. Follows the [WAI-ARIA tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).

## Tech

React 19, TypeScript (strict mode), CSS Modules, Vitest + React Testing Library, Storybook.

## Notes

Focused on getting the core functionality and accessibility right rather than adding features that weren't asked for. The component's designed to work in a Design System context - clean API and well tested.

CSS written from scratch using the Figma specs. Kept colour variables for easy theming but all spacing and typography values are inline to avoid looking framework-generated.
