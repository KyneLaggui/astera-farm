import { Mail, MessageCircle, MessageSquare } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import Messenger from "@src/assets/images/messenger.png";

// Utility function to shuffle array (randomize FAQs)
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const ChatWidget = ({ faqs }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatStarted, setChatStarted] = useState(false);
  const [randomFAQs, setRandomFAQs] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef(null);

  // Toggle Chat Box
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Handle FAQ message click with typing delay and auto-scroll down
  const handleFAQClick = (faq) => {
    const userMessage = { type: "user", content: faq.question };
    setMessages((prev) => [...prev, userMessage]);

    setIsTyping(true);
    setTimeout(() => {
      const botMessage = { type: "bot", content: faq.answer };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);

    setRandomFAQs(shuffleArray(faqs));
  };

  // Open Facebook Messenger
  const openFacebookMessenger = () => {
    setChatStarted(true);
    window.open("https://m.me/asterafarmsph", "_blank");
  };

  // Shuffle FAQs whenever the chat is opened
  useEffect(() => {
    if (isChatOpen) {
      setRandomFAQs(shuffleArray(faqs));
    }
  }, [isChatOpen, faqs]);

  // Scroll to the bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Scroll to the bottom of the scroll area, only if ref exists
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="z-50">
      {/* Chat and FAQ Buttons */}
      <div className="fixed bottom-5 right-5 space-y-4">
        {/* Chat Button */}
        <Button
          className="rounded-full flex items-center shadow-lg"
          onClick={toggleChat}
        >
          <MessageSquare className="mr-2" size={18} />
          {chatStarted ? "Open Facebook Messenger" : "Message Us"}
        </Button>
      </div>

      {/* Chatbox */}
      {isChatOpen && (
        <Card className="fixed bottom-20 right-5 w-80 p-4 rounded-lg shadow-xl">
          <CardTitle className="text-spartan text-xl font-semibold mb-4">
            Chat with Astera Farms
          </CardTitle>
          <VisuallyHidden>
            <CardDescription></CardDescription>
          </VisuallyHidden>

          <div className="flex flex-col">
            {/* Conditionally render ScrollArea if there are messages */}
            {messages.length > 0 && (
              <ScrollArea className="h-64 overflow-y-auto">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    ref={scrollAreaRef}
                    className={`flex flex-col justify-end  ${
                      msg.type === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <Button
                      variant={msg.type === "user" ? "secondary" : "default"}
                      className={`my-2 p-2 text-wrap rounded-lg text-left h-fit max-w-[200px]  ${
                        msg.type === "user"
                          ? "rounded-br-none w-auto"
                          : "rounded-bl-none w-auto"
                      }`}
                    >
                      {msg.content}
                    </Button>
                  </div>
                ))}

                {/* Typing Effect */}
                {isTyping && (
                  <div className="text-left bg-muted py-3 mb-2 px-4 w-fit rounded-full rounded-bl-none text-gray-400">
                    <div className="bouncing-loader">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                )}
              </ScrollArea>
            )}

            <div ref={scrollAreaRef}></div>

            <ScrollArea className="border-t-2">
              <div className="flex flex-col gap-1 w-full h-32  pt-2">
                {randomFAQs.map((faq, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full hover:bg-white text-wrap h-fit hover:text-black cursor-pointer"
                    onClick={() => handleFAQClick(faq)}
                  >
                    {faq.question}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          <Button className="w-full flex gap-2" onClick={openFacebookMessenger}>
            <img
              src={Messenger}
              alt="messenger-icon"
              className="max-w-[24px]"
            />
            Continue on Messenger
          </Button>
        </Card>
      )}
    </div>
  );
};

export default ChatWidget;
