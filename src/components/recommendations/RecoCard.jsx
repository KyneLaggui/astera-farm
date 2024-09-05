import { Link } from "react-router-dom";

const RecoCard = ({ title, description, image, href }) => {
  return (
    <Link
      to={href}
      className="bg-gradient-to-b from-[#FFE500] to-[#0C0C0C] flex flex-col justify-between gap-4 sm:gap-10 items-center p-4 sm:p-6 max-w-[300px] rounded-t-3xl cursor-pointer transform transition-transform duration-300 hover:scale-105"
    >
      <h1 className="font-gothic text-5xl sm:text-7xl border-b-2 pb-2 border-white w-full text-center">
        {title}
      </h1>
      <p className="font-spartan text-lg sm:text-2xl font-semibold">
        {description}
      </p>
      <img
        src={image}
        alt="Health pic"
        className="max-w-[150px] sm:max-w-[180px]"
      />
    </Link>
  );
};

export default RecoCard;
