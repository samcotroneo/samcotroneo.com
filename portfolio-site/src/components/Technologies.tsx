import dotnetImage from "../assets/technologies/dotnet-svgrepo-com.svg";
import blazorImage from "../assets/technologies/blazor-svgrepo-com.svg";
import htmlImage from "../assets/technologies/html-5-svgrepo-com.svg";
import cssImage from "../assets/technologies/css-3-svgrepo-com.svg";
import jsImage from "../assets/technologies/javascript-svgrepo-com.svg";
import nodeJsImage from "../assets/technologies/node-js-svgrepo-com.svg";
import sqlServerImage from "../assets/technologies/microsoft-sql-server-logo-svgrepo-com.svg";
import nginxImage from "../assets/technologies/nginx-logo-svgrepo-com.svg";
import dockerImage from "../assets/technologies/docker-svgrepo-com.svg";
import azureImage from "../assets/technologies/azure-svgrepo-com.svg";
import windowsImage from "../assets/technologies/microsoft-windows-svgrepo-com.svg";
import linuxImage from "../assets/technologies/linux-svgrepo-com.svg";
import { motion } from "framer-motion";
import Icon from "./common/Icon";

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
        <Icon image={dotnetImage} alt=".NET Logo" delay={2} />
        <Icon image={blazorImage} alt="Blazor Logo" delay={3} />
        <Icon image={htmlImage} alt="HTML 5 Logo" delay={4} />
        <Icon image={cssImage} alt="CSS 3 Logo" delay={5} />
        <Icon image={jsImage} alt="Javascript Logo" delay={6} />
        <Icon image={nodeJsImage} alt="Node JS Logo" delay={2} />
        <Icon image={sqlServerImage} alt="MS SQL Server Logo" delay={3} />
        <Icon image={nginxImage} alt="Nginx Logo" delay={4} />
        <Icon image={dockerImage} alt="Docker Logo" delay={5} />
        <Icon image={azureImage} alt="Azure Logo" delay={6} />
        <Icon image={windowsImage} alt="Windows Logo" delay={2} />
        <Icon image={linuxImage} alt="Linux Logo" delay={3} />
      </motion.div>
    </div>
  );
};

export default Technologies;
