import React from "react";
import PropTypes from "prop-types";
import CallGreenImg from "@src/assets/images/call-us-green.png";
import CallImg from "@src/assets/images/call-us.png";

const CallCard = ({ minutes, amount }) => {
  return (
    <div className="group bg-yellow text-green-950 hover:bg-green hover:text-white sm:w-fit w-full flex flex-col items-center gap-4 px-7 py-3 rounded-3xl cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
      <h1 className="font-spartan text-2xl font-extrabold uppercase ">
        {minutes} Minutes
      </h1>
      <img
        src={CallGreenImg}
        alt="Call image"
        className="max-w-[120px] sm:max-w-[80px] block group-hover:hidden w-full"
      />
      <img
        src={CallImg}
        alt="Call image"
        className="max-w-[120px] sm:max-w-[80px] hidden group-hover:block w-full"
      />
      <h1 className="font-spartan text-4xl font-extrabold uppercase">
        ₱{amount}
      </h1>
    </div>
  );
};

CallCard.propTypes = {
  minutes: PropTypes.number.isRequired,
  amount: PropTypes.string.isRequired,
};

export default CallCard;
