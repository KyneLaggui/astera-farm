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

{
  /*TODO: Create a CRUD Function, validations, and also just fetch the name of the Logged In user instead of typing */
}
const TestimonialDialog = () => {
  const [testimonial, setTestimonial] = useState("");

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
            <Label htmlFor="company">Company</Label>
            <Input id="company" placeholder="ABC Companies" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="role">Role</Label>
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
