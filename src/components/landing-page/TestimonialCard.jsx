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

const TestimonialCard = ({ name, content, role, company }) => {
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
          <p className="text-muted-foreground text-sm">{`${role} at ${company}`}</p>
        </div>
      </CardContent>
      {/* <VisuallyHidden>
        <CardFooter className="flex flex-col items-start"></CardFooter>
      </VisuallyHidden> */}
    </Card>
  );
};

export default TestimonialCard;
