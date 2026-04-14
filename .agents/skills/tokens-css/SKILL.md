

# CSS Tokens System

## Purpose
Define and enforce the CSS token layer used across the project.
This skill works under the `design-system` rules from `.agents/skills/AGENTS.md`, so token decisions must support the project’s typography, spacing, and visual consistency requirements.

Define and enforce a consistent CSS token architecture.

The token order must always be:

1. primitives
2. semantic tokens
3. component tokens

Never skip levels.  
Never define component styles directly from raw values if a semantic token should exist.

---

## Token Architecture

### 1. Primitives first
Primitives are the raw design values.

They include:
- base colors
- spacing values
- font sizes
- radii
- shadows
- z-index values
- motion durations
- easing values

Primitives are not tied to UI meaning.  
They are the source values from which the rest of the system is built.

Examples:
- `--color-gray-50`
- `--color-gray-900`
- `--color-blue-500`
- `--space-4`
- `--radius-md`
- `--shadow-sm`
- `--duration-fast`

Rules:
- primitives may contain raw values
- primitives should be named systematically
- primitives should not describe UI intent
- primitives should not be used directly in components unless there is a very strong reason

---

### 2. Generate semantic tokens after
Semantic tokens map primitives to meaning in the interface.

They describe purpose, not raw value.

Examples:
- `--color-bg-page`
- `--color-bg-surface`
- `--color-text-primary`
- `--color-text-muted`
- `--color-border-default`
- `--color-action-primary`
- `--space-section`
- `--shadow-card`

Rules:
- semantic tokens should reference primitives
- semantic tokens should express role and meaning
- semantic tokens are the default tokens used by layouts and components
- do not hardcode raw values into semantic tokens if a primitive exists

Example:
```css
:root {
  /* primitives */
  --color-gray-50: #f8fafc;
  --color-gray-900: #0f172a;
  --color-blue-600: #2563eb;

  /* semantic */
  --color-bg-page: var(--color-gray-50);
  --color-text-primary: var(--color-gray-900);
  --color-action-primary: var(--color-blue-600);
}


## Priority
When token choices are unclear:
1. Follow `design-system` first
2. Use semantic tokens over raw values
3. Prefer reusable tokens over one-off variables

## Required Token Layers

### 1. Foundations in `:root`
All shared tokens must live in `:root`.
Do not declare ad hoc global values inside components.


## Rules
- Define all reusable colors as tokens in `:root`
- Start with primitive tokens, then add the semantic tokens
- Prefer semantic names over visual names
- Use one token system consistently across the file
- Keep typography and spacing tokenized when refactoring styles
- Tokens should express purpose, not implementation detail
- Use oklch for colors

## Do Not
- Hardcode hex, rgb, hsl, or named colors in component rules
- Mix raw palette tokens and semantic tokens in the same property path without a clear mapping layer
- Introduce one-off variables for a single selector when an existing token fits
- Break the spacing scale with arbitrary values unless there is a strong layout reason

## Preferred Naming

### Color
- `--color-*` for semantic UI colors
- `--surface-*` only if the surface system is already established

### Typography
- `--font-*`
- `--text-*` for sizes, line heights, or readable text roles

### Spacing
- `--space-*`
- `--section-*` or `--layout-*` only for higher-level layout abstractions

## Refactor Workflow
1. Find hardcoded visual values
2. Move shared values into `:root`
3. Map raw values to semantic tokens
4. Replace component rules with semantic token usage
5. Normalize spacing and typography to design-system expectations

## Example

Instead of:

```css
.card {
  background: #fff;
  color: #141b2e;
  padding: 18px;
}
```

Use:

```css
:root {
  --color-surface: #fff;
  --color-text: #141b2e;
  --space-2: 1rem;
  --space-3: 1.5rem;
}

.card {
  background: var(--color-surface);
  color: var(--color-text);
  padding: var(--space-3);
}
```

## When To Use
- Styling new UI
- Refactoring CSS
- Converting hardcoded values into reusable tokens
- Aligning components with the project design system
