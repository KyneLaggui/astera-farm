import backgroundImage from "@src/assets/images/background-image.png";
import CallImg from "@src/assets/images/call-us.png";
import { CircleChevronLeft } from "lucide-react";
import Health1 from "@src/assets/images/health-1.png";
import Health2 from "@src/assets/images/health-2.png";
import Health3 from "@src/assets/images/health-3.png";
import EveryHealthCard from "@src/components/recommendations/EveryHealthCard";
import { Link } from "react-router-dom";
import CallCard from "@src/components/recommendations/CallCard";

const CallUs = () => {
  return (
    <div
      className="bg-cover bg-center flex justify-center items-start navbar-spacing w-full"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-[1200px] flex flex-col gap-2 justify-center items-start p-4">
        <Link
          to="/recommendations"
          className="flex gap-2 w-full items-center justify-start text-yellow text-base cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
        >
          <CircleChevronLeft size={20} className="" />
          <h1 className="">Back to Recommendations</h1>
        </Link>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col justify-start items-start">
            <div className="flex justify-start item-start">
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
