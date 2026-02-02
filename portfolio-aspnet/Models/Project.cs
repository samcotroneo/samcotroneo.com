namespace PortfolioSite.Models;

public class Project
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public string Link { get; set; } = string.Empty;
    public List<string> Technologies { get; set; } = new();
}
