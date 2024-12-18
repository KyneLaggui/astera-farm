import React, { useEffect, useState } from "react";
import TestimonialCard from "@src/components/landing-page/TestimonialCard";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@src/components/ui/carousel";
import TestimonialDialog from "@src/components/landing-page/TestimonialDialog";
import LoggedInOnlyComponent from "@src/layouts/component-restriction/LoggedInOnlyComponent";
import useFetchAllTestimonies from "@src/custom-hooks/fetchAllTestimonial";

export function Testimonial() {
  const [testimoniesState, setTestimoniesState] = useState([])
  const { testimonies, setTestimonies, loading, error } = useFetchAllTestimonies();

  const updateTestimonies = (updatedTestimony) => {
    setTestimoniesState((prevTestimonies) => {
      const existingTestimonyIndex = prevTestimonies.findIndex(
        (t) => t.email === updatedTestimony.email
      );
      if (existingTestimonyIndex !== -1) {
        return prevTestimonies.map((t, index) =>
          index === existingTestimonyIndex ? updatedTestimony : t
        );
      } else {
        return [...prevTestimonies, updatedTestimony];
      }
    });
  };

  useEffect(() => {
    if (testimonies) {
      let filteredTestimonies = testimonies.filter((t) => t.status === 'Accepted');
      setTestimoniesState(filteredTestimonies)
    }
  }, [testimonies])

  return (
    <div className="flex flex-col gap-2">
      <LoggedInOnlyComponent forUser={true} forAdmin={false}>        
        <TestimonialDialog updateTestimonies={updateTestimonies} />        
      </LoggedInOnlyComponent>

      {loading && <p>Loading testimonials...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && !error && testimonies.length > 0 && (
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
          <CarouselContent>
            {testimoniesState.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <TestimonialCard
                    name={testimonial.name}
                    content={testimonial.description}
                    role={testimonial.role}
                    company={testimonial.company}
                    rating={testimonial.rating}
                />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Uncomment if navigation arrows are needed */}
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
      )}
    </div>
  );
}

export default Testimonial;
