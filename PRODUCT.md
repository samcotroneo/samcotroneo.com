# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary visitors are recruiters, hiring managers, peers, and potential collaborators. They typically arrive from a web search for "Sam Cotroneo" or via social links to evaluate prior work and professional identity.

## Product Purpose

A personal portfolio that creatively showcases Sam Cotroneo as a software engineer, his work experience, and the applications he has built. The site itself is also a demonstration of engineering craft: a statically generated site built with ASP.NET Core Razor Pages and a custom SSG pipeline.

## Positioning

Not a generic resume page. The portfolio expresses both technical proficiency and creativity through its structure and presentation. Future work should reinforce the idea that the site is itself an engineered artifact. Project showcases are organized around three thematic worlds that map to Sam's interests and project types:

- **Kitchen** — food-related apps and experiments.
- **Control Room** — engineering projects, tools, and serious work.
- **Arcade** — web-based games and playful interactive experiences.

## Operating Context

- Deployed as a static site to GitHub Pages at `samcotroneo.com`.
- Built with ASP.NET Core 10.0, Razor Pages, Tailwind CSS, and a custom static-site generator that renders pages through the ASP.NET Core TestHost.
- Local development runs via `dotnet run`; CSS is built with Tailwind; static output is generated with `dotnet run -- ssg` or `./build.sh`.
- Visitors arrive with low context and scan quickly for credibility, craft, and evidence of real work.

## Capabilities and Constraints

- Domain must remain `samcotroneo.com`.
- The ASP.NET Core + custom SSG architecture should be preserved where possible.
- The site must remain buildable as a static site and distributable via GitHub Pages.
- Job history, skills, and project content can be preserved in essence but reimagined visually.
- Current project roster includes the portfolio site itself, Honeybee Blitz, and BreadBuddy.

## Brand Commitments

- Name and identity: Sam Cotroneo.
- Voice: technically proficient, creative, approachable, and genuinely enthusiastic about building cool things.
- Creative direction: avoid generic resume templates; favor original structure and visual storytelling.
- The three-world concept (Kitchen, Control Room, Arcade) is a durable content strategy for organizing project showcases.

## Evidence on Hand

- Profile picture: `portfolio-aspnet/wwwroot/assets/ProfilePicture.png`.
- Project images: `portfolio-aspnet/wwwroot/honeybee.png`, `portfolio-aspnet/wwwroot/breadbuddy.png`, `portfolio-aspnet/wwwroot/logo.svg`.
- Work history at Eziway Salary Packaging and Wymac Gaming Solutions.
- Technology SVG assets under `portfolio-aspnet/wwwroot/assets/technologies/`.

## Product Principles

1. **The site is a portfolio piece, not just a container for one.** Every structural and visual decision should demonstrate engineering and design craft.
2. **Show, don't summarize.** Experience and projects are presented through concrete artifacts, not bullet-point claims.
3. **Creative structure is the brand.** The Kitchen / Control Room / Arcade worlds turn a flat project list into a memorable, navigable story.
4. **Preserve the buildable artifact.** The ASP.NET Core SSG stack is part of the proof; future changes must keep the site static-deployable and GitHub Pages-friendly.
5. **Authenticity over polish.** Personality, interests, and real projects outrank generic professional tone.

## Accessibility & Inclusion

No product-specific accessibility standard has been established. Future work should follow baseline web accessibility practices.
