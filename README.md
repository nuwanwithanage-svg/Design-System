# Design System

A token-based design system with a structured colour system, typography, spacing, and component library.

## Token Structure

Tokens are maintained in `tokens/tokens.updated.json` and organised into two layers:

| Layer | Purpose |
|---|---|
| **Primitives** | Raw colour values — the palette. Never use directly in components. |
| **Semantic** | Purpose-driven aliases of primitives. Always use these in components. |

## Colour System

The colour system is fully documented in [`colours/README.md`](./colours/README.md).

- **7 primitive palettes**: Red, Orange, Yellow, Green, Blue, Greyscale, Black & White
- **59 semantic tokens** organised across 6 groups: Background, Text, Border, Icon, Focus, Input

## Token Files

- [`tokens/tokens.updated.json`](./tokens/tokens.updated.json) — Tokens Studio compatible JSON. Import into Figma via the Tokens Studio plugin.

## Tooling

| Tool | Purpose |
|---|---|
| [Tokens Studio](https://tokens.studio/) | Sync tokens to/from Figma |
| [Style Dictionary](https://amzn.github.io/style-dictionary/) | Transform tokens to CSS / JS / Swift |

## Figma

Design file: [Design System — Figma](https://www.figma.com/design/6kdOU2Ez2KVChX26VSMPe7/Design-System)
