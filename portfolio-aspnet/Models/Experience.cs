namespace PortfolioSite.Models;

public class Experience
{
    public string Role { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string Date { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<string> Skills { get; set; } = new();
}
