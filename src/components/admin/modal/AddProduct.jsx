import { useState } from "react";
import { Input } from "@src/components/ui/input";
import { Button } from "@src/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@src/components/ui/dialog";
import { ScrollArea } from "@src/components/ui/scroll-area";
import { Plus, Trash2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@src/supabase/config";

function AddProduct({ onProductAdded }) {
  const [newProduct, setNewProduct] = useState({});
  const [attributes, setAttributes] = useState([]);
  const [attributeInput, setAttributeInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

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
    name: z.string().min(1, "Product name is required"),
    price: z.string().min(1, "Price is required"),
    description: z.string().min(1, "Description is required"),
    sellMethod: z.string().min(1, "Sell method is required"),
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

      onProductAdded();
    }
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="yellowish" size="sm" className="ml-auto">
          <div className="flex items-center gap-2">
            Add Product
            <Plus className="h-4 w-4" />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-0">
        <ScrollArea className="max-h-[80vh] w-full p-6">
          <div className="p-1">
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
                  <p className="text-red-500 text-sm mt-2">{errors.productIcon}</p>
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
                  <p className="text-red-500 text-sm mt-2">{errors.name}</p>
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
                  <p className="text-red-500 text-sm mt-2">{errors.price}</p>
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
                  <p className="text-red-500 text-sm mt-2">{errors.description}</p>
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
                  <p className="text-red-500 text-sm mt-2">{errors.sellMethod}</p>
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
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default AddProduct;
