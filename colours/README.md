# Colour System

The colour system is built in two layers: **Primitives** (raw palette values) and **Semantic** (purpose-driven tokens). Always use semantic tokens in components and code — never reference primitives directly.

---

## Primitive Palettes

Primitives are the raw colour scales. They are the source of truth that semantic tokens reference.

### Green

The brand colour palette.

| Token | Variable | Hex | Swatch |
|---|---|---|---|
| `Green.10` | `--color-green-10` | `#f3fffc` | ![#f3fffc](https://via.placeholder.com/16/f3fffc/f3fffc.png) |
| `Green.20` | `--color-green-20` | `#d0fff6` | ![#d0fff6](https://via.placeholder.com/16/d0fff6/d0fff6.png) |
| `Green.30` | `--color-green-30` | `#acffef` | ![#acffef](https://via.placeholder.com/16/acffef/acffef.png) |
| `Green.40` | `--color-green-40` | `#85f6e0` | ![#85f6e0](https://via.placeholder.com/16/85f6e0/85f6e0.png) |
| `Green.50` | `--color-green-50` | `#6cd9c4` | ![#6cd9c4](https://via.placeholder.com/16/6cd9c4/6cd9c4.png) |
| `Green.60` | `--color-green-60` | `#56bca8` | ![#56bca8](https://via.placeholder.com/16/56bca8/56bca8.png) |
| `Green.70` | `--color-green-70` | `#429f8d` | ![#429f8d](https://via.placeholder.com/16/429f8d/429f8d.png) |
| `Green.80` | `--color-green-80` | `#318272` | ![#318272](https://via.placeholder.com/16/318272/318272.png) |
| `Green.90` | `--color-green-90` | `#226558` | ![#226558](https://via.placeholder.com/16/226558/226558.png) |
| `Green.100` | `--color-green-100` | `#15483e` | ![#15483e](https://via.placeholder.com/16/15483e/15483e.png) |

### Blue

Used for informational states.

| Token | Variable | Hex |
|---|---|---|
| `Blue.10` | `--color-blue-10` | `#ecf7ff` |
| `Blue.20` | `--color-blue-20` | `#b7e0ff` |
| `Blue.30` | `--color-blue-30` | `#8accff` |
| `Blue.40` | `--color-blue-40` | `#5cb8ff` |
| `Blue.50` | `--color-blue-50` | `#2ea4ff` |
| `Blue.60` | `--color-blue-60` | `#0088ef` |
| `Blue.70` | `--color-blue-70` | `#0070c6` |
| `Blue.80` | `--color-blue-80` | `#00599d` |
| `Blue.90` | `--color-blue-90` | `#004275` |
| `Blue.100` | `--color-blue-100` | `#002b4c` |

### Red

Used for error and destructive states.

| Token | Variable | Hex |
|---|---|---|
| `Red.10` | `--color-red-10` | `#ffeae7` |
| `Red.20` | `--color-red-20` | `#ffc5bd` |
| `Red.30` | `--color-red-30` | `#ffa193` |
| `Red.40` | `--color-red-40` | `#ff7c69` |
| `Red.50` | `--color-red-50` | `#ff573f` |
| `Red.60` | `--color-red-60` | `#ff3215` |
| `Red.70` | `--color-red-70` | `#e51c00` |
| `Red.80` | `--color-red-80` | `#bc1700` |
| `Red.90` | `--color-red-90` | `#931200` |
| `Red.100` | `--color-red-100` | `#6b0d00` |

### Yellow

Used for warning states.

| Token | Variable | Hex |
|---|---|---|
| `Yellow.10` | `--color-yellow-10` | `#fffbed` |
| `Yellow.20` | `--color-yellow-20` | `#fff3c4` |
| `Yellow.30` | `--color-yellow-30` | `#ffeb9b` |
| `Yellow.40` | `--color-yellow-40` | `#ffe273` |
| `Yellow.50` | `--color-yellow-50` | `#f2cf46` |
| `Yellow.60` | `--color-yellow-60` | `#d0b032` |
| `Yellow.70` | `--color-yellow-70` | `#ae9121` |
| `Yellow.80` | `--color-yellow-80` | `#8c7314` |
| `Yellow.90` | `--color-yellow-90` | `#6a560a` |
| `Yellow.100` | `--color-yellow-100` | `#483a03` |

### Orange

| Token | Variable | Hex |
|---|---|---|
| `Orange.10` | `--color-orange-10` | `#fff6ee` |
| `Orange.20` | `--color-orange-20` | `#ffe2ca` |
| `Orange.30` | `--color-orange-30` | `#ffcda5` |
| `Orange.40` | `--color-orange-40` | `#ffb981` |
| `Orange.50` | `--color-orange-50` | `#ffa55c` |
| `Orange.60` | `--color-orange-60` | `#dd8a46` |
| `Orange.70` | `--color-orange-70` | `#bb7034` |
| `Orange.80` | `--color-orange-80` | `#995824` |
| `Orange.90` | `--color-orange-90` | `#774217` |
| `Orange.100` | `--color-orange-100` | `#552d0d` |

### Greyscale

| Token | Variable | Hex |
|---|---|---|
| `Greyscale.10` | `--color-greyscale-10` | `#f5f5f5` |
| `Greyscale.20` | `--color-greyscale-20` | `#e1e1e1` |
| `Greyscale.30` | `--color-greyscale-30` | `#cccccc` |
| `Greyscale.40` | `--color-greyscale-40` | `#b8b8b8` |
| `Greyscale.50` | `--color-greyscale-50` | `#a3a3a3` |
| `Greyscale.60` | `--color-greyscale-60` | `#8f8f8f` |
| `Greyscale.70` | `--color-greyscale-70` | `#7b7b7b` |
| `Greyscale.80` | `--color-greyscale-80` | `#656566` |
| `Greyscale.90` | `--color-greyscale-90` | `#4f5052` |
| `Greyscale.100` | `--color-greyscale-100` | `#3b3b3d` |

### Black & White

| Token | Variable | Hex |
|---|---|---|
| `Black & White.Black` | `--color-black` | `#000000` |
| `Black & White.White` | `--color-white` | `#ffffff` |

---

## Semantic Tokens

Semantic tokens give colour a **purpose**. They alias primitives and communicate intent — use these in all component and layout code.

> **Rule:** Never reference a primitive token in a component. Always use a semantic token.

### Background

Controls surface, container, and page-level backgrounds.

| Token | CSS Variable | Hex | Primitive | Usage |
|---|---|---|---|---|
| `Background.Page` | `--color-bg-page` | `#ffffff` | `White` | Main page / document background |
| `Background.Surface` | `--color-bg-surface` | `#ffffff` | `White` | Card, modal, popover surfaces |
| `Background.Subtle` | `--color-bg-subtle` | `#f5f5f5` | `Greyscale.10` | Subdued section backgrounds, zebra rows |
| `Background.Muted` | `--color-bg-muted` | `#e1e1e1` | `Greyscale.20` | Skeleton loaders, dividers used as fill |
| `Background.Inverse` | `--color-bg-inverse` | `#3b3b3d` | `Greyscale.100` | Dark overlay tooltips, dark-on-light sections |

**Brand backgrounds**

| Token | CSS Variable | Hex | Primitive | Usage |
|---|---|---|---|---|
| `Background.Brand.Primary` | `--color-bg-brand-primary` | `#318272` | `Green.80` | Primary CTA button fill, key brand sections |
| `Background.Brand.Hover` | `--color-bg-brand-hover` | `#226558` | `Green.90` | CTA button hover state |
| `Background.Brand.Pressed` | `--color-bg-brand-pressed` | `#15483e` | `Green.100` | CTA button active/pressed state |
| `Background.Brand.Subtle` | `--color-bg-brand-subtle` | `#f3fffc` | `Green.10` | Tinted brand highlights, banners |

**State backgrounds**

| Token | CSS Variable | Hex | Usage |
|---|---|---|---|
| `Background.State.Success.Subtle` | `--color-bg-success-subtle` | `#f3fffc` | Success alert / toast background |
| `Background.State.Success.Bold` | `--color-bg-success-bold` | `#318272` | Filled success badge |
| `Background.State.Info.Subtle` | `--color-bg-info-subtle` | `#ecf7ff` | Info alert / banner background |
| `Background.State.Info.Bold` | `--color-bg-info-bold` | `#00599d` | Filled info badge |
| `Background.State.Warning.Subtle` | `--color-bg-warning-subtle` | `#fffbed` | Warning alert background |
| `Background.State.Warning.Bold` | `--color-bg-warning-bold` | `#8c7314` | Filled warning badge |
| `Background.State.Error.Subtle` | `--color-bg-error-subtle` | `#ffeae7` | Error alert / inline error background |
| `Background.State.Error.Bold` | `--color-bg-error-bold` | `#bc1700` | Filled error badge / destructive button |

---

### Text

Controls all text colours.

| Token | CSS Variable | Hex | Primitive | Usage |
|---|---|---|---|---|
| `Text.Primary` | `--color-text-primary` | `#3b3b3d` | `Greyscale.100` | Body text, headings — default text |
| `Text.Secondary` | `--color-text-secondary` | `#4f5052` | `Greyscale.90` | Supporting labels, captions |
| `Text.Tertiary` | `--color-text-tertiary` | `#7b7b7b` | `Greyscale.70` | Helper text, metadata |
| `Text.Placeholder` | `--color-text-placeholder` | `#8f8f8f` | `Greyscale.60` | Input placeholder text |
| `Text.Disabled` | `--color-text-disabled` | `#8f8f8f` | `Greyscale.60` | Disabled field labels and content |
| `Text.Inverse` | `--color-text-inverse` | `#ffffff` | `White` | Text on dark / brand-filled backgrounds |
| `Text.Brand` | `--color-text-brand` | `#226558` | `Green.90` | Brand-coloured links, active nav items |

**State text**

| Token | CSS Variable | Hex | Usage |
|---|---|---|---|
| `Text.State.Success` | `--color-text-success` | `#226558` | Success message text |
| `Text.State.Info` | `--color-text-info` | `#004275` | Info message text |
| `Text.State.Warning` | `--color-text-warning` | `#6a560a` | Warning message text |
| `Text.State.Error` | `--color-text-error` | `#931200` | Error message text, validation messages |

---

### Border

Controls strokes, dividers, and outlines.

| Token | CSS Variable | Hex | Primitive | Usage |
|---|---|---|---|---|
| `Border.Default` | `--color-border-default` | `#cccccc` | `Greyscale.30` | Default input, card, and container borders |
| `Border.Subtle` | `--color-border-subtle` | `#e1e1e1` | `Greyscale.20` | Hairline dividers, very light separators |
| `Border.Strong` | `--color-border-strong` | `#a3a3a3` | `Greyscale.50` | Prominent dividers, table borders |
| `Border.Disabled` | `--color-border-disabled` | `#e1e1e1` | `Greyscale.20` | Disabled input borders |
| `Border.Inverse` | `--color-border-inverse` | `#3b3b3d` | `Greyscale.100` | Border on light backgrounds needing contrast |
| `Border.Brand` | `--color-border-brand` | `#318272` | `Green.80` | Focused / selected component borders |

**State borders**

| Token | CSS Variable | Hex | Usage |
|---|---|---|---|
| `Border.State.Success` | `--color-border-success` | `#318272` | Success-state input or container border |
| `Border.State.Info` | `--color-border-info` | `#00599d` | Info-state border |
| `Border.State.Warning` | `--color-border-warning` | `#8c7314` | Warning-state border |
| `Border.State.Error` | `--color-border-error` | `#bc1700` | Error-state input border |

---

### Icon

Controls icon fills.

| Token | CSS Variable | Hex | Primitive | Usage |
|---|---|---|---|---|
| `Icon.Primary` | `--color-icon-primary` | `#4f5052` | `Greyscale.90` | Default icons alongside primary text |
| `Icon.Secondary` | `--color-icon-secondary` | `#7b7b7b` | `Greyscale.70` | Supporting / decorative icons |
| `Icon.Disabled` | `--color-icon-disabled` | `#8f8f8f` | `Greyscale.60` | Icons in disabled components |
| `Icon.Inverse` | `--color-icon-inverse` | `#ffffff` | `White` | Icons on dark / brand backgrounds |
| `Icon.Brand` | `--color-icon-brand` | `#226558` | `Green.90` | Brand-coloured icons, active states |

**State icons**

| Token | CSS Variable | Hex | Usage |
|---|---|---|---|
| `Icon.State.Success` | `--color-icon-success` | `#226558` | Success icon |
| `Icon.State.Info` | `--color-icon-info` | `#004275` | Info icon |
| `Icon.State.Warning` | `--color-icon-warning` | `#6a560a` | Warning icon |
| `Icon.State.Error` | `--color-icon-error` | `#931200` | Error icon |

---

### Focus

Controls focus ring visibility for keyboard navigation and accessibility.

| Token | CSS Variable | Hex | Primitive | Usage |
|---|---|---|---|---|
| `Focus.Ring` | `--color-focus-ring` | `#acffef` | `Green.30` | Standard focus ring (all interactive elements) |
| `Focus.RingError` | `--color-focus-ring-error` | `#ffa193` | `Red.30` | Focus ring when element is in error state |

> These tokens map to `box-shadow` or `outline` on focused elements. Ensure the focus ring has sufficient contrast against the background per WCAG 2.1 AA (3:1 minimum).

---

### Input

Specialised tokens scoped to form input components.

**Backgrounds**

| Token | CSS Variable | Hex | Usage |
|---|---|---|---|
| `Input.Background.Default` | `--color-input-bg-default` | `#ffffff` | Default, hover, focus, and error input background |
| `Input.Background.Disabled` | `--color-input-bg-disabled` | `#e1e1e1` | Disabled input background |

**Borders**

| Token | CSS Variable | Hex | Usage |
|---|---|---|---|
| `Input.Border.Default` | `--color-input-border-default` | `#cccccc` | Default (unfocused) input border |
| `Input.Border.Hover` | `--color-input-border-hover` | `#a3a3a3` | Input border on mouse hover |
| `Input.Border.Focus` | `--color-input-border-focus` | `#318272` | Input border when focused |
| `Input.Border.Error` | `--color-input-border-error` | `#bc1700` | Input border in error state |
| `Input.Border.Disabled` | `--color-input-border-disabled` | `#e1e1e1` | Disabled input border |

**Text**

| Token | CSS Variable | Hex | Usage |
|---|---|---|---|
| `Input.Text.Value` | `--color-input-text-value` | `#3b3b3d` | Typed / selected value text |
| `Input.Text.Placeholder` | `--color-input-text-placeholder` | `#8f8f8f` | Placeholder text |
| `Input.Text.Disabled` | `--color-input-text-disabled` | `#8f8f8f` | Text in disabled inputs |

---

## Usage Examples

### CSS Custom Properties

Generate CSS variables from the token file using Style Dictionary. Example output:

```css
:root {
  /* Semantic — Background */
  --color-bg-page:            #ffffff;
  --color-bg-surface:         #ffffff;
  --color-bg-subtle:          #f5f5f5;
  --color-bg-muted:           #e1e1e1;
  --color-bg-inverse:         #3b3b3d;
  --color-bg-brand-primary:   #318272;
  --color-bg-brand-hover:     #226558;
  --color-bg-brand-pressed:   #15483e;
  --color-bg-brand-subtle:    #f3fffc;

  /* Semantic — Text */
  --color-text-primary:       #3b3b3d;
  --color-text-secondary:     #4f5052;
  --color-text-tertiary:      #7b7b7b;
  --color-text-placeholder:   #8f8f8f;
  --color-text-disabled:      #8f8f8f;
  --color-text-inverse:       #ffffff;
  --color-text-brand:         #226558;

  /* Semantic — Border */
  --color-border-default:     #cccccc;
  --color-border-subtle:      #e1e1e1;
  --color-border-strong:      #a3a3a3;
  --color-border-brand:       #318272;
  --color-border-error:       #bc1700;

  /* Semantic — Input */
  --color-input-bg-default:       #ffffff;
  --color-input-bg-disabled:      #e1e1e1;
  --color-input-border-default:   #cccccc;
  --color-input-border-hover:     #a3a3a3;
  --color-input-border-focus:     #318272;
  --color-input-border-error:     #bc1700;
  --color-input-border-disabled:  #e1e1e1;
  --color-input-text-value:       #3b3b3d;
  --color-input-text-placeholder: #8f8f8f;

  /* Focus */
  --color-focus-ring:         #acffef;
  --color-focus-ring-error:   #ffa193;
}
```

### Component Example — Input Field

```css
.input {
  background-color: var(--color-input-bg-default);
  border: 1px solid var(--color-input-border-default);
  color: var(--color-input-text-value);
}

.input::placeholder {
  color: var(--color-input-text-placeholder);
}

.input:hover {
  border-color: var(--color-input-border-hover);
}

.input:focus {
  border-color: var(--color-input-border-focus);
  outline: none;
  box-shadow: 0 0 0 3px var(--color-focus-ring);
}

.input--error {
  border-color: var(--color-input-border-error);
}

.input--error:focus {
  box-shadow: 0 0 0 3px var(--color-focus-ring-error);
}

.input:disabled {
  background-color: var(--color-input-bg-disabled);
  border-color: var(--color-input-border-disabled);
  color: var(--color-input-text-disabled);
  cursor: not-allowed;
}
```

### Component Example — Alert / Notification

```css
.alert--success {
  background-color: var(--color-bg-success-subtle);
  border: 1px solid var(--color-border-success);
  color: var(--color-text-success);
}

.alert--info {
  background-color: var(--color-bg-info-subtle);
  border: 1px solid var(--color-border-info);
  color: var(--color-text-info);
}

.alert--warning {
  background-color: var(--color-bg-warning-subtle);
  border: 1px solid var(--color-border-warning);
  color: var(--color-text-warning);
}

.alert--error {
  background-color: var(--color-bg-error-subtle);
  border: 1px solid var(--color-border-error);
  color: var(--color-text-error);
}
```

### Component Example — Button

```css
.btn--primary {
  background-color: var(--color-bg-brand-primary);
  color: var(--color-text-inverse);
  border: none;
}

.btn--primary:hover {
  background-color: var(--color-bg-brand-hover);
}

.btn--primary:active {
  background-color: var(--color-bg-brand-pressed);
}

.btn--primary:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-focus-ring);
}
```

---

## Dos and Don'ts

### Do
- Use semantic tokens in all component and layout code: `var(--color-text-primary)`
- Map new component states to an existing semantic token before creating a new one
- Always provide a visible focus style using `Focus.Ring` or `Focus.RingError`

### Don't
- Reference primitive tokens directly in components: `var(--color-green-80)` ❌
- Hard-code hex values in component CSS
- Use `Text.Placeholder` for body text (insufficient contrast for WCAG AA)
- Use a `Subtle` background token with `Subtle` text — verify contrast before pairing

---

## Token File

The full token set is at [`../tokens/tokens.updated.json`](../tokens/tokens.updated.json). It is compatible with [Tokens Studio](https://tokens.studio/) and can be imported directly into Figma.
