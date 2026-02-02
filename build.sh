#!/bin/bash

# Build script for generating static portfolio site

set -e

echo "Building Tailwind CSS..."
cd portfolio-aspnet
npm run build:css

echo "Generating static site..."
dotnet run -- ssg

echo ""
echo "Build complete! Static files should be in portfolio-aspnet/wwwroot-static/"
echo "To deploy, copy the contents of wwwroot-static to your web host."
