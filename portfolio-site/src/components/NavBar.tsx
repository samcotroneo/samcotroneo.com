import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Logo from "./Logo";
import { CONTACT } from "../data/Content";

const NavBar = () => {
  return (
    <nav className="mb-20 flex items-center justify-between py-6">
      <div className="flex flex-shrink-0 items-center text-4xl">
        <Logo />
      </div>
      <div className="m-8 flex items-center justify-center gap-4 text-2xl">
        <a href={CONTACT.linkedin} target="_blank">
          <FaLinkedin />
        </a>
        <FaGithub />
      </div>
    </nav>
  );
};

export default NavBar;
