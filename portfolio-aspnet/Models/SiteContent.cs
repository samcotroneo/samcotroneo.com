namespace PortfolioSite.Models;

public static class SiteContent
{
    public static DateTime CareerStartDate = new DateTime(2016, 12, 6);

    public static List<string> AboutContent { get; } = new()
    {
        "I am a versatile software engineer with over {years} years of experience, predominantly with the .NET ecosystem.",
        "I pride myself on my soft skills, where empathy, collaboration, communication and a strong willingness to learn, are at the forefront of my work ethic.",
        "With experience building a range of applications using the .NET stack, my strength is predominantly on the back end. I enjoy integrating .NET and ASP.NET applications with third party APIs and network protocols, working with databases and leveraging containerisation and cloud technologies.",
        "While I am a back end developer at heart, I have a keen interest in front end development and have been working on improving my skills in this area, using Blazor professionally, and learning React in my spare time."
    };

    public static List<string> Attributes { get; } = new()
    {
        "Software Engineer",
        "Gardening Enthusiast",
        "Budding Baker",
        "Level 10 Dwarf Artificer"
    };

    public static List<Experience> Experiences { get; } = new()
    {
        new Experience
        {
            Role = "Senior Software Developer",
            Company = "Eziway Salary Packaging",
            Date = "Feburary 2025 - Present",
            Description = "As a Senior Software Developer at Eziway I am responsible for maintaining and improving Eziway's salary packaging platform which is used by organisations Australia wide to administer salary packaging, particular in the not for profit sector.",
            Skills = new List<string> { "C#", ".NET", "ASP.NET", "SQL Server", "Azure" }
        },
        new Experience
        {
            Role = "Senior Software Engineer",
            Company = "Wymac Gaming Solutions",
            Date = "April 2021 - Feburary 2025",
            Description = "As a Senior Software Engineer I was responsible for developing Wymac's next generation Promotion system while maintaining and updating Wymac's existing promotions product which was running in production in Pubs, Clubs and Casinos all across the country.",
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

    public static List<World> Worlds { get; } = new()
    {
        new World
        {
            Name = "Kitchen",
            Slug = "kitchen",
            Description = "Food & recipe experiments — apps that help in the kitchen.",
            Color = "#f4a261",
            AccentClass = "text-kitchen",
            Icon = "🍳",
            CardSkin = "k1",
            CardImage = "kitchen-1",
            Projects = new List<Project>
            {
                new Project
                {
                    Title = "BreadBuddy",
                    Description = "A baking companion that times recipe steps and tracks your sourdough starter.",
                    Image = "breadbuddy.png",
                    Link = "https://samcotroneo.com",
                    Technologies = new List<string> { "React Native", "Typescript", "Expo" }
                },
                new Project
                {
                    Title = "Dinnerbrain",
                    Description = "Concept: a meal-planning assistant that turns what you have into dinner ideas.",
                    Image = "",
                    Link = "",
                    Technologies = new List<string> { "Concept" }
                },
                new Project
                {
                    Title = "Pizzometry",
                    Description = "Concept: a dough calculator and timer for home pizza makers.",
                    Image = "",
                    Link = "",
                    Technologies = new List<string> { "Concept" }
                }
            }
        },
        new World
        {
            Name = "Arcade",
            Slug = "arcade",
            Description = "Web games and playable experiments built in the browser.",
            Color = "#e9c46a",
            AccentClass = "text-arcade",
            Icon = "🕹️",
            CardSkin = "a2",
            CardImage = "arcade-2",
            Projects = new List<Project>
            {
                new Project
                {
                    Title = "Honeybee Blitz",
                    Description = "A fast-paced arcade game where you play as a honeybee collecting nectar, turning it into honey and avoiding obstacles.",
                    Image = "honeybee.png",
                    Link = "https://samcotroneo.com",
                    Technologies = new List<string> { "PhaserJS", "Typescript", "Vite", "Aseprite" }
                }
            }
        },
        new World
        {
            Name = "Control Room",
            Slug = "control-room",
            Description = "Engineering tools, dashboards, and the site itself.",
            Color = "#2a9d8f",
            AccentClass = "text-control",
            Icon = "🖥️",
            CardSkin = "c4",
            CardImage = "control-4",
            Projects = new List<Project>
            {
                new Project
                {
                    Title = "samcotroneo.com",
                    Description = "My personal site — a statically generated portfolio built as an exercise in craft and a place to show what I'm working on.",
                    Image = "logo.svg",
                    Link = "https://samcotroneo.com",
                    Technologies = new List<string> { "ASP.NET Core", "Razor Pages", "TailwindCSS", "GitHub Actions" }
                }
            }
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
