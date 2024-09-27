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
import { useState } from "react";

// Helper function to capitalize the first letter
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const formatCurrency = (value) => 
  value.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

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
    accessorKey: "price",
    header: ({ column }) => (
      <p
        className="flex items-center gap-1 cursor-pointer hover:text-red-500"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="h-3 w-3" />
        ) : (
          <ArrowDown className="h-3 w-3" />
        )}
      </p>
    ),
    cell: ({ row }) => <TableCell>&#8369;{formatCurrency(row.original.price)}</TableCell>,
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <p
        className="flex items-center gap-1 cursor-pointer hover:text-red-500"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Stock
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="h-3 w-3" />
        ) : (
          <ArrowDown className="h-3 w-3" />
        )}
      </p>
    ),
    cell: ({ row }) => <TableCell>{row.original.stock}</TableCell>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <p className="flex items-center gap-1 cursor-pointer hover:text-red-500">
        Description
      </p>
    ),
    cell: ({ row }) => <TableCell>{row.original.description}</TableCell>,
  },
  {
    accessorKey: "sellMethod",
    header: ({ column }) => (
      <p className="flex items-center gap-1 cursor-pointer hover:text-red-500">
        Sell Method
      </p>
    ),
    cell: ({ row }) => <TableCell>{row.original.sellMethod}</TableCell>,
  },
  {
    accessorKey: "attributes",
    header: "Attributes",
    cell: ({ row }) => {
      const attributesArray = row.original.attributes;
      return (
        <TableCell>
          [{Array.isArray(attributesArray)
            ? attributesArray.map((attr) => `"${attr}"`).join(", ")
            : ""}]
        </TableCell>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;

      // For Edit Dialog
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
      const handleEditClick = () => {
        setIsEditDialogOpen(true);
      };
      const handleDialogClose = () => {
        setIsEditDialogOpen(false);
      };

      // For Confirm Delete Dialog
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      const handleDeleteDialogOpen = () => {
        setIsDeleteDialogOpen(true);
      };
      
      const handleDeleteDialogClose = () => {
        setIsDeleteDialogOpen(false);
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreHorizontalIcon className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{product.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleEditClick}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={handleDeleteDialogOpen}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <EditProductDialog
            product={product}
            isEditDialogOpen={isEditDialogOpen}
            onDialogClose={handleDialogClose}
            onProductUpdated={handleDialogClose}
          />          
          <ConfirmDeleteDialog 
            product={product}
            isDeleteDialogOpen={isDeleteDialogOpen}
            onDialogClose={handleDeleteDialogClose}
            onProductUpdated={handleDeleteDialogClose}
          />
        </>
      );
    },
  },
];
