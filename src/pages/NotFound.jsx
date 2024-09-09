import backgroundImage from "@src/assets/images/background-image.png";

const NotFound = () => {
  return (
    <div
      className="bg-cover bg-center flex justify-center items-center navbar-spacing "
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1 className="font-spartan text-7xl sm:text-9xl text-center font-semibold">
        PAGE <span className="text-yellow">NOT FOUND</span>
      </h1>
    </div>
  );
};

export default NotFound;
