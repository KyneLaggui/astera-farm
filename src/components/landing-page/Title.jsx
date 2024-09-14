import { CircleChevronRight } from "lucide-react";
import Background from "@src/assets/images/BG-Title.png";
import Seasonings from "@src/assets/images/Seasonings.png";
import TitleImg from "@src/assets/images/Title.png";
import { useNavigate } from "react-router-dom";

const Title = () => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate("/produce");
  };

  return (
    <div
      className="bg-cover bg-center py-5 px-7 w-full max-w-[1200px] flex flex-col lg:flex-row items-center justify-start relative rounded-[55px]"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* Title and Description */}
      <div className="w-full flex flex-col gap-3 lg:gap-5 max-w-[800px] lg:max-w-[600px] xl:max-w-[700px] items-start">
        <div className="font-galindo text-green text-stroke flex flex-col">
          <img src={TitleImg} className="w-full object-contain" />
        </div>

        <p className="font-galindo text-sm sm:text-lg lg:text-lg xl:text-xl text-black lg:text-green-950">
          Inspired by one of the largest stars in the universe, "Betelgeuse,"
          our fusion blend surely packs big in flavor while maintaining a low
          sodium and MSG-FREE mixture.
        </p>

        <div
          className="flex items-center py-2 sm:py-3 lg:py-3 px-4 sm:px-5 lg:px-5 justify-center text-yellow gap-2 sm:gap-3 lg:gap-3 rounded-full bg-green-800 w-max font-spartan font-bold text-xl md:text-2xl xl:text-3xl hover:text-green hover:bg-yellow cursor-pointer"
          onClick={handleShopNowClick}
        >
          <button className="mt-1">Shop Now</button>
          <CircleChevronRight size={25} className="md:hidden" />
          <CircleChevronRight size={30} className="hidden md:block lg:hidden" />
          <CircleChevronRight size={35} className="hidden lg:block" />
        </div>
      </div>

      {/* Picture of Seasoning */}
      <img
        src={Seasonings}
        alt="Seasoning"
        className="w-[250px] sm:w-[350px] lg:w-[300px] md:w-[400px] xl:w-[500px] mt-5 lg:mt-0 object-contain block"
      />
    </div>
  );
};

export default Title;
