import React from "react";
import TestimonialCard from "@src/components/landing-page/TestimonialCard";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@src/components/ui/carousel";

const testimonials = [
  {
    id: 1,
    name: "Joseph Jason S. Buhain",
    content:
      "The platform's interactive courses and projects have been instrumental in my growth as a Software Engineer.",
    role: "Software Engineer",
    company: "Tech Innovations Inc.",
  },
  {
    id: 2,
    name: "Michaela Tan",
    content:
      "An amazing experience! The supportive community has helped me refine my design skills tremendously.",
    role: "Product Designer",
    company: "Creative Solutions Co.",
  },
  {
    id: 3,
    name: "Luis R. Martinez",
    content:
      "This platform provides the perfect balance of theory and practice. Highly recommend it for skill-building.",
    role: "Frontend Developer",
    company: "Web Architects Ltd.",
  },
  {
    id: 4,
    name: "Amanda Smith",
    content:
      "Great resources and mentorship for UX. Helped me gain invaluable insights into design thinking.",
    role: "UX Researcher",
    company: "User Experience Dynamics.",
  },
  {
    id: 5,
    name: "Sarah Lee",
    content:
      "Fantastic for professional growth! The hands-on projects have been especially useful for real-world applications.",
    role: "Data Analyst",
    company: "Insightful Analytics.",
  },
];

export function Testimonial() {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 2000,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent className="">
        {testimonials.map((testimonial) => (
          <CarouselItem
            key={testimonial.id}
            className="md:basis-1/2 lg:basis-1/3"
          >
            <div className="p-1">
              <TestimonialCard
                name={testimonial.name}
                content={testimonial.content}
                role={testimonial.role}
                company={testimonial.company}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}

export default Testimonial;
