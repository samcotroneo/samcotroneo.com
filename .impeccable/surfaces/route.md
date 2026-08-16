---
version: 1
slug: "route"
primary_target: "route:/"
related_targets: []
---

---
version: 2
slug: "route"
primary_target: "route:/"
related_targets: []
approved_comp: ".impeccable/sketches/challenger-coder-den.png"
approved_direction: "coder-den"
approved_label: "Cozy Bedroom Coder Den"
---

# samcotroneo.com — Homepage + World System

## Job and audience

Primary visitors are recruiters, hiring managers, peers, and potential collaborators arriving from a web search for Sam Cotroneo or via social links. They arrive with low context and scan quickly for credibility, creativity, and personality.

## Outcome and proof

Within the first few seconds the visitor should feel that Sam is technically proficient, creative, and genuinely down-to-earth. The site itself is a demonstration of craft (ASP.NET Core custom SSG). Proof continues through work history and real projects organized into three thematic worlds.

## Selected direction

**Cozy Bedroom Coder Den.** The homepage is a dim 90s bedroom where a desk and CRT monitor form the hub. Each world appears as a window open on the monitor; hovering a window throws that world's colored light across the room, and selecting it scrolls to the world's project shelf. Personal history and contact are reimagined as items pinned to the wall or left on the desk.

The three worlds are:

- **Kitchen** — food-related apps: Dinnerbrain, Pizzometry, BreadBuddy.
- **Arcade** — web-based games: Honeybuzz, with a harness prepared for future playable Phaser.js embeds.
- **Control Room** — engineering projects and tools: the portfolio site itself at launch, with room for future dashboards and utilities.

## Scope and boundaries

- Fidelity: production-ready hub, world selection, and world detail states.
- Breadth: single-page spatial hub for v1. Each world exposes its projects. Future worlds/pages can be added later.
- What remains untouched: domain `samcotroneo.com`, ASP.NET Core custom SSG architecture, GitHub Pages deployment, job history and skills content in essence.
- Anti-goals: generic resume template, full multi-page app scope for v1, playable Arcade games before Honeybuzz is ready.

## States and ranges

- Default: dim room, all three monitor windows visible.
- Hover: world color washes over the room and a short teaser appears.
- Selected: smooth scroll to the world's project shelf.
- Mobile: same content, simplified transitions, stacked windows.
- Content ranges at launch: Kitchen 3 projects, Arcade 1+ project, Control Room 1+ project.

## Interaction and layout

- Hub layout: full-viewport room scene with name/intro and the CRT world selector.
- World selector: three monitor windows arranged inside the screen bezel.
- Transitions: CSS-driven scroll on selection; reduced-motion fallback.
- Navigation: persistent minimal shelf to return to hub or jump to a world.
- Responsiveness: robust scene on desktop, simplified stacked layout on mobile.
- Accessibility: respect `prefers-reduced-motion`, keyboard navigation between worlds.

## Constraints and unresolved decisions

- Platform: web, ASP.NET Core Razor Pages + Tailwind CSS, custom SSG, static-deployable to GitHub Pages.
- Performance: keep initial bundle reasonable; load Phaser.js only when entering Arcade.
- Rendering technology: CSS/SVG scene built in Razor/Tailwind; no external runtime required.
- Accessibility: baseline WCAG compliance and reduced-motion support.
- Unresolved: exact per-world sub-page routes, whether Arcade embeds load inline or on a dedicated page, and future world additions.
