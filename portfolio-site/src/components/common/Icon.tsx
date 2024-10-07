import { motion, Variants } from "framer-motion";

const iconVariants = (duration: number): Variants => ({
  initial: { y: -10 },
  animate: {
    y: [10, -10],
    transition: {
      duration: duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});

export interface IconProps {
  image: string;
  alt: string;
  delay: number;
}

const Icon = ({ image, alt, delay }: IconProps) => {
  return (
    <motion.div
      variants={iconVariants(delay)}
      initial="initial"
      animate="animate"
      className="rounded-2xl border-4 border-neutral-800 p-2 lg:p-4 w-20 h-20 lg:w-[12%] lg:h-auto"
    >
      <img src={image} alt={alt} />
    </motion.div>
  );
};

export default Icon;
