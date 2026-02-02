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
  - `Styles/` - Tailwind CSS source
- `portfolio-site/` - Legacy React application (for reference)

## Technology Stack

- ASP.NET Core 10.0 (Razor Pages)
- Tailwind CSS 3
- AspNetStatic (for static site generation)

## Deployment

The generated static files in `wwwroot-static/` can be deployed to any static hosting service like:

- GitHub Pages
- Azure Static Web Apps
- Netlify
- AWS S3

Simply copy the contents of `wwwroot-static/` and any additional assets from `wwwroot/` to your hosting provider.
