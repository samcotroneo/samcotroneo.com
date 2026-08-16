---
name: "Sam Cotroneo"
description: "A cozy bedroom coder den portfolio hub."
colors:
  den-wall: "#1f1c2c"
  den-dark: "#15131f"
  den-light: "#2d2844"
  lamp: "#f4a261"
  lamp-deep: "#e76f51"
  copper: "#c87a3a"
  crt: "#2a9d8f"
  amber: "#e9c46a"
  kitchen: "#f4a261"
  arcade: "#e9c46a"
  control: "#2a9d8f"
  text: "#e5e5e5"
  text-muted: "#d4d4d4"
typography:
  display:
    fontFamily: '"Chakra Petch", sans-serif'
    fontSize: "clamp(1.5rem, 5vw, 3rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.04em"
    textTransform: "uppercase"
  display-label:
    fontFamily: '"Chakra Petch", sans-serif'
    fontSize: "clamp(0.75rem, 1.5vw, 0.875rem)"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "0.16em"
    textTransform: "uppercase"
  body:
    fontFamily: '"DM Sans", sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: '"JetBrains Mono", monospace'
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.1em"
    textTransform: "uppercase"
rounded:
  full: "9999px"
  "2xl": "1rem"
  xl: "0.75rem"
  lg: "0.5rem"
  md: "0.375rem"
  sm: "0.25rem"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "0.75rem"
  base: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  "2xl": "3rem"
  "3xl": "4rem"
components:
  nav-shelf:
    backgroundColor: "{colors.den-light}"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.full}"
    padding: "0.5rem 0.75rem"
  world-window:
    backgroundColor: "transparent"
    textColor: "currentColor"
    rounded: "{rounded.sm}"
    size: "3rem"
---

# Design System: Sam Cotroneo

## Overview

**Creative North Star: "Cozy Bedroom Coder Den"**

The site replaces the generic portfolio scroll with a single spatial scene: the visitor is inside a dim 90s bedroom, and a desk with a CRT monitor is the hub. The interface recedes so the artifact can lead; projects appear as colored windows open on the monitor, and navigation feels like a floating shelf above the desk. The mood is nostalgic, intimate, and quietly technical — a room built by someone who enjoys both craft and play.

The build commits to that scene literally: the hero is a full-viewport SVG room with an embedded HTML foreignObject for the interactive CRT windows. Light, texture, and material come from the room itself, not from abstract UI decorations.

**Key Characteristics:**
- Full-viewport SVG scene as the homepage stage.
- Warm desk-lamp light from the left and a cooler CRT phosphor glow from the monitor.
- World colors are drawn from the room's existing light sources.
- Uppercase display type with wide tracking for labels and the hero name.
- Subtle scanlines, vignettes, and noise textures on the CRT and walls.
- Reduced-motion fallbacks for all animated room effects.

## Colors

The palette is built around a dark violet room lit by a warm tungsten lamp and a cool CRT screen, with accents pulled directly from those two light sources.

### Primary
- **Warm Desk Lamp** (`#f4a261`): the lamp shade and beam, hover emphasis, and the Kitchen world's accent.

### Secondary
- **CRT Phosphor** (`#2a9d8f`): the Control Room world's accent, the "Projects" label, and the monitor's cool glow.
- **Amber Glow** (`#e9c46a`): the Arcade world's accent and the text-selection background.

### Tertiary
- **Copper** (`#c87a3a`): the hero name "Sam Cotroneo" and other identity moments that need a slightly deeper, warmer accent than the lamp.

### Neutral
- **Den Wall** (`#1f1c2c`): the page background and base wall color.
- **Den Dark** (`#15131f`): the room gradient floor, deepest shadows, and the bottom of the page wash.
- **Den Light** (`#2d2844`): the floating nav shelf and any raised surface that must still feel like it belongs to the wall.
- **Room Text** (`#e5e5e5`): primary body text.
- **Muted Text** (`#d4d4d4`): nav shelf labels and icons at rest.

### Named Rules
- **The One Lamp Rule.** Warm light always enters from the left; a hover-driven world tint is a brief color wash, not a second light source.
- **The World-Color Rule.** Each world owns one accent already present in the room (Kitchen = lamp, Arcade = amber, Control = CRT). New worlds must derive their color from the existing palette.

## Typography

**Display Font:** Chakra Petch (sans-serif)  
**Body Font:** DM Sans (sans-serif)  
**Label / Mono Font:** JetBrains Mono (monospace)

**Character:** A techy, slightly squared display face carries the UI and identity, while a humanist sans keeps longer reading calm. Monospace is reserved for code labels and CRT-style UI text.

### Hierarchy
- **Display** (500, `clamp(1.5rem, 5vw, 3rem)`, line-height 1, letter-spacing `0.04em`, uppercase): the hero name "Sam Cotroneo".
- **Display Label** (500, `clamp(0.75rem, 1.5vw, 0.875rem)`, line-height 1.25, letter-spacing `0.16em`, uppercase): taglines, scroll hints, and nav-shelf initials.
- **Mono Label** (400, 11–12px, line-height 1, letter-spacing `0.1em`, uppercase): the "Projects" header above the CRT windows and world names under the window icons.
- **Body** (400, 1rem, line-height 1.5): supporting paragraphs and prose sections outside the hero.

### Named Rules
- **The Wide Tracking Rule.** Display text and labels stay uppercase with tracking no tighter than `0.04em`; labels and mono UI text use `0.1em` or wider. Tight tracking is out of character for this room.

## Layout

The homepage is a single full-viewport stage. The hero section uses `min-h-svh`, centers its content, and wraps the SVG scene in a container with `max-width: 72rem` (`max-w-6xl`) and an aspect ratio of `3/4` on mobile and `4/3` on desktop. The nameplate and scroll hint are absolutely positioned at the bottom of the scene, while the interactive CRT windows live inside an SVG `foreignObject` so they remain keyboard-accessible without breaking the illustration.

Globally, the page wrapper uses a centered container with `px-6` horizontal padding (`px-12` at `lg`). The nav shelf is fixed to the bottom center, translated down out of view while the hero is visible and sliding up once the visitor scrolls past.

Spacing follows the Tailwind scale observed in the build: tight internal gaps (`0.25rem`–`0.75rem`) inside clusters, generous viewport padding (`1.5rem` sides, `7rem` bottom on the hero). The hero itself creates the rhythm; supporting components nest tightly inside it.

### Named Rules
- **The Single Stage Rule.** The first viewport is one continuous room scene; do not break it into separate horizontal bands or card rows.

## Elevation & Depth

Depth is conveyed first through gradients, directed light, and SVG shadows, not through generic UI shadows. The room background stacks a vertical wall gradient, a noise texture, and a corner vignette. The desk casts its own angular polygon shadow. Interactive elements get a small positional lift on hover (`translateY(-4px) scale(1.02)`). Only the floating nav shelf carries a standard drop shadow.

### Shadow Vocabulary
- **Nav Shelf** (`box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)`): the floating jump-bar at the bottom of the viewport.
- **CRT Bezel** (`box-shadow: 0 0 0 1px hsla(0,0%,100%,0.08), 0 24px 60px rgba(0,0,0,0.6), inset 0 0 40px rgba(0,0,0,0.6)`): the monitor's physical mass.
- **World Window Tile** (`box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05)` plus hover lift): the small colored squares on the CRT screen.

### Named Rules
- **The Light-First Depth Rule.** Shadows and lifts are secondary; the room's lamp and CRT glows do the real work of establishing depth.

## Shapes

Corners are soft and rounded for UI, but the scene itself keeps some blocky 90s geometry. The nav shelf and CRT monitor use large radii (`9999px` and `22px`/`28px` respectively); the CRT screen is slightly rounded (`6px`/`8px`). World window tiles are square with a thin `1px` white/25 border and a tiny shadow. The desk, lamp, and corkboard use straight lines and angular polygons so the room does not feel overly bubbly.

### Named Rules
- **The Room Geometry Rule.** UI elements inside the scene are rounded; structural room elements (desk, walls, corkboard) are straight-edged.

## Components

### World Window Button
- **Shape:** a square colored tile (`3rem`–`3.5rem`) with a `1px` `white/25` border and `shadow-sm`, paired with a mono uppercase label beneath or beside it.
- **Color assignment:** the tile fill and label color come from the world's accent color.
- **States:** hover and focus-visible lift the tile (`-translate-y-1` on the group, `-4px` on the custom class) and throw a colored wash across the room via JavaScript; focus shows a `2px` white ring.
- **Mobile:** becomes a full-width rounded row with the colored tile on the left and the world name on the right.

### Nav Shelf
- **Style:** a fixed, centered pill bar with `bg-den-light`, a `1px` `white/10` border, and `shadow-lg`.
- **Typography:** display font, uppercase initial badges (`K`, `A`, `C`) at `xs`–`sm` sizes, plus icon links for top and contact.
- **Default / hover / active:** default text is `text-muted`; hover adds `bg-white/10` and shifts the text to the relevant world color or `lamp`.
- **Mobile:** same structure, slightly smaller touch targets (`2rem` vs. `2.25rem` badges).

### CRT Monitor Hub
- **Signature component:** an SVG-drawn CRT body with scanlines, screen vignette, and a `foreignObject` that hosts the interactive world windows. It is the literal stage of the hero, not a reusable panel.

### Nameplate
- **Shape:** centered, absolutely positioned below the desk.
- **Typography:** `display` copper uppercase for the name; `display-label` in `crt/70` for the tagline.

## Do's and Don'ts

### Do:
- **Do** keep the first viewport as one continuous room scene with the CRT monitor as the hub.
- **Do** derive every world accent from the existing palette (lamp, amber, CRT).
- **Do** use uppercase labels with tracking of at least `0.1em` for UI labels and at least `0.04em` for display text.
- **Do** respect `prefers-reduced-motion`: disable `room-glow` transitions and world-window hover lifts when reduced motion is requested.
- **Do** hide the nav shelf while the hero is in view and slide it up only after scrolling.

### Don't:
- **Don't** add a kicker or eyebrow above the hero name; the heading carries its own weight.
- **Don't** use gradient text for emphasis.
- **Don't** drop a generic card grid into the first viewport.
- **Don't** use blur or glass as a decorative surface treatment; the scene already has light, texture, and material.
- **Don't** introduce a new accent color for a future world; map it to an existing light source in the room.
