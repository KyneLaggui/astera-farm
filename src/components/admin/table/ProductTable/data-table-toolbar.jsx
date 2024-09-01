import { useState } from "react";
import Modal from "react-modal";
import { Input } from "@src/components/ui/input";
import { Button } from "@src/components/ui/button";
import { Label } from "@src/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@src/components/ui/dialog";
import { X, Plus, Trash2 } from "lucide-react";

Modal.setAppElement("#root");

function DataTableToolbar({ table, allData }) {
  const [newProduct, setNewProduct] = useState({});
  const [attributes, setAttributes] = useState([]);
  const [attributeInput, setAttributeInput] = useState("");

  const isFiltered = table.getState().columnFilters.length > 0;

  const onInputHandleChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    
  };

  const downloadCSV = () => {
    // Logic to download data as CSV
  };

  const handleAttributeAdd = () => {
    if (attributeInput.trim() !== "") {
      setAttributes([...attributes, attributeInput]);
      setAttributeInput("");
    }
  };

  const handleAttributeDelete = (index) => {
    setAttributes(attributes.filter((_, i) => i !== index));
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
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {isFiltered && (
          <Button
            variant="tertiary"
            onClick={() => table.resetColumnFilters()}
            size="sm"
          >
            <X className="mr-2 h-4 w-4" />
            <p>Reset</p>
          </Button>
        )}
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="yellowish" size="sm" className="ml-auto">
                <div className="flex items-center gap-2">
                  Add Product
                  <Plus className="h-4 w-4" />
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <form>
                <div className="mb-4">
                  <label className="block text-primary mt-2 text-center cursor-pointer bg-secondary py-2 px-3 rounded-md" htmlFor="productIcon">
                    Upload Product Icon
                  </label>
                  <Input
                    id="productIcon"
                    type="file"
                    name="productIcon"
                    className="mt-2 text-center placeholder-gray-700 hidden"
                    onChange={onInputHandleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Product Name</label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="e.g. Fresh Basil"
                    name="name"
                    className="mt-2"
                    onChange={onInputHandleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Price (PHP)</label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="e.g. 12.99"
                    name="price"
                    className="mt-2"
                    onChange={onInputHandleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Description</label>
                  <textarea
                    id="description"
                    placeholder="e.g. This product is..."
                    name="description"
                    className="mt-2 p-2 w-full border rounded resize-none text-black"
                    onChange={onInputHandleChange}
                    rows="4"
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Sell Method</label>
                  <Input
                    id="sellMethod"
                    type="text"
                    placeholder="e.g. Sold per 250g"
                    name="sellMethod"
                    className="mt-2"
                    onChange={onInputHandleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block">Attributes</label>
                  <div className="flex gap-2">
                    <Input
                      id="attributeInput"
                      type="text"
                      placeholder="e.g. Organic, Fresh"
                      value={attributeInput}
                      className="mt-2"
                      onChange={(e) => setAttributeInput(e.target.value)}
                    />
                    <Button
                      variant="default"
                      className="mt-2"
                      onClick={handleAttributeAdd}
                      type="button"
                    >
                      Add
                    </Button>
                  </div>
                  <ul className="mt-2 list-disc list-inside">
                    {attributes.map((attribute, index) => (
                      <li key={index} className="flex items-center justify-between px-4">
                        &bull; {attribute}
                        <button
                          type="button"
                          className="text-red-500 ml-2"
                          onClick={() => handleAttributeDelete(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </form>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="tertiary">
                    Cancel
                  </Button>
                </DialogClose>
                <Button variant="default" className="ml-2" onClick={handleSubmit}>
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="green" size="sm" className="ml-auto" onClick={downloadCSV}>
            <div className="flex items-center gap-2">
              Export data to CSV
              <Plus className="h-4 w-4" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataTableToolbar;
