import { Experience } from "./Experience";
import { Project } from "./Projects";

export const ABOUT_CONTENT: string[] = [
  "I am a versatile software engineer with over 8 years of experience, predominantly with the .NET ecosystem.",
  "I pride myself on my soft skills, where empathy, collaboration, communication and a strong willingness to learn, are at the forefront of my work ethic.",
  "With experience building a range of applications using the .NET stack, my strength is predominantly on the back end. I enjoy integrating .NET and ASP.NET applications with third party APIs and network protocols, working with databases and leveraging containerisation and cloud technologies.",
  "While I am a back end developer at heart, I have a keen interest in front end development and have been working on improving my skills in this area, using Blazor professionally, and learning React in my spare time.",
];

export const ATTRIBUTES: string[] = [
  "Software Engineer",
  "Casual Gardener",
  "Wannabe Baker",
  "Level 10 Dwarf Artificer",
];

export const EXPERIENCE: Experience[] = [
  {
    role: "Senior Software Engineer",
    company: "Wymac Gaming Solutions",
    date: "April 2021 - Present",
    description:
      "As a Senior Software Engineer I am responsible for developing Wymac's next generation Promotion system while maintaining and updating Wymac's existing promotions product which is running in production in Pubs, Clubs and Casinos all across the country.",
    skills: [
      "C#",
      ".NET",
      "ASP.NET",
      "Blazor",
      "SQL Server",
      "NGINX",
      "Azure",
      "Docker",
    ],
  },
  {
    role: "Software Engineer",
    company: "Wymac Gaming Solutions",
    date: "December 2016 - April 2021",
    description:
      "As a Software Engineer I worked as part of the 'Platform' team to both maintain a legacy gaming machine platform and see the product through to regulatory approval in the NSW gaming market, as well as play a pivotal role in the development of the next generation Wymac Gaming Platform (WGP) which was approved to run in gaming markets across Australia and the United States.",
    skills: ["C#", ".NET Framework", "WPF", "Winforms"],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "samcotroneo.com",
    description:
      "My personal website where I can show off my experience, provide a professional point of contact, and develop my front end skills focusing mainly on the React and TailwindCSS libraries.",
    image: "logo.svg",
    link: "https://samcotroneo.com",
    technologies: [
      "React",
      "Typescript",
      "TailwindCSS",
      "Vite",
      "GitHub Actions",
    ],
  },
  {
    title: "Honeybee Blitz - In Progress",
    description:
      "Honeybee Blitz is a fast-paced, arcade-style game where you play as a honeybee collecting nectar, tuning it into honey and avoiding obstacles. The goal of this project is to further my web development expertise by building a game using PhaserJS.",
    image: "honeybee.png",
    link: "https://samcotroneo.com",
    technologies: ["PhaserJS", "Typescript", "Vite", "Aesprite"],
  },
  {
    title: "BreadBuddy - In Progress",
    description:
      "BreadBuddy is a baking companion app that helps you accurately time and track your bread baking recipe steps, as well as keep track of your sourdough starter. The goal of this project is to continue learning and building with react, while also getting some exposure to the mobile space.",
    image: "breadbuddy.png",
    link: "https://samcotroneo.com",
    technologies: ["React Native", "Typescript", "Expo"],
  },
];

export const CONTACT = {
  description:
    "Thanks for stopping by! Feel free to reach out to me via the email below, or connect with me on LinkedIn or GitHub.",
  email: "info@samcotroneo.com",
  linkedin: "https://linkedin.com/in/samcotroneo",
  github: "https://github.com/samcotroneo",
};
