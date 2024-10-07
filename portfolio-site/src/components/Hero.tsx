import { motion } from "framer-motion";
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
          <motion.div
            variants={heroVariants(0)}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center lg:items-start"
          >
            <h1 className="pb-16 text-5xl font-thin tracking-tight lg:mt-16 lg:text-8xl">
              Sam Cotroneo
            </h1>
            <span className="text-2xl">Hi there! I'm a </span>
            <span className="pb-8 bg-gradient-to-r from-pink-300 via bg-slate-500 to-purple-500 bg-clip-text text-3xl tracking-tight text-transparent">
              Software Engineer
            </span>
          </motion.div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <Profile />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
