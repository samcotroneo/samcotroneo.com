using PortfolioSite;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();
app.MapRazorPages()
   .WithStaticAssets();

// Generate static files if requested
var generateStatic = args.Contains("--generate-static") || args.Contains("ssg");
if (generateStatic)
{
    Console.WriteLine("=== Static Site Generation ===");
    Console.WriteLine("Starting custom SSG using test web server to render Razor pages...");
    Console.WriteLine();

    var outputPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot-static");
    var wwwrootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");

    // Clean output directory
    if (Directory.Exists(outputPath))
    {
        Directory.Delete(outputPath, recursive: true);
    }
    Directory.CreateDirectory(outputPath);

    // Create and configure the static site generator
    var generator = new StaticSiteGenerator(outputPath, wwwrootPath);
    
    // Define all pages to generate (in C# code as requested)
    generator.AddPage("/");          // Home page (Index.cshtml)
    generator.AddPage("/Error");     // Error page
    
    // Generate the static site
    await generator.GenerateAsync();
    
    Console.WriteLine();
    Console.WriteLine($"✓ Static site generated successfully!");
    Console.WriteLine($"  Output directory: {outputPath}");
    Console.WriteLine();
    
    return;
}

app.Run();
