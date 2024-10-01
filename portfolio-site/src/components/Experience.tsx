import { EXPERIENCE } from "../data/Content";

const Experience = () => {
  return (
    <div className="border-b border-neutral-800 pb-24">
      <h2 className="my-20 text-center text-4xl">
        My{" "}
        <span className="bg-gradient-to-r from-pink-300 via bg-slate-500 to-purple-500 bg-clip-text text-4xl tracking-tight text-transparent">
          Experience
        </span>
      </h2>
      <div>
        {EXPERIENCE.map((experience, index) => (
          <div key={index} className="my-4">
            <h3 className="text-2xl font-bold">{experience.title}</h3>
            <p className="text-lg font-light">{experience.date}</p>
            <p className="my-2">{experience.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
