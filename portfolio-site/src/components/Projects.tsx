import { PROJECTS } from "../data/Content";

const Projects = () => {
  return (
    <div className="border-b border-neutral-800 pb-24">
      <h2 className="my-20 text-center text-4xl">
        <span className="bg-gradient-to-r from-pink-300 via bg-slate-500 to-purple-500 bg-clip-text text-4xl tracking-tight text-transparent">
          Projects
        </span>{" "}
        I've Built
      </h2>
      <div>
        {PROJECTS.map((project, index) => (
          <div key={index} className="my-4">
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <p className="text-lg font-light">{project.description}</p>
            <p className="my-2">{project.technologies}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
