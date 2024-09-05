import PropTypes from "prop-types";
const EveryHealthCard = ({ image, title, description }) => {
  return (
    <div className="cursor-pointer rounded-3xl max-w-[300px] hover:max-w-[500px] h-full min-h-[460px] flex flex-col transition-all duration-300 ease-in-out ">
      <img
        src={image}
        className="h-full max-h-[180px] w-full object-cover rounded-t-3xl"
        alt={title}
      />
      <div className="bg-yellow p-4 flex-grow flex flex-col rounded-b-3xl">
        <h1 className="font-spartan text-4xl font-extrabold text-green uppercase">
          {title}
        </h1>
        <p className="font-spartan font-medium text-green capitalize">
          {description}
        </p>
      </div>
    </div>
  );
};

EveryHealthCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default EveryHealthCard;
