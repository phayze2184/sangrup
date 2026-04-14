# AGENTS — Project Intelligence Layer

## Purpose

This file orchestrates how AI agents (Codex) behave inside this project.
It defines **which skills to use**, **when to use them**, and **how to prioritize decisions**.

The goal is:

* consistent UI/UX
* clean, scalable code
* strict design system enforcement

---

# 🔁 Decision Priority (VERY IMPORTANT)

When multiple rules apply, follow this order:

1. **design-system**
2. **tokens-css**
3. **astro-components**
4. **css-* skills**
5. **motion-ui**

👉 Design consistency ALWAYS overrides implementation convenience.

---

# Skill Routing

## UI / Visual / Styling decisions

→ Use: `design-system`

Applies to:

* typography
* spacing
* colors
* hierarchy
* layout aesthetics

---

## Colors, variables, theming

→ Use: `tokens-css`

Rules:

* Never hardcode colors
* Always use CSS variables from `:root`
* Prefer semantic tokens over raw values

---

## Component architecture (Astro)

→ Use: `astro-components`

Applies to:

* creating new components
* refactoring large files
* structuring folders

---

## 📐 Layout / spacing / responsiveness

→ Use:

* `css-layout`
* `css-responsive`

---

## Debugging / fixing CSS issues

→ Use:

* `css-debug`
* `css-audit`

---

## ♿ Accessibility

→ Use: `css-a11y`

---

## Animations / motion

→ Use: `motion-ui`

Rules:

* motion must support UX, not distract
* prefer transform + opacity
* keep animations subtle

---

# Global Rules (Hard Constraints)

## Design

* No random styles
* No inconsistent spacing
* No visual noise

## CSS

* No hardcoded colors
* No inline styles (unless justified)
* No breaking the token system

## Components

* No large monolithic components
* Always prefer reusable structure

## Performance

* Avoid unnecessary JS
* Prefer CSS where possible
* Keep bundle minimal

---

# Architecture Guidelines

## Components structure

/components/

* ui/ → buttons, inputs, small reusable elements
* layout/ → containers, sections
* blocks/ → page-level compositions

---

## Styling strategy

* Global tokens in `:root`
* Component-level styles scoped
* Avoid duplication

---

# ⚡ Behavior Expectations

The agent should:

* Think like a **senior frontend engineer**
* Think like a **design system guardian**
* Optimize for **clarity, not cleverness**
* Prefer **simple, maintainable solutions**

---

# When Uncertain

If multiple valid approaches exist:

1. Choose the one that:

   * respects design-system
   * uses tokens correctly
   * improves reusability

2. Avoid:

   * hacks
   * quick fixes
   * one-off solutions

---

# Evolution Rule

If a better pattern is discovered:

* suggest updating a relevant SKILL.md
* keep the system self-improving

---

# Summary

This project enforces:

* strict design consistency
* token-based styling
* modular Astro architecture
* clean, scalable frontend practices

AI must act accordingly.
