import { ArrowDown, ArrowUp, MoreHorizontalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@src/components/ui/dropdown-menu";
import { TableCell } from "@src/components/TableCell";
import EditProductDialog from "@src/components/admin/modal/EditProduct";
import ConfirmDeleteDialog from "@src/components/admin/modal/ConfirmProductDelete";
import OrderModal from "@src/components/admin/modal/OrderCard";
import { useState } from "react";
import TestimonialModal from "../../modal/TestimonialModal";

// Helper function to capitalize the first letter
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const formatPaymentMethod = (paymentMethod) => {
  return paymentMethod
    .replace(/_/g, " ") // Replace underscores with spaces
    .split(" ") // Split into words
    .map(capitalizeFirstLetter) // Capitalize first letter of each word
    .join(" "); // Join them back with a space
};

// Define the shape of data and columns
export const columns = [
  {
    accessorKey: "email",
    header: ({ column }) => (
      <p
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="h-3 w-3" />
        ) : (
          <ArrowDown className="h-3 w-3" />
        )}
      </p>
    ),
    cell: ({ row }) => <TableCell>{row.original.email}</TableCell>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <p
        className="flex items-center gap-1 cursor-pointer hover:text-red-500"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="h-3 w-3" />
        ) : (
          <ArrowDown className="h-3 w-3" />
        )}
      </p>
    ),
    cell: ({ row }) => <TableCell>{row.original.name}</TableCell>,
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <p className="flex items-center gap-1 cursor-pointer hover:text-red-500"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Company
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="h-3 w-3" />
        ) : (
          <ArrowDown className="h-3 w-3" />
        )}
      </p>
    ),
    cell: ({ row }) => {  
      return (
        <TableCell>
          {row.original.company}
        </TableCell>
      );
    },
  }, 
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <p className="flex items-center gap-1 cursor-pointer hover:text-red-500"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Rating
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="h-3 w-3" />
        ) : (
          <ArrowDown className="h-3 w-3" />
        )}
      </p>
    ),
    cell: ({ row }) => {  
      return (
        <TableCell>
          {row.original.rating}
        </TableCell>
      );
    },
  },  
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const testimonial = row.original;
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreHorizontalIcon className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{testimonial.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setIsOpen(true)} // Open the modal on click
              >
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Render the modal */}
          <TestimonialModal isOpen={isOpen} setIsOpen={setIsOpen} testimonial={testimonial} />
        </>
      );
    },
  },
];


  