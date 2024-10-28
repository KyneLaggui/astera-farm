import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Quote } from "lucide-react";
import { Star } from "lucide-react";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <Star key={i} color="#FFEB39" fill="#FFEB39" className="h-5" />
      );
    } else {
      stars.push(<Star key={i} color="#A1A1AA" fill="none" className="h-5" />);
    }
  }
  return <div className="flex">{stars}</div>;
};

const TestimonialCard = ({ name, content, role, company, rating }) => {
  return (
    <Card className="flex-grow ">
      {/* <VisuallyHidden>
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription className=""></CardDescription>
        </CardHeader>
      </VisuallyHidden> */}
      <CardContent className="flex flex-col justify-between p-6 min-h-[300px]">
        <Quote className="text-yellow" />
        <p className="font-semibold text-xl">{content}</p>

        <div className="flex flex-col">
          <p className="text-yellow text-lg font-medium">{name}</p>
          {
            role && company && (
              <p className="text-muted-foreground text-sm">{`${role} at ${company}`}</p>
            )
          }
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={rating} />
            <p className="text-sm">{rating} stars</p>
          </div>
        </div>
      </CardContent>
      {/* <VisuallyHidden>
        <CardFooter className="flex flex-col items-start"></CardFooter>
      </VisuallyHidden> */}
    </Card>
  );
};

export default TestimonialCard;
