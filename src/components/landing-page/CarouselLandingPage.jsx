import { useEffect, useState } from "react";
import { supabase } from "@src/supabase/config";
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
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .storage
        .from('slideshow')
        .list('public/', { limit: 100, offset: 1 });
      
      if (error) {
        console.error("Error fetching images:", error);
      } else {
        const imageUrls = data.map(file => {
          console.log(file.name)
          const { data } = supabase
            .storage
            .from('slideshow')
            .getPublicUrl(`public/${file.name}`);
          
          return data.publicUrl;
        });

        setImages(imageUrls);
      }
    };

    fetchImages();
  }, []);

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
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className="flex justify-center items-center w-full"
          >
            <div className="w-full h-auto">
              <Card className="w-full rounded-lg">
                <CardContent className="relative pb-[56.25%]">
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                  />
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
