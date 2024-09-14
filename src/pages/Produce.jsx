import React from "react";
import backgroundImage from "@src/assets/images/background-image.png";
import Product from "@src/components/produce-page/Product";
import { CircleChevronRight } from "lucide-react";
import Jupiter from "@src/assets/images/Planets/jupiter.png";
import Moon from "@src/assets/images/Planets/moon.png";

const Produce = () => {
  // const handleInstagramRedirect = () => {
  //   window.open("https://www.instagram.com/asterafarmsph/", "_blank");
  // };

  return (
    <div
      className="overflow-hidden relative bg-cover bg-center bg-black h-full flex justify-center navbar-spacing w-full "
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute w-fit lg:top-[100px] lg:right-[10px] top-[100px] right-[-100px] ">
        <img
          src={Jupiter}
          alt="jupiter"
          className="object-contain w-full h-full lg:max-w-[400px] sm:max-w-[300px] max-w-[250px] "
        />
      </div>
      <div className="absolute w-fit lg:bottom-[-100px] lg:left-[-100px] bottom-[-300px] left-[-100px]">
        <img src={Moon} alt="Moon" className="object-contain w-full h-full " />
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-55"></div>

      <div className="z-10 flex flex-col gap-8 md:gap-12 lg:gap-16 xl:gap-20 max-w-[1200px]">
        <div className="flex flex-col justify-center items-center ">
          <h1 className="font-gothic text-7xl sm:text-9xl text-white text-center tracking-wide">
            OUR PRODUCE
          </h1>
          <p className="font-spartan font-semibold text-white tracking-widest text-center">
            PESTICIDE FREE, FUNGICIDE FREE, HYDROPONICALLY GROWN
          </p>
        </div>
        <Product />
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-gothic text-7xl sm:text-9xl text-white text-center tracking-wide">
            ORDERING IN A BULK?
          </h1>
          <p className="font-spartan text-center text-lg sm:text-xl md:text-2xl">
            When you order <span className="text-yellow">30 items or more</span>
            , it’s officially a bulk order, and just like preparing for a space
            mission, it requires a bit more time! Expect{" "}
            <span className="text-yellow">longer processing times </span>
            as we carefully pack and prepare your cosmic haul with the utmost
            care. So whether you're stocking up for your farm or fueling up your
            galactic garden, rest assured, your stellar order is in good hands!
          </p>
          {/* <div
            className="flex items-center py-2 sm:py-3 lg:py-3 px-4 sm:px-5 lg:px-5 justify-center text-green gap-2 sm:gap-3 lg:gap-3 rounded-full bg-yellow w-max font-spartan font-bold text-xl md:text-2xl xl:text-3xl hover:text-yellow hover:bg-green cursor-pointer"
            onClick={handleInstagramRedirect}
          >
            <button className="mt-1">Click Here</button>
            <CircleChevronRight size={25} className="md:hidden" />
            <CircleChevronRight
              size={30}
              className="hidden md:block lg:hidden"
            />
            <CircleChevronRight size={35} className="hidden lg:block" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Produce;
