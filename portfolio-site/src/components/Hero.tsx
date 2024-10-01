import profilepic from "../assets/profilePicture.png";
import { INTRO_CONTENT } from "../data/Content";

const Hero = () => {
  return (
    <div className="border-b border-neutral-900 pb-4 lgmb-35">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">
            <h1 className="pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl">
              Sam Cotroneo
            </h1>
            <span className="bg-gradient-to-r from-pink-300 via bg-slate-500 to-purple-500 bg-clip-text text-4xl tracking-tight text-transparent">
              Software Engineer
            </span>
            <p className="my-2 max-w-xl py-6 font-light tracking-tighter ">
              {INTRO_CONTENT}
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:p-8">
          <div className="flex justify-center">
            <img src={profilepic} alt="Profile Picture" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
