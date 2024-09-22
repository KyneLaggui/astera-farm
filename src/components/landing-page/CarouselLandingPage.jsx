import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@src/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@src/components/ui/carousel";

export function CarouselLandingPage() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent className="w-full h-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="flex justify-center items-center w-full"
          >
            <div className="w-full h-auto">
              <Card className="w-full">
                <CardContent className="relative pb-[56.25%]">
                  {" "}
                  {/* This maintains the 16:9 ratio */}
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots className="mt-4" />
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
