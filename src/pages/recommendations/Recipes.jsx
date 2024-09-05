import backgroundImage from "@src/assets/images/background-image.png";
import RecipesImg from "@src/assets/images/recipes.png";
import { CircleChevronLeft } from "lucide-react";
import Recipes1 from "@src/assets/images/recipes-1.png";
import Recipes2 from "@src/assets/images/recipes-2.png";
import Recipes3 from "@src/assets/images/recipes-3.png";
import EveryRecipesCard from "@src/components/recommendations/EveryRecipesCard";
import { Link } from "react-router-dom";

const Recipes = () => {
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
                RECIPES
              </h1>
              <img
                src={RecipesImg}
                className="w-full max-w-[45px] sm:max-w-[70px] md:max-w-[95px] object-contain"
              />
            </div>
            <p className="font-spartan font-semibold max-w-[500px] text-sm text-white tracking-widest text-start uppercase">
              enjoy our fresh produce with these tasty recipes!
            </p>
          </div>
          <div className="flex flex-col items-center flex-wrap sm:flex-row gap-6 w-full justify-center">
            <EveryRecipesCard
              image={Recipes1}
              title="iconic Samgyeopsal"
              description="No need for Introduction, Samgyeopsal is a popular Korean dish that consists of slices of pork and beef grilled at the table. Best paired with our lettuces"
            />
            <EveryRecipesCard
              image={Recipes2}
              title="GLAZED CHICKEN"
              description="Mild sweet and spicy flavors with this glazed chicken recipe that coats the roasted chicken with habanero glaze with honey and apple cider vinegar."
            />
            <EveryRecipesCard
              image={Recipes3}
              title="CHEESY SALAD"
              description="Features 3 of our best lettuces paired with 3 kinds of cheese and thin slices of fruits"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
