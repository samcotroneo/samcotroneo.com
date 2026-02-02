namespace PortfolioSite.Models;

public static class SiteContent
{
    public static List<string> AboutContent { get; } = new()
    {
        "I am a versatile software engineer with over 8 years of experience, predominantly with the .NET ecosystem.",
        "I pride myself on my soft skills, where empathy, collaboration, communication and a strong willingness to learn, are at the forefront of my work ethic.",
        "With experience building a range of applications using the .NET stack, my strength is predominantly on the back end. I enjoy integrating .NET and ASP.NET applications with third party APIs and network protocols, working with databases and leveraging containerisation and cloud technologies.",
        "While I am a back end developer at heart, I have a keen interest in front end development and have been working on improving my skills in this area, using Blazor professionally, and learning React in my spare time."
    };

    public static List<string> Attributes { get; } = new()
    {
        "Software Engineer",
        "Casual Gardener",
        "Wannabe Baker",
        "Level 10 Dwarf Artificer"
    };

    public static List<Experience> Experiences { get; } = new()
    {
        new Experience
        {
            Role = "Senior Software Engineer",
            Company = "Wymac Gaming Solutions",
            Date = "April 2021 - Present",
            Description = "As a Senior Software Engineer I am responsible for developing Wymac's next generation Promotion system while maintaining and updating Wymac's existing promotions product which is running in production in Pubs, Clubs and Casinos all across the country.",
            Skills = new List<string> { "C#", ".NET", "ASP.NET", "Blazor", "SQL Server", "NGINX", "Azure", "Docker" }
        },
        new Experience
        {
            Role = "Software Engineer",
            Company = "Wymac Gaming Solutions",
            Date = "December 2016 - April 2021",
            Description = "As a Software Engineer I worked as part of the 'Platform' team to both maintain a legacy gaming machine platform and see the product through to regulatory approval in the NSW gaming market, as well as play a pivotal role in the development of the next generation Wymac Gaming Platform (WGP) which was approved to run in gaming markets across Australia and the United States.",
            Skills = new List<string> { "C#", ".NET Framework", "WPF", "Winforms" }
        }
    };

    public static List<Project> Projects { get; } = new()
    {
        new Project
        {
            Title = "samcotroneo.com",
            Description = "My personal website where I can show off my experience, provide a professional point of contact, and continue developing my skills. Built as a statically generated site using ASP.NET Core and TailwindCSS.",
            Image = "logo.svg",
            Link = "https://samcotroneo.com",
            Technologies = new List<string> { "ASP.NET Core", "Razor Pages", "TailwindCSS", "AspNetStatic", "GitHub Actions" }
        },
        new Project
        {
            Title = "Honeybee Blitz - In Progress",
            Description = "Honeybee Blitz is a fast-paced, arcade-style game where you play as a honeybee collecting nectar, tuning it into honey and avoiding obstacles. The goal of this project is to further my web development expertise by building a game using PhaserJS.",
            Image = "honeybee.png",
            Link = "https://samcotroneo.com",
            Technologies = new List<string> { "PhaserJS", "Typescript", "Vite", "Aseprite" }
        },
        new Project
        {
            Title = "BreadBuddy - In Progress",
            Description = "BreadBuddy is a baking companion app that helps you accurately time and track your bread baking recipe steps, as well as keep track of your sourdough starter. The goal of this project is to continue learning and building with react, while also getting some exposure to the mobile space.",
            Image = "breadbuddy.png",
            Link = "https://samcotroneo.com",
            Technologies = new List<string> { "React Native", "Typescript", "Expo" }
        }
    };

    public static ContactInfo Contact { get; } = new()
    {
        Description = "Thanks for stopping by! Feel free to reach out to me via the email below, or connect with me on LinkedIn or GitHub.",
        Email = "info@samcotroneo.com",
        LinkedIn = "https://linkedin.com/in/samcotroneo",
        GitHub = "https://github.com/samcotroneo"
    };
}
