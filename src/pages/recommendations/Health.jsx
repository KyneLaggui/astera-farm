import backgroundImage from "@src/assets/images/background-image.png";
import HealthImg from "@src/assets/images/health.png";
import { CircleChevronLeft } from "lucide-react";
import Health1 from "@src/assets/images/health-1.png";
import Health2 from "@src/assets/images/health-2.png";
import Health3 from "@src/assets/images/health-3.png";
import EveryHealthCard from "@src/components/recommendations/EveryHealthCard";
import { Link } from "react-router-dom";

const Health = () => {
  return (
    <div
      className="bg-cover bg-center min-h-full flex justify-center items-center navbar-spacing w-full"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-[1200px] flex flex-col gap-2 justify-center items-center p-4">
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
              <h1 className="font-gothic text-6xl sm:text-8xl md:text-9xl text-white text-center tracking-wide leading-none">
                HEALTH
              </h1>
              <img
                src={HealthImg}
                className="w-full max-w-[45px] sm:max-w-[70px] md:max-w-[95px] object-contain"
              />
            </div>
            <p className="font-spartan font-semibold max-w-[500px] text-sm text-white tracking-widest text-start">
              LOOKING FOR WAYS TO IMPROVE YOUR HEALTH? TRY OUR RECIPES AND
              PROGRAMS CATERED TO YOUR HEALTH!
            </p>
          </div>
          <div className="flex flex-col items-center flex-wrap sm:flex-row gap-6 w-full justify-center">
            <EveryHealthCard
              image={Health1}
              title="Bodybuilding & FITNESS"
              description="Furthermore, bodybuilding is associated with improved bone density, joint health, and posture. The discipline required in maintaining a structured workout routine and adhering to a balanced diet can positively impact mental health "
            />
            <EveryHealthCard
              image={Health2}
              title="nutrition"
              description="The body obtains and utilizes nutrients from food through a complex process that involves digestion, absorption, and metabolism. Once ingested, food is broken down in the digestive system into essential nutrients, such as carbohydrates, proteins, fats, vitamins, and minerals"
            />
            <EveryHealthCard
              image={Health3}
              title="detox"
              description="While the body has its natural detoxification mechanisms through the liver and kidneys, some people engage in specific diets, fasting, or other wellness practices with the belief that it helps rid the body of accumulated toxins."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Health;
