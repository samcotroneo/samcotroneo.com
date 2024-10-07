import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { CONTACT } from "../data/Content";
import Logo from "./common/Logo";

const NavBar = () => {
  return (
    <nav className="mb-20 flex items-center justify-between py-6">
      <div className="flex flex-shrink-0 items-center text-4xl">
        <Logo />
      </div>
      <div className="my-8 flex items-center justify-center gap-4 text-2xl">
        <a href={CONTACT.linkedin} target="_blank">
          <FaLinkedin />
        </a>
        <a href={CONTACT.github} target="_blank">
          <FaGithub />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
