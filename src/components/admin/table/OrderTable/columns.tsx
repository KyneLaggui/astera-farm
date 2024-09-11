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
import OrderCard from "@src/components/OrderCard";
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
    accessorKey: "amount",
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
    cell: ({ row }) => <TableCell>{row.original.total}</TableCell>,
  },
  {
    accessorKey: "paymentMethod",
    header: ({ column }) => (
      <p className="flex items-center gap-1 cursor-pointer hover:text-red-500">
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

      const orderDetails = {
        orderId: order.id,
        userName: order.userId,
        userAddress: `${order.shippingAddress.street} Street, Brgy. ${order.shippingAddress.barangay}, ${order.shippingAddress.city}`,
        userPhone: order.shippingAddress.phone,
        paymentMethod: formatPaymentMethod(order.paymentMethod),
        status: order.status,
        deliveryDate: order.lastUpdated,
        statusUpdateDate: order.lastUpdated,
        products: order.cart.map((product) => {
          return {
            id: product.id,
            name: product.name,
            price: product.amount,
            quantity: product.quantity
          }
        })
      }
      
      // For Edit Dialog
      // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
      // const handleEditClick = () => {
      //   setIsEditDialogOpen(true);
      // };
      // const handleDialogClose = () => {
      //   setIsEditDialogOpen(false);
      // };

      // // For Confirm Delete Dialog
      // const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      // const handleDeleteDialogOpen = () => {
      //   setIsDeleteDialogOpen(true);
      // };
      
      // const handleDeleteDialogClose = () => {
      //   setIsDeleteDialogOpen(false);
      // };

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
                // onClick={handleEditClick}
              >
                Open
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <OrderCard order={orderDetails}/>
        </>
      );
    },
  },
];




// {
  //   accessorKey: "description",
  //   header: ({ column }) => (
  //     <p className="flex items-center gap-1 cursor-pointer hover:text-red-500">
  //       Description
  //     </p>
  //   ),
  //   cell: ({ row }) => <TableCell>{row.original.description}</TableCell>,
  // },
  // {
  //   accessorKey: "sellMethod",
  //   header: ({ column }) => (
  //     <p className="flex items-center gap-1 cursor-pointer hover:text-red-500">
  //       Sell Method
  //     </p>
  //   ),
  //   cell: ({ row }) => <TableCell>{row.original.sellMethod}</TableCell>,
  // },
  // {
  //   accessorKey: "attributes",
  //   header: "Attributes",
  //   cell: ({ row }) => {
  //     const attributesArray = row.original.attributes;
  //     return (
  //       <TableCell>
  //         [{Array.isArray(attributesArray)
  //           ? attributesArray.map((attr) => `"${attr}"`).join(", ")
  //           : ""}]
  //       </TableCell>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     const product = row.original;

  //     // For Edit Dialog
  //     const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  //     const handleEditClick = () => {
  //       setIsEditDialogOpen(true);
  //     };
  //     const handleDialogClose = () => {
  //       setIsEditDialogOpen(false);
  //     };

  //     // For Confirm Delete Dialog
  //     const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  //     const handleDeleteDialogOpen = () => {
  //       setIsDeleteDialogOpen(true);
  //     };
      
  //     const handleDeleteDialogClose = () => {
  //       setIsDeleteDialogOpen(false);
  //     };

  //     return (
  //       <>
  //         <DropdownMenu>
  //           <DropdownMenuTrigger>
  //             <MoreHorizontalIcon className="h-4 w-4" />
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent>
  //             <DropdownMenuLabel>{product.name}</DropdownMenuLabel>
  //             <DropdownMenuSeparator />
  //             <DropdownMenuItem
  //               className="cursor-pointer"
  //               onClick={handleEditClick}
  //             >
  //               Edit
  //             </DropdownMenuItem>
  //             <DropdownMenuItem className="cursor-pointer" onClick={handleDeleteDialogOpen}>Delete</DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //         <EditProductDialog
  //           product={product}
  //           isEditDialogOpen={isEditDialogOpen}
  //           onDialogClose={handleDialogClose}
  //           onProductUpdated={handleDialogClose}
  //         />          
  //         <ConfirmDeleteDialog 
  //           product={product}
  //           isDeleteDialogOpen={isDeleteDialogOpen}
  //           onDialogClose={handleDeleteDialogClose}
  //           onProductUpdated={handleDeleteDialogClose}
  //         />
  //       </>
  //     );
  //   },
  // },