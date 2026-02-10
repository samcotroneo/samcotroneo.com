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

This project includes a custom static site generator that uses the ASP.NET Core test server to render Razor pages and save them as static HTML files.

To generate a static version of the site:

```bash
cd portfolio-aspnet
dotnet run -- ssg
```

This will:
1. Start an in-memory test web server
2. Render each configured page using the standard Razor Pages pipeline
3. Save the rendered HTML to `wwwroot-static/`
4. Copy all static assets from `wwwroot/` to the output directory

The static site will be generated in the `wwwroot-static` directory and is ready to deploy to any static hosting service.

### Adding New Pages

To add new pages to the static generation, edit `Program.cs` and add the page path to the generator:

```csharp
generator.AddPage("/");          // Home page
generator.AddPage("/Error");     // Error page
generator.AddPage("/about");     // Add your new page here
```

## Project Structure

- `Pages/` - Razor Pages
- `Pages/Shared/Components/` - Reusable partial views for sections
- `Models/` - Data models and content
- `wwwroot/` - Static assets (images, CSS, JavaScript)
- `wwwroot-static/` - Generated static site output (not committed to git)
- `Styles/` - Tailwind CSS source files
- `StaticSiteGenerator.cs` - Custom SSG implementation using test server

## Technology Stack

- ASP.NET Core 9.0 (Razor Pages)
- Tailwind CSS 3
- Microsoft.AspNetCore.Mvc.Testing (for test server-based static generation)
