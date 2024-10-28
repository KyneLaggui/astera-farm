import React, { useEffect, useState } from "react";
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
import { selectEmail } from "@src/redux/slice/authSlice";
import { useSelector } from "react-redux";
import { supabase } from "@src/supabase/config";
import { toast } from "react-toastify";
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

const TestimonialDialog = ({ updateTestimonies }) => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    role: "",
    description: "",
    email: "",
    rating: 0, // Include rating here
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAnyFieldFilled, setIsAnyFieldFilled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const email = useSelector(selectEmail);  

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRatingChange = (newRating) => {
    setFormData((prevData) => ({
      ...prevData,
      rating: newRating,
    }));
  };

  const handleTestimonialChange = (e) => {
    const words = e.target.value.split(" ");
    const testimonialText = words.length <= 15 ? e.target.value : words.slice(0, 15).join(" ");
    setFormData((prevData) => ({
      ...prevData,
      description: testimonialText,
    }));
  };

  useEffect(() => {
    const fetchTestimonial = async () => {
      if (email) {
        setFormData((prevData) => ({
          ...prevData,
          email: email
        }));

        const { data, error } = await supabase
          .from("testimonial")
          .select("*")
          .eq("email", email)
          .single();

        if (data) {
          setFormData(data);
          setIsUpdating(true);
        }
      }
    };

    fetchTestimonial();
  }, [email]);

  const handleSubmit = async () => {
     // Check if either company or role has input and enforce both fields to be required
    if ((formData.company && !formData.role) || (!formData.company && formData.role)) {
      toast.error("Please provide both Company and Role.");
      return;
    }

    const { data, error } = isUpdating
      ? await supabase.from("testimonial").update(formData).eq("email", email).select()
      : await supabase.from("testimonial").insert([formData]).select();

    if (!error) {
      toast.success(isUpdating ? "Testimony updated successfully!" : "Testimony submitted successfully!");
      updateTestimonies(formData);
      setIsOpen(false);
      setIsUpdating(true);
    } else {
      toast.error(isUpdating ? "Testimony update failed!" : "Testimony submission failed!");
    }
  };

  useEffect(() => {
    setIsAnyFieldFilled(formData.company !== "" || formData.role !== "");
  }, [formData]);

  return (      
    <Dialog open={isOpen} onOpenChange={setIsOpen}>      
      <DialogTrigger asChild>
        <Button className="w-fit" onClick={() => setIsOpen(true)}>
          Add Testimonial
        </Button>
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
            <Label htmlFor="name" variant="required">Name</Label>
            <Input id="name" placeholder="John Doe" value={formData.name} onChange={handleInputChange} />
          </div>
          <div className="flex flex-col gap-2">
            <Label variant="required">Rating</Label>
            {formData.rating}
            <StarRatingInput initialRating={formData.rating} onRatingChange={handleRatingChange} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="company" variant={!isAnyFieldFilled ? "optional" : "required"} >Company</Label>
            <Input id="company" placeholder="ABC Companies" value={formData.company} onChange={handleInputChange} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="role" variant={!isAnyFieldFilled ? "optional" : "required"} >Role</Label>
            <Input id="role" placeholder="CEO" value={formData.role} onChange={handleInputChange} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description" variant="required">Testimonial</Label>
            <Textarea
              id="description"
              placeholder="Share your experience with us..."
              value={formData.description}
              onChange={handleTestimonialChange}
            />
            <p className="text-sm text-muted-foreground">
              {formData.description.split(" ").filter(Boolean).length}/15 words
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            {isUpdating ? "Update Testimonial" : "Submit Testimonial"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TestimonialDialog;
