import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@src/components/ui/dialog";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Label } from "@src/components/ui/label";
import { Textarea } from "@src/components/ui/textarea";
import { Star } from "lucide-react";

{
  /*TODO: Create a CRUD Function, validations, and also just fetch the name of the Logged In user instead of typing */
}

const StarRatingInput = ({ initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick = (index) => {
    const newRating = index;
    setRating(newRating);
    onRatingChange(newRating);
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          onClick={() => handleClick(index)}
          color={rating >= index ? "#FFEB39" : "#A1A1AA"}
          fill={rating >= index ? "#FFEB39" : "none"}
          className="h-5 cursor-pointer"
        />
      ))}
    </div>
  );
};

const TestimonialDialog = () => {
  const [testimonial, setTestimonial] = useState("");
  const [rating, setRating] = useState(0);

  const handleTextChange = (e) => {
    const words = e.target.value.split(" ");
    if (words.length <= 15) {
      setTestimonial(e.target.value);
    } else {
      setTestimonial(words.slice(0, 15).join(" "));
    }
  };

  const wordCount = testimonial.split(" ").filter(Boolean).length;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit">Add Testimonial</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Your Experience</DialogTitle>
          <DialogDescription>
            We’d love to hear about your journey with us!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Rating</Label>
            <StarRatingInput rating={rating} onRatingChange={setRating} />
          </div>
          <div className="flex flex-col gap-2">
            <Label variant="optional" htmlFor="company">
              Company
            </Label>
            <Input id="company" placeholder="ABC Companies" />
          </div>
          <div className="flex flex-col gap-2">
            <Label variant="optional" htmlFor="role">
              Role
            </Label>
            <Input id="role" placeholder="CEO" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="testimonial">Testimonial</Label>
              <p className="text-sm text-muted-foreground">
                {wordCount}/15 words
              </p>
            </div>
            <Textarea
              id="testimonial"
              placeholder="Share your experience with us..."
              onChange={handleTextChange}
              value={testimonial}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full">
            Submit Testimonial
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialDialog;
