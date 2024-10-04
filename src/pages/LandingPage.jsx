import backgroundImage from "@src/assets/images/background-image.png";
import Title from "@src/components/landing-page/Title";
import OrderProcess from "@src/components/landing-page/OrderProcess";
import ChatWidget from "@src/components/ChatWidget";
import Mars from "@src/assets/images/Planets/mars.png";
import Moon from "@src/assets/images/Planets/moon.png";
import LoggedInOnly from "@src/layouts/LoggedInOnly";
import { CarouselLandingPage } from "@src/components/landing-page/CarouselLandingPage";

const LandingPage = () => {
  const faqs = [
    {
      question: "Are you a hydroponic company?",
      answer:
        "Yes and more, because our farm features both a hydroponic system and a automated raised bed system",
    },
    {
      question: "Are your products organic?",
      answer:
        'Not quite, but the right term we use is "Regenerative Farming" as we developed a system which makes us sustainable while also giving back to the Earth!',
    },
    {
      question: "Where do you deliver?",
      answer:
        "We currently serve customers on these locations: Malolos, Guiguinto, Balagtas, Bulakan, Pandi, Sta Maria, Bocaue, Marilao, Meycauayan & Valenzuela.",
    },
    // {
    //   question: "What payment methods do you accept?",
    //   answer: "We accept credit cards, debit cards, and PayPal.",
    // },
    // {
    //   question: "Do you offer international shipping?",
    //   answer:
    //     "Yes, we offer worldwide shipping with additional fees based on location.",
    // },
    // {
    //   question: "Can I return or exchange an item?",
    //   answer:
    //     "Yes, you can return or exchange items within 30 days of purchase.",
    // },
    // {
    //   question: "How long does delivery take?",
    //   answer:
    //     "Delivery usually takes 3-5 business days for local orders and 7-14 business days for international orders.",
    // },
    // {
    //   question: "Do you provide discounts for bulk orders?",
    //   answer:
    //     "Yes, we offer discounts for bulk purchases. Please contact sales@company.com for details.",
    // },
    // {
    //   question: "Is there a warranty on your products?",
    //   answer: "Yes, all of our products come with a 1-year warranty.",
    // },
    // {
    //   question: "How do I track my order?",
    //   answer:
    //     "You will receive an email with a tracking number once your order has shipped.",
    // },
  ];

  return (
    <LoggedInOnly forUser={true} forAdmin={false}>
      <div
        className="relative bg-cover bg-center h-full flex flex-col items-center navbar-spacing overflow-hidden "
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute lg:top-[500px] lg:left-[-100px] md:top-[700px] md:left-[-100px] top-[600px] left-[-100px] ">
          <img
            src={Mars}
            alt="Mars"
            className="object-contain w-full h-full lg:max-w-[600px] sm:max-w-[500px] max-w-[300px] "
          />
        </div>
        <div className="absolute lg:bottom-[-300px] lg:right-[-100px] bottom-[-300px] right-[-100px] ">
          <img
            src={Moon}
            alt="Moon"
            className="object-contain w-full h-full "
          />
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-55"></div>
        <div className="max-w-[1200px] w-full flex flex-col gap-20 z-10">
          {/* <Title /> */}
          <CarouselLandingPage />
          <OrderProcess />
          <ChatWidget faqs={faqs} />
        </div>
      </div>
    </LoggedInOnly>
  );
};

export default LandingPage;
