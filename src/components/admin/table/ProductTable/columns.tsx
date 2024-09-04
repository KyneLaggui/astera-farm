// import { Tag } from "@/app/custom_components/Tag";
import { Button } from "@src/components/ui/button";
import { useReactTable } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@src/components/ui/dropdown-menu";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { TableCell } from "@src/components/TableCell";


const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Define the shape of data
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
    cell: ({ row }) => <TableCell>{row.original.price}</TableCell>,
  },
 
  {
    accessorKey: "description",
    header: ({ column }) => (
      <p
        className="flex items-center gap-1 cursor-pointer hover:text-red-500"
      >
        Description      
      </p>
    ),
    cell: ({ row }) => <div>Description</div>,
  },
  {
    accessorKey: "sellMethod",
    header: ({ column }) => (
      <p
        className="flex items-center gap-1 cursor-pointer hover:text-red-500"
      >
        Sell Method
      </p>
    ),
    cell: ({ row }) => <TableCell>{row.original.sellMethod}</TableCell>,
  },
  {
    accessorKey: "attributes",
    header: "Attributes",
    cell: ({ row }) => <TableCell>{row.original.attributes}</TableCell>,
  },
  // {
  //   accessorKey: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     const user = row.original;
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger>
  //           {/* <MoreHorizIcon className="h-4 w-4" /> */}
  //           <div>okay</div>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent>
  //           <DropdownMenuLabel>
  //             {user.first_name} {user.last_name}
  //           </DropdownMenuLabel>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem
  //             onClick={() => deleteAccountWithId(user.id)}
  //             className="cursor-pointer"
  //           >
  //             Delete
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
