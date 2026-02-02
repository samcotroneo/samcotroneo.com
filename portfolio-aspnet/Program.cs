using AspNetStatic;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

// Configure AspNetStatic with routes
builder.Services.AddSingleton<IStaticResourcesInfoProvider>(
    new StaticResourcesInfoProvider(
        new[]
        {
            new PageResource("/")
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
    var outputPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot-static");
    Console.WriteLine($"Output path: {outputPath}");
    
    app.GenerateStaticContent(
        destinationRoot: outputPath,
        exitWhenDone: true,
        alwaysDefaultFile: false,
        dontUpdateLinks: false);
    
    Console.WriteLine("Static site generation completed!");
    return;
}

app.Run();
