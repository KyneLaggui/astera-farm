import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import { Star } from "lucide-react";

const StarRating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<Star key={i} color="yellow" fill="yellow" />);
    } else if (rating >= i - 0.5) {
      stars.push(<Star key={i} color="yellow" fill="yellow" opacity="0.5" />);
    } else {
      stars.push(<Star key={i} color="gray" />);
    }
  }

  return <div style={{ display: "flex", gap: "4px" }}>{stars}</div>;
};

const TestimonialCard = ({ name, content, footer, rating }) => {
  return (
    <Card className="flex-grow min-h-[300px]">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="flex items-center gap-4">
          <StarRating rating={rating} />
          <p>{rating} stars</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter>
        <p>{footer}</p>
      </CardFooter>
    </Card>
  );
};

export default TestimonialCard;
