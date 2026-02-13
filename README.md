# samcotroneo.com

A personal website and portfolio to showcase my skills, offer contact information and more.

Built with **ASP.NET Core 10.0**, **Razor Pages**, and **Tailwind CSS** as a statically generated site.

## Quick Start

### Development

```bash
cd portfolio-aspnet

# Install npm dependencies for Tailwind
npm install

# Build Tailwind CSS
npm run build:css

# Run the development server
dotnet run
```

Visit http://localhost:5000

### Static Site Generation

This project uses a custom static site generator that leverages the ASP.NET Core test server to render pages.

To generate a static version of the site:

```bash
cd portfolio-aspnet
dotnet run -- ssg
```

Or use the build script from the root:

```bash
./build.sh
```

## Project Structure

- `portfolio-aspnet/` - ASP.NET Core application
  - `Pages/` - Razor Pages
  - `Pages/Shared/Components/` - Reusable partial views
  - `Models/` - Data models and site content
  - `wwwroot/` - Static assets
  - `wwwroot-static/` - Generated static site (not in git)
  - `Styles/` - Tailwind CSS source
  - `StaticSiteGenerator.cs` - Custom SSG implementation

## Technology Stack

- ASP.NET Core 10.0 (Razor Pages)
- Tailwind CSS 3
- Custom Static Site Generator using Microsoft.AspNetCore.Mvc.Testing

## How Static Generation Works

The custom static site generator:
1. Creates an in-memory test web server using ASP.NET Core TestHost
2. Configures the server with the same Razor Pages pipeline as the main app
3. Makes HTTP requests to each configured page
4. Saves the rendered HTML to static files
5. Copies all assets from `wwwroot/` to the output directory

This approach ensures that the static output is identical to what the dynamic server would produce, while keeping the implementation simple and dependency-free.

## Deployment

The generated static files in `wwwroot-static/` can be deployed to any static hosting service like:

- GitHub Pages
- Azure Static Web Apps
- Netlify
- AWS S3

Simply copy the contents of `wwwroot-static/` to your hosting provider.
