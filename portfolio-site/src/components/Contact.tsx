import { FaGithub, FaLinkedin } from "react-icons/fa";
import { CONTACT } from "../data/Content";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="border-b border-neutral-800 pb-24">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="mt-20 mb-10 text-center text-4xl"
      >
        Get{" "}
        <span className="bg-gradient-to-r from-pink-300 via bg-slate-500 to-purple-500 bg-clip-text text-4xl tracking-tight text-transparent">
          In Touch
        </span>
      </motion.h2>
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 1 }}
        className="text-center tracking tighter"
      >
        <p>
          Thanks for stopping by! Feel free to reach out to me via{" "}
          <a href="#" className="my-4 border-b border-neutral-300">
            {CONTACT.email}
          </a>
          , or connect with me on LinkedIn or GitHub.
        </p>
        <div className="m-8 flex items-center justify-center gap-4 text-4xl">
          <a href={CONTACT.linkedin} target="_blank">
            <FaLinkedin />
          </a>
          <a href={CONTACT.github} target="_blank">
            <FaGithub />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
