import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel, // sorting
  getPaginationRowModel, // pagination
  getFilteredRowModel, // filtering
  getFacetedRowModel, // faceted filtering
  getFacetedUniqueValues, // faceted filtering
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@src/components/ui/table";
import { useSelector } from "react-redux";
import { DataTablePagination } from "@src/components/TablePagination";
import { selectProducts } from "@src/redux/slice/productsSlice";
import React, { useState, useEffect } from "react";
import DataTableToolbar from "./data-table-toolbar";
import NoProduct from "@src/assets/images/NoProduct.png";

function DataTable({ columns }) {
  const [sorting, setSorting] = useState([]); // sorting
  const [columnFilters, setColumnFilters] = useState([]); // filtering
  const [allData, setAllData] = useState([]);
  const products = useSelector(selectProducts); // Select products from Redux state

  const table = useReactTable({
    data: allData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // pagination
    onSortingChange: setSorting, // sorting
    getSortedRowModel: getSortedRowModel(), // sorting
    onColumnFiltersChange: setColumnFilters, // filtering
    getFilteredRowModel: getFilteredRowModel(), // filtering
    getFacetedRowModel: getFacetedRowModel(), // faceted filtering
    getFacetedUniqueValues: getFacetedUniqueValues(), // faceted filtering
    state: {
      sorting, // sorting
      columnFilters, // filtering
    },
  });

  useEffect(() => {
    if (products) {
      setAllData(products);
    }
  }, [products]);

  return (
    <div className="flex flex-col gap-4 max-w-[1200px]">
      <DataTableToolbar table={table} allData={allData} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="">
                <TableCell colSpan={columns.length} className="w-[1200px] ">
                  <div className="flex flex-col items-start sm:items-center">
                    <img
                      src={NoProduct}
                      alt="No product picture"
                      className="max-w-[300px]"
                    />
                    <p className="text-center">No products found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}

export default DataTable;
