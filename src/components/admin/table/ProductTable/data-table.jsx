// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
//   SortingState, // sorting
//   getSortedRowModel, // sorting
//   getPaginationRowModel, // pagination
//   ColumnFiltersState, // filtering
//   getFilteredRowModel, // filtering
//   getFacetedRowModel, // faceted filtering
//   getFacetedUniqueValues, // faceted filtering
// } from "@tanstack/react-table";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@src/components/ui/table";
// // import { DataTablePagination } from "@/app/custom_components/table/data-table-pagination";
// import React, { useState, useEffect } from 'react';
// import { DataTableToolbar } from "./data-table-toolbar";

// function DataTable({ columns, data }) {
//   const [sorting, setSorting] = useState([]); // sorting
//   const [columnFilters, setColumnFilters] = useState([]); // filtering
//   const [allData, setAllData] = useState([]);

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(), // pagination
//     onSortingChange: setSorting, // sorting
//     getSortedRowModel: getSortedRowModel(), // sorting
//     onColumnFiltersChange: setColumnFilters, // filtering
//     getFilteredRowModel: getFilteredRowModel(), // filtering
//     getFacetedRowModel: getFacetedRowModel(), // faceted filtering
//     getFacetedUniqueValues: getFacetedUniqueValues(), // faceted filtering
//     state: {
//       sorting, // sorting
//       columnFilters, // filtering
//     },
//   });

//   useEffect(() => {
//     if (data) {
//       setAllData(data);
//     }
//   }, [data]);

//   return (
//     <div className="flex flex-col gap-4">
//       <DataTableToolbar table={table} allData={allData} />
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       {/* <DataTablePagination table={table} /> */}
//     </div>
//   );
// }

// export default DataTable;
