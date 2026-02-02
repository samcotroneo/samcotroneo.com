# Portfolio Site - ASP.NET Core

This is a statically generated portfolio site built with ASP.NET Core, Razor Pages, and Tailwind CSS.

## Development

To run the site in development mode:

```bash
cd portfolio-aspnet
dotnet run
```

The site will be available at `http://localhost:5000`.

## Building CSS

Tailwind CSS needs to be built before running the site:

```bash
cd portfolio-aspnet
npm run build:css
```

For development with auto-rebuild:

```bash
npm run watch:css
```

## Static Site Generation

To generate a static version of the site using AspNetStatic:

```bash
cd portfolio-aspnet
dotnet run -- ssg
```

This will generate static HTML files in the `wwwroot-static` directory.

## Project Structure

- `Pages/` - Razor Pages
- `Pages/Shared/Components/` - Reusable partial views for sections
- `Models/` - Data models and content
- `wwwroot/` - Static assets (images, CSS, JavaScript)
- `Styles/` - Tailwind CSS source files

## Technology Stack

- ASP.NET Core 9.0 (Razor Pages)
- Tailwind CSS 3
- AspNetStatic (for static site generation)
