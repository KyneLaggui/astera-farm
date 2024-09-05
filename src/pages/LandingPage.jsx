import backgroundImage from "@src/assets/images/background-image.png";
import Title from "@src/components/landing-page/Title";
import OrderProcess from "@src/components/landing-page/OrderProcess";
import ChatWidget from "@src/components/ChatWidget";

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
    <div
      className="bg-cover bg-center min-h-screen h-full flex flex-col items-center navbar-spacing w-full "
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-[1200px] flex flex-col gap-20">
        <Title />
        <OrderProcess />
        <ChatWidget faqs={faqs} />
      </div>
    </div>
  );
};

export default LandingPage;
