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
    content: "Great platform, really helped me improve my skills!",
    footer: "Software Engineer",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Michaela Tan",
    content: "Amazing experience, the community is very supportive!",
    footer: "Product Designer",
    rating: 5,
  },
  {
    id: 3,
    name: "Luis R. Martinez",
    content: "The best learning experience I've had in a while.",
    footer: "Frontend Developer",
    rating: 4,
  },
  {
    id: 4,
    name: "Amanda Smith",
    content: "I really enjoyed the resources and guidance provided.",
    footer: "UX Researcher",
    rating: 3.5,
  },
  {
    id: 5,
    name: "Sarah Lee",
    content: "Fantastic platform for growth and networking.",
    footer: "Data Analyst",
    rating: 4.2,
  },
];

export function Testimonial() {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 3000,
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
                footer={testimonial.footer}
                rating={testimonial.rating}
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
