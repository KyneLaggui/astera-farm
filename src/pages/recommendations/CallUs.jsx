import backgroundImage from "@src/assets/images/background-image.png";
import CallImg from "@src/assets/images/call-us.png";
import { CircleChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import CallCard from "@src/components/recommendations/CallCard";
import Jupiter from "@src/assets/images/Planets/jupiter.png";

const CallUs = () => {
  return (
    <div
      className="bg-cover bg-center flex justify-center items-start navbar-spacing w-full overflow-hidden relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Container for the planet image */}
      <div className="absolute bottom-[-250px] right-[-100px]">
        <img
          src={Jupiter}
          alt="Jupiter"
          className="object-cover w-full h-full xl:max-w-[800px] md:max-w-[600px]"
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-55"></div>
      <div className="w-[1200px] flex flex-col gap-2 justify-center items-start p-4 z-10 ">
        <Link
          to="/recommendations"
          className="flex gap-2 w-full items-center justify-start text-yellow text-base cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
        >
          <CircleChevronLeft size={20} className="" />
          <h1 className="">Back to Recommendations</h1>
        </Link>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col justify-start items-start">
            <div className="flex justify-start items-center">
              <h1 className="font-gothic text-6xl sm:text-8xl md:text-9xl text-white tracking-wide leading-none">
                BOOK A CALL
              </h1>
              <img
                src={CallImg}
                className="w-full max-w-[45px] sm:max-w-[70px] md:max-w-[95px] object-contain"
              />
            </div>
            <p className="font-spartan font-semibold max-w-[500px] text-sm text-white tracking-widest text-start">
              BOOK A CALL WITH ONE OF OUR EXPERTS NOW!
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl sm:text-4xl font-spartan font-black">
              CHOOSE YOUR PACKAGE
            </h1>
            <div className="flex flex-wrap justify-center gap-6">
              <CallCard minutes={15} amount="149.00" />
              <CallCard minutes={30} amount="249.00" />
              <CallCard minutes={45} amount="349.00" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallUs;
