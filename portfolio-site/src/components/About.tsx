import { ABOUT_CONTENT } from "../data/Content";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="border-b border-neutral-900 pb-4">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="mt-20 mb-16 text-center text-4xl"
      >
        <span className="bg-gradient-to-r from-pink-300 via bg-slate-500 to-purple-500 bg-clip-text text-4xl tracking-tight text-transparent">
          About
        </span>{" "}
        Me
      </motion.h2>
      <div className="flex flex-wrap">
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="mx-auto"
        >
          {ABOUT_CONTENT.map((content, index) => (
            <p
              key={index}
              className="my-2 max-w-xl py-2 text-center tracking-tight"
            >
              {content}
            </p>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;
