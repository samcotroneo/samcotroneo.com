using AspNetStatic;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

// Configure AspNetStatic with routes to generate
// Define all pages that need to be statically generated
builder.Services.AddSingleton<IStaticResourcesInfoProvider>(
    new StaticResourcesInfoProvider(
        // Page resources - all Razor pages to be generated
        pageResources: new[]
        {
            new PageResource("/"),          // Home page (Index.cshtml)
            new PageResource("/Error")      // Error page
        },
        // CSS files to include
        cssFiles: new[]
        {
            "/css/site.css"
        },
        // Copy these files from wwwroot to output
        binFiles: new[]
        {
            "/favicon.ico",
            "/logo.svg",
            "/honeybee.png",
            "/breadbuddy.png"
        }));

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
var exitWhenDone = args.Contains("--generate-static") || args.Contains("ssg");
if (exitWhenDone)
{
    Console.WriteLine("Starting static site generation...");
    Console.WriteLine("This will start a test web server internally to render pages...");

    if (Directory.Exists("wwwroot-static"))
    {
        Directory.Delete("wwwroot-static", true);
    }

    Directory.CreateDirectory("wwwroot-static");

    var outputPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot-static");
    Console.WriteLine($"Output path: {outputPath}");
    
    // Generate static content using AspNetStatic
    // This internally starts a test server, renders each page, and saves the output
    app.GenerateStaticContent(
        destinationRoot: outputPath,
        exitWhenDone: true,
        alwaysDefaultFile: true,        // Create index.html for each page
        dontUpdateLinks: false);        // Update links to work with static files
    
    Console.WriteLine("Static site generation completed!");
    Console.WriteLine($"Files generated in: {outputPath}");
    return;
}

app.Run();
