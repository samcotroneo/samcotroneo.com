import { motion } from "framer-motion";
import { ATTRIBUTES, INTRO_CONTENT } from "../data/Content";
import Profile from "./common/Profile";

const heroVariants = (delay: number) => ({
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: delay } },
});

const Hero = () => {
  return (
    <div className="border-b border-neutral-900 pb-4 lgmb-35">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">
            <motion.h1
              variants={heroVariants(0)}
              initial="hidden"
              animate="visible"
              className="pb-16 text-5xl font-thin tracking-tight lg:mt-16 lg:text-8xl"
            >
              Sam Cotroneo
            </motion.h1>
            <span className="text-3xl">Hi there! I'm a </span>
            <motion.span
              variants={heroVariants(0.5)}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-r from-pink-300 via bg-slate-500 to-purple-500 bg-clip-text text-3xl tracking-tight text-transparent"
            >
              Software Engineer
            </motion.span>
            <span className="text-3xl"> but I also fancy myself a</span>
            <motion.span
              variants={heroVariants(1)}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-r from-pink-300 via bg-slate-500 to-purple-500 bg-clip-text text-3xl tracking-tight text-transparent"
            >
              {ATTRIBUTES[(ATTRIBUTES.length * Math.random()) | 0]}
            </motion.span>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-end">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <Profile />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
