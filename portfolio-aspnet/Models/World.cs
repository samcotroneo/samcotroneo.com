namespace PortfolioSite.Models;

public class World
{
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public string AccentClass { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    // Card skin: CSS variant class suffix (.wcard--{CardSkin}) and art at img/ui/cards/{CardImage}.png
    public string CardSkin { get; set; } = string.Empty;
    public string CardImage { get; set; } = string.Empty;
    public List<Project> Projects { get; set; } = new();
}
