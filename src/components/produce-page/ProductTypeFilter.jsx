import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@src/components/ui/dropdown-menu";
import { Button } from "@src/components/ui/button";
import { LayoutGrid } from "lucide-react";

const ProductTypeFilter = ({ values = [], onFilterChange }) => {
    const [selectedItems, setSelectedItems] = useState([]);
  
    const handleSelectChange = (value) => {
      const updatedSelection = selectedItems.includes(value)
        ? selectedItems.filter((item) => item !== value)
        : [...selectedItems, value];
  
      setSelectedItems(updatedSelection);
      onFilterChange(updatedSelection); // Notify parent of the changes
    };
  
    const isOptionSelected = (value) => selectedItems.includes(value);
  
    return (
      <DropdownMenu className="w-24">
        <DropdownMenuTrigger asChild  className="w-24">
          <Button variant="outline" className="flex gap-2 font-bold">
            <LayoutGrid size={24} />
            <span>Filter</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" onCloseAutoFocus={(e) => e.preventDefault()}>
          <DropdownMenuLabel>Product Types</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {values.map((value, index) => (
            <DropdownMenuCheckboxItem
              onSelect={(e) => e.preventDefault()}
              key={index}
              checked={isOptionSelected(value.key)}
              onCheckedChange={() => handleSelectChange(value.key)}
              className="cursor-pointer"
            >
              {value.value}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  
export default ProductTypeFilter;
