import { Input } from "@src/components/ui/input";
import { Button } from "@src/components/ui/button";
import { X } from "lucide-react";
import AddProductDialog from "@src/components/admin/modal/AddProduct"
import { useState } from "react";

function DataTableToolbar({ table, allData }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setIsEditDialogOpen(false);
  };
  const downloadCSV = () => {
    // Logic to download data as CSV
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-1 items-center gap-2 w-full justify-between">
        <Input
          placeholder="Search for product name..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}        
      </div>

      <AddProductDialog isEditDialogOpen={isEditDialogOpen} onDialogClose={handleDialogClose} />
    </div>
  );
}

export default DataTableToolbar;
