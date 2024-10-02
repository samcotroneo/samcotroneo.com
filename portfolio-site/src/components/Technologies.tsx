import dotnetImage from "../assets/technologies/dotnet-svgrepo-com.svg";
import blazorImage from "../assets/technologies/blazor-svgrepo-com.svg";
import sqlServerImage from "../assets/technologies/microsoft-sql-server-logo-svgrepo-com.svg";
import nginxImage from "../assets/technologies/nginx-logo-svgrepo-com.svg";
import dockerImage from "../assets/technologies/docker-svgrepo-com.svg";
import azureImage from "../assets/technologies/azure-svgrepo-com.svg";
import windowsImage from "../assets/technologies/microsoft-windows-svgrepo-com.svg";
import linuxImage from "../assets/technologies/linux-svgrepo-com.svg";
import { motion } from "framer-motion";

const iconVariants = (duration: number) => ({
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

const Technologies = () => {
  return (
    <div className="border-b border-neutral-800 pb-24">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5 }}
        className="my-20 text-center text-4xl"
      >
        <span className="bg-gradient-to-r from-pink-300 via bg-slate-500 to-purple-500 bg-clip-text text-4xl tracking-tight text-transparent">
          Technologies
        </span>{" "}
        I Use
      </motion.h2>
      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 1.5 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <motion.div
          variants={iconVariants(2.4)}
          initial="initial"
          animate="animate"
          className="rounded-2xl border-4 border-neutral-800 p-4"
        >
          <img src={dotnetImage} alt=".NET Logo" className="w-20 h-20" />
        </motion.div>
        <motion.div
          variants={iconVariants(2.5)}
          initial="initial"
          animate="animate"
          className="rounded-2xl border-4 border-neutral-800 p-4"
        >
          <img src={blazorImage} alt="Blazor Logo" className="w-20 h-20" />
        </motion.div>
        <motion.div
          variants={iconVariants(5)}
          initial="initial"
          animate="animate"
          className="rounded-2xl border-4 border-neutral-800 p-4"
        >
          <img
            src={sqlServerImage}
            alt="MS SQL Server Logo"
            className="w-20 h-20"
          />
        </motion.div>
        <motion.div
          variants={iconVariants(6)}
          initial="initial"
          animate="animate"
          className="rounded-2xl border-4 border-neutral-800 p-4"
        >
          <img src={nginxImage} alt="Nginx Logo" className="w-20 h-20" />
        </motion.div>
        <motion.div
          variants={iconVariants(3.4)}
          initial="initial"
          animate="animate"
          className="rounded-2xl border-4 border-neutral-800 p-4"
        >
          <img src={dockerImage} alt="Docker Logo" className="w-20 h-20" />
        </motion.div>
        <motion.div
          variants={iconVariants(4)}
          initial="initial"
          animate="animate"
          className="rounded-2xl border-4 border-neutral-800 p-4"
        >
          <img src={azureImage} alt="Azure Logo" className="w-20 h-20" />
        </motion.div>
        <motion.div
          variants={iconVariants(4.2)}
          initial="initial"
          animate="animate"
          className="rounded-2xl border-4 border-neutral-800 p-4"
        >
          <img src={windowsImage} alt="Windows Logo" className="w-20 h-20" />
        </motion.div>
        <motion.div
          variants={iconVariants(5)}
          initial="initial"
          animate="animate"
          className="rounded-2xl border-4 border-neutral-800 p-4"
        >
          <img src={linuxImage} alt="Linux Logo" className="w-20 h-20" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Technologies;
