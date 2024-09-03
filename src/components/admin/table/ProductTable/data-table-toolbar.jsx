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
import { supabase } from "@src/supabase/config";
import { z } from "zod";

Modal.setAppElement("#root");

function DataTableToolbar({ table, allData }) {
  const [newProduct, setNewProduct] = useState({});
  const [attributes, setAttributes] = useState([]);
  const [attributeInput, setAttributeInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({}); // State to track errors

  const isFiltered = table.getState().columnFilters.length > 0;

  const onInputHandleChange = (event) => {
    const { name, type, value, files } = event.target;

    setNewProduct((prevState) => {
      if (type === "file") {
        const selectedFile = files[0];
        const previewUrl = URL.createObjectURL(selectedFile);
        setImagePreview(previewUrl);

        return {
          ...prevState,
          [name]: selectedFile,
        };
      }

      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const productSchema = z.object({
    name: z.string().nonempty("Product name is required"),
    price: z.string().nonempty("Price is required"),
    description: z.string().nonempty("Description is required"),
    sellMethod: z.string().nonempty("Sell method is required"),
    productIcon: z.any().refine((file) => file instanceof File, {
      message: "Product icon is required",
    }),
  });

  const handleSubmit = async () => {
    const validationResult = productSchema.safeParse(newProduct);

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.formErrors.fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    const insertResult = await supabase
      .from("product")
      .insert({
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        sell_method: newProduct.sellMethod,
        attributes: attributes,
      })
      .select()
      .single();

    if (insertResult.error) {
      console.error("Error inserting new product:", insertResult.error.message);
      return null;
    } else {
      console.log(newProduct);
      const logo = newProduct.productIcon;
      const logoFileExt = logo.name.split(".").pop();

      const iconUpload = await supabase.storage
        .from("products")
        .upload(`public/${insertResult.data.id}.${logoFileExt}`, logo, {
          cacheControl: "3600",
          upsert: true,
        });
    }
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
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Product Icon Preview"
                      className="mb-4 w-full h-auto rounded-md object-cover"
                    />
                  )}
                  <label
                    className="block text-primary mt-2 text-center cursor-pointer bg-secondary py-2 px-3 rounded-md"
                    htmlFor="productIcon"
                  >
                    Upload Product Icon
                  </label>
                  <Input
                    id="productIcon"
                    type="file"
                    name="productIcon"
                    className="mt-2 text-center placeholder-gray-700 hidden"
                    onChange={onInputHandleChange}
                  />
                  {errors.productIcon && (
                    <p className="text-red-500 text-sm">{errors.productIcon}</p>
                  )}
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
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
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
                  {errors.price && (
                    <p className="text-red-500 text-sm">{errors.price}</p>
                  )}
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
                  {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                  )}
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
                  {errors.sellMethod && (
                    <p className="text-red-500 text-sm">{errors.sellMethod}</p>
                  )}
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
                      <li
                        key={index}
                        className="flex items-center justify-between px-4"
                      >
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
                  <Button variant="tertiary">Cancel</Button>
                </DialogClose>
                <Button
                  variant="default"
                  className="ml-2"
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            variant="green"
            size="sm"
            onClick={downloadCSV}
            className="whitespace-nowrap"
          >
            Download CSV
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataTableToolbar;
