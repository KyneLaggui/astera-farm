import { Input } from "@src/components/ui/input";
import { Button } from "@src/components/ui/button";
import { X } from "lucide-react";
import AddVoucherDialog from "@src/components/admin/modal/AddVoucher";
import { Plus } from "lucide-react";
import { useState } from "react";

function DataTableToolbar({ table, allData }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsAddDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsAddDialogOpen(false);
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-1 items-center gap-2 w-full justify-between">
        <Input
          placeholder="Search for voucher name..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button
          size="sm"
          className="ml-auto bg-green hover:bg-green-950"
          onClick={handleDialogOpen}
        >
          <div className="flex items-center gap-2 ">
            Add Voucher
            <Plus className="h-4 w-4" />
          </div>
        </Button>
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

      <AddVoucherDialog
        isAddDialogOpen={isAddDialogOpen}
        onDialogClose={handleDialogClose}
      />
    </div>
  );
}

export default DataTableToolbar;
