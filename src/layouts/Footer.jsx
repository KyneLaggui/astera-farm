import Logo from "@src/assets/images/main-logo-green.png";
import Facebook from "@src/assets/images/Facebook.png";
import Instagram from "@src/assets/images/Instagram.png";
import { CircleChevronRight } from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full bg-[#ffe500] bottom-0 flex flex-col gap-4 p-7 relative sm:p-5 items-center lg:flex-row lg:justify-around lg:items-stretch rounded-t-3xl z-30">
      {/* Left Side */}
      <div className="flex w-full sm:w-fit lg:justify-between sm:flex-col flex-between items-center lg:items-start justify-start gap-4 ">
        <img
          src={Logo}
          alt="Logo"
          className="w-[160px] sm:w-[200px] object-contain"
        />
        <div className="flex items-center justify-end sm:justify-center lg:justify-start gap-4 w-full">
          <img
            src={Facebook}
            alt="Logo"
            className="sm:w-[35px] w-[30px] object-contain"
          />
          <img
            src={Instagram}
            alt="Logo"
            className="sm:w-[35px] w-[30px] object-contain"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex gap-4 w-full sm:w-fit items-center lg:items-start flex-col ">
        <div className="flex flex-col font-spartan text-green items-center lg:items-start">
          <h1 className="font-extrabold text-2xl sm:text-3xl text-center">
            Subscribe to our news letter!
          </h1>
          <p className="font-semibold text-lg sm:text-xl text-center">
            Stay updated for upcoming discounts, releases and more!
          </p>
        </div>
        <div className="flex w-full max-h-[40px] sm:max-h-full">
          <input
            type="text"
            placeholder="example@email.com"
            className="w-full px-3 rounded-l-full border-none"
            onFocus={(e) => {
              e.target.style.color = "#475900";
              e.target.style.outline = "none";
            }}
          />
          <div className="flex bg-green text-yellow gap-2 py-1 px-2 items-center rounded-r-full">
            <h1 className="sm:text-2xl text-xl font-spartan font-extrabold mt-1">
              Subscribe
            </h1>
            <CircleChevronRight size={30} />
          </div>
        </div>
        <p className="font-spartan text-green leading-none text-center">
          @2023, Astera Farms™. All Rights Reserved Privacy Policy. Supplier
          Code of Conduct.
        </p>
      </div>
    </div>
  );
};

export default Footer;
