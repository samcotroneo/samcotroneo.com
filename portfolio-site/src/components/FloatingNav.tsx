import { useEffect, useState } from "react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Technologies", href: "#technologies" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed top-20 right-8 lg:right-32 z-50">
      <ul className="flex flex-col gap-2">
        {navItems.map((item) => {
          const sectionId = item.href.substring(1);
          const isActive = activeSection === sectionId;
          
          return (
            <li key={item.name}>
              <a
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 text-neutral-900"
                    : "text-neutral-300 hover:text-white hover:bg-neutral-800"
                }`}
              >
                {item.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default FloatingNav;
