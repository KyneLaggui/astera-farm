import Logo from "@src/assets/images/main-logo-green.png";
import Facebook from "@src/assets/images/Facebook.png";
import Instagram from "@src/assets/images/Instagram.png";
import { CircleChevronRight } from "lucide-react";
import emailjs from "emailjs-com";
import { useState } from "react";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userID = import.meta.env.VITE_EMAILJS_USER_ID;

    const templateParams = {
      user_email: email,
      image1:
        "https://drive.google.com/uc?id=1jjmrufpNzSg9nKWBD_9sq1tNNFgo223D",
      image2:
        "https://drive.google.com/uc?id=12CujsKYGcp2byUJKuNEQM3gAzEv2XX-z",
      image3:
        "https://drive.google.com/uc?id=1hRN-5hd4qdHvL_e47eqU8Imic_8WlgFj",
      main_logo:
        "https://drive.google.com/uc?id=13Tf4IXSv872fMa7cCYrP_njtyb7R2FKL",
    };

    emailjs
      .send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        toast.success("Subscription successful! Welcome email sent.");
        setEmail(""); // Clear the input value
      })
      .catch((error) => {
        toast.error("Failed to send email, please try again.");
        console.error("Failed to send email:", error);
      });
  };

  return (
    <div className="w-full bg-[#ffe500] flex flex-col gap-4 p-7 relative sm:p-5 items-center lg:flex-row lg:justify-around lg:items-stretch rounded-t-3xl">
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
            alt="Facebook Logo"
            className="sm:w-[35px] w-[30px] object-contain"
          />
          <img
            src={Instagram}
            alt="Instagram Logo"
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
        <form
          onSubmit={sendEmail}
          className="flex w-full max-h-[40px] sm:max-h-full"
        >
          <input
            type="text"
            placeholder="example@email.com"
            value={email} // Controlled input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 rounded-l-full border-none"
            onFocus={(e) => {
              e.target.style.color = "#475900";
              e.target.style.outline = "none";
            }}
          />
          <button
            type="submit"
            className="flex bg-green text-yellow hover:text-yellow hover:bg-black gap-2 py-1 px-2 items-center rounded-r-full"
          >
            <h1 className="sm:text-2xl text-xl font-spartan font-extrabold mt-1">
              Subscribe
            </h1>
            <CircleChevronRight size={30} />
          </button>
        </form>
        <p className="font-spartan text-green leading-none text-center">
          @2023, Astera Farms™. All Rights Reserved Privacy Policy. Supplier
          Code of Conduct.
        </p>
      </div>
    </div>
  );
};

export default Footer;
