using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Hosting;

namespace PortfolioSite;

/// <summary>
/// Simple static site generator that uses the ASP.NET Core test server
/// to render Razor pages and save them as static HTML files.
/// </summary>
public class StaticSiteGenerator
{
    private readonly string _outputPath;
    private readonly string _wwwrootPath;
    private readonly List<string> _pagesToGenerate;

    public StaticSiteGenerator(string outputPath, string wwwrootPath)
    {
        _outputPath = outputPath;
        _wwwrootPath = wwwrootPath;
        _pagesToGenerate = new List<string>();
    }

    /// <summary>
    /// Add a page to be generated
    /// </summary>
    public void AddPage(string path)
    {
        _pagesToGenerate.Add(path);
    }

    /// <summary>
    /// Generate static files for all configured pages
    /// </summary>
    public async Task GenerateAsync()
    {
        Console.WriteLine("Creating test web server...");
        
        // Create a test server using the same configuration as the main app
        var host = await new HostBuilder()
            .ConfigureWebHost(webBuilder =>
            {
                webBuilder
                    .UseTestServer()
                    .UseContentRoot(Directory.GetCurrentDirectory())
                    .ConfigureServices(services =>
                    {
                        services.AddRazorPages();
                    })
                    .Configure(app =>
                    {
                        app.UseStaticFiles();
                        app.UseRouting();
                        app.UseAuthorization();
                        app.UseEndpoints(endpoints =>
                        {
                            endpoints.MapRazorPages();
                        });
                    });
            })
            .StartAsync();

        var client = host.GetTestClient();
        
        Console.WriteLine($"Generating {_pagesToGenerate.Count} page(s)...");

        // Generate each page
        foreach (var page in _pagesToGenerate)
        {
            await GeneratePageAsync(client, page);
        }

        // Copy static assets from wwwroot
        await CopyStaticAssetsAsync();

        await host.StopAsync();
        
        Console.WriteLine("Generation complete!");
    }

    private async Task GeneratePageAsync(HttpClient client, string pagePath)
    {
        Console.WriteLine($"  Rendering: {pagePath}");
        
        // Request the page from the test server
        var response = await client.GetAsync(pagePath);
        
        if (!response.IsSuccessStatusCode)
        {
            Console.WriteLine($"    ⚠️  Failed: {response.StatusCode}");
            return;
        }

        var html = await response.Content.ReadAsStringAsync();
        
        // Determine output file path
        var outputFilePath = GetOutputFilePath(pagePath);
        var outputDir = Path.GetDirectoryName(outputFilePath);
        
        if (!string.IsNullOrEmpty(outputDir) && !Directory.Exists(outputDir))
        {
            Directory.CreateDirectory(outputDir);
        }

        // Save the HTML
        await File.WriteAllTextAsync(outputFilePath, html);
        Console.WriteLine($"    ✓ Saved: {outputFilePath}");
    }

    private string GetOutputFilePath(string pagePath)
    {
        // Convert path to file path
        // "/" -> "index.html"
        // "/about" -> "about/index.html"
        
        if (pagePath == "/")
        {
            return Path.Combine(_outputPath, "index.html");
        }

        var cleanPath = pagePath.TrimStart('/');
        return Path.Combine(_outputPath, cleanPath, "index.html");
    }

    private async Task CopyStaticAssetsAsync()
    {
        Console.WriteLine("Copying static assets from wwwroot...");
        
        if (!Directory.Exists(_wwwrootPath))
        {
            Console.WriteLine("  ⚠️  wwwroot directory not found");
            return;
        }

        await CopyDirectoryAsync(_wwwrootPath, _outputPath);
        
        Console.WriteLine("  ✓ Static assets copied");
    }

    private async Task CopyDirectoryAsync(string sourceDir, string destDir)
    {
        // Create destination directory
        Directory.CreateDirectory(destDir);

        // Copy all files asynchronously
        foreach (var file in Directory.GetFiles(sourceDir))
        {
            var fileName = Path.GetFileName(file);
            var destFile = Path.Combine(destDir, fileName);
            
            // Don't overwrite index.html files we've generated
            if (fileName.Equals("index.html", StringComparison.OrdinalIgnoreCase) && File.Exists(destFile))
            {
                continue;
            }
            
            // Use async file I/O to avoid blocking the thread pool
            var bytes = await File.ReadAllBytesAsync(file);
            await File.WriteAllBytesAsync(destFile, bytes);
        }

        // Recursively copy subdirectories
        foreach (var directory in Directory.GetDirectories(sourceDir))
        {
            var dirName = Path.GetFileName(directory);
            var destSubDir = Path.Combine(destDir, dirName);
            await CopyDirectoryAsync(directory, destSubDir);
        }
    }
}
