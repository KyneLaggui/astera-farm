import { useState } from "react";
import PropTypes from "prop-types";
import { Card } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@src/components/ui/dialog";
import { ScrollArea } from "@src/components/ui/scroll-area";
import { toast } from "react-toastify";
import { supabase } from "@src/supabase/config";

const statusLabels = {
  Pending: "Pending",
  Accepted: "Accepted",
  Declined: "Declined",
};

const TestimonialModal = ({ isOpen, setIsOpen, testimonial }) => {
  const [status, setStatus] = useState(testimonial.status);

  const updateStatus = async (newStatus) => {
    const { data, error } = await supabase
      .from("testimonial")
      .update({ status: newStatus })
      .eq("id", testimonial.id);
    if (error) {
      toast.error("Error updating status");
    } else {
      toast.success(`Testimonial ${newStatus.toLowerCase()} successfully`);
      setStatus(newStatus);
    }
  };

  const handleAccept = async () => {
    await updateStatus("Accepted");
  };

  const handleDecline = async () => {
    await updateStatus("Declined");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-4 pt-10">
        <DialogHeader className="flex flex-col items-start">
          <div className="flex justify-between w-full">
            <DialogTitle className="text-xl">{testimonial.name}</DialogTitle>
            <Badge
              className={`max-h-[20px] text-nowrap ${
                status === "Accepted"
                  ? "bg-green"
                  : status === "Declined"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }`}
            >
              {statusLabels[status]}
            </Badge>
          </div>
          <p className="font-md text-sm text-yellow-500">
            Role: {testimonial.role}
          </p>
          <p className="text-sm font-light text-muted-foreground">
            Company: {testimonial.company}
          </p>
        </DialogHeader>

        <DialogDescription className="flex flex-col gap-4">
          <ScrollArea>
            <Card className="p-4">
              <h1 className="font-semibold text-lg">Rating: {testimonial.rating} / 5</h1>
              <p className="font-light text-sm text-muted-foreground">
                {testimonial.description}
              </p>
            </Card>
          </ScrollArea>

          <div className="flex justify-between items-center mt-4">
            <h1 className="text-sm font-light text-muted-foreground">
              Email: {testimonial.email}
            </h1>
            <div className="flex gap-2">
              <Button
                onClick={handleAccept}
                disabled={status === "Accepted"}
                variant="default"
                className="ml-2 bg-green hover:bg-green-950 disabled:opacity-50"
              >
                Accept
              </Button>
              <Button
                onClick={handleDecline}
                disabled={status === "Declined"}
                variant="default"
                className="ml-2 bg-red hover:bg-red-950 disabled:opacity-50"
              >
                Decline
              </Button>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

TestimonialModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  testimonial: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["Pending", "Accepted", "Declined"]).isRequired,
  }).isRequired,
};

export default TestimonialModal;
