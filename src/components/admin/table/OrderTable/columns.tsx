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
import { supabase } from "@src/supabase/config";

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
    accessorKey: "id",
    header: ({ column }) => (
      <p
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="h-3 w-3" />
        ) : (
          <ArrowDown className="h-3 w-3" />
        )}
      </p>
    ),
    cell: ({ row }) => <TableCell>{row.original.id}</TableCell>,
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <p
        className="flex items-center gap-1 cursor-pointer hover:text-red-500"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total (PHP)
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="h-3 w-3" />
        ) : (
          <ArrowDown className="h-3 w-3" />
        )}
      </p>
    ),
    cell: ({ row }) => <TableCell>₱{row.original.total/100}</TableCell>,
  },
  {
    accessorKey: "paymentMethod",
    header: ({ column }) => (
      <p className="flex items-center gap-1 cursor-pointer hover:text-red-500"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Payment Method
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
          {formatPaymentMethod(row.original.paymentMethod)}
        </TableCell>
      );
    },
  },  
  {
    accessorKey: "type",
    header: ({ column }) => (
      <p className="flex items-center gap-1 cursor-pointer hover:text-red-500"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Type
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
          {row.original.type}
        </TableCell>
      );
    },
  },  
  {
    accessorKey: "status",
    header: ({ column }) => (
      <p
        className="flex items-center gap-1 cursor-pointer hover:text-red-500"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="h-3 w-3" />
        ) : (
          <ArrowDown className="h-3 w-3" />
        )}
      </p>
    ),
    cell: ({ row }) => {
      const [status, setStatus] = useState(row.original.status);

      const handleStatusChange = async (newStatus) => {
        setStatus(newStatus);

        // Get the current timestamp
        const currentTimestamp = new Date().toISOString();

        // Update the status and last_updated in Supabase
        const { error } = await supabase
          .from("order")
          .update({
            status: newStatus,
            last_updated: currentTimestamp,
          })
          .eq("order_id", row.original.id); // Use the ID of the row as a condition

        if (error) {
          console.error("Error updating order status:", error.message);
        }
      };

      return (
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger className="px-4 py-2 border rounded-md cursor-pointer">
              {status}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["Order Placed", "Processing", "Shipped", "Delivered"].map(
                (statusOption) => (
                  <DropdownMenuItem
                    key={statusOption}
                    onClick={() => handleStatusChange(statusOption)}
                  >
                    {statusOption}
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original;
      const [isOpen, setIsOpen] = useState(false);
  
      const orderDetails = {
        orderId: order.id,
        userName: order.shippingAddress.recipientName,
        userAddress: `${order.shippingAddress.street} Street, Brgy. ${order.shippingAddress.barangay}, ${order.shippingAddress.city}`,
        userPhone: order.shippingAddress.phone,
        paymentMethod: formatPaymentMethod(order.paymentMethod),
        status: order.status,
        deliveryDate: order.lastUpdated,
        statusUpdateDate: order.lastUpdated,
        products: order.cart.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.amount,
          quantity: product.quantity,
        })),
      };
  
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreHorizontalIcon className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{order.id}</DropdownMenuLabel>
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
          <OrderModal isOpen={isOpen} setIsOpen={setIsOpen} order={orderDetails} />
        </>
      );
    },
  },
];


  