import { useState } from "react";
import { Input } from "@src/components/ui/input";
import { Button } from "@src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@src/components/ui/dialog";
import { ScrollArea } from "@src/components/ui/scroll-area";
import { CircleMinus } from "lucide-react";
import { z } from "zod";
import { supabase } from "@src/supabase/config";
import { useDispatch } from "react-redux";
import { ADD_PRODUCT } from "@src/redux/slice/productsSlice";
import { Textarea } from "@src/components/ui/textarea";
import { toast } from "react-toastify";

function AddProduct({ isAddDialogOpen, onDialogClose }) {
  const [newProduct, setNewProduct] = useState({});
  const [attributes, setAttributes] = useState([]);
  const [attributeInput, setAttributeInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

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
      } else if (type === "number") {
        return {
          ...prevState,
          [name]: parseFloat(value),
        };
      } else {
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  };

  const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    type: z.string().min(1, "Product type is required"),
    price: z
      .number()
      .min(0, { message: "Price must be a non-negative number" }), // Ensures price is >= 0
    description: z.string().min(1, "Description is required"),
    sellMethod: z.string().min(1, "Sell method is required"),
    productIcon: z.any().refine((file) => file instanceof File, {
      message: "Product icon is required",
    }),
    attributes: z
      .array(z.string())
      .min(1, { message: "At least one attribute is required" }), // Ensures the array is not empty
    stock: z.number().min(0, "Stock must be a non-negative number"), // Stock validation
  });

  const handleSubmit = async () => {
    const validationResult = productSchema.safeParse({
      ...newProduct,
      attributes,
      stock: isNaN(newProduct.stock) ? 0 : Number(newProduct.stock),
    });

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.formErrors.fieldErrors;
      setErrors(fieldErrors);
      toast.success("Please fill out all required fields.");
      return;
    }

    const insertResult = await supabase
      .from("product")
      .insert({
        name: newProduct.name,
        type: newProduct.type,
        description: newProduct.description,
        price: newProduct.price,
        sell_method: newProduct.sellMethod,
        attributes: attributes,
        stock: isNaN(newProduct.stock) ? 0 : Number(newProduct.stock),        
      })
      .select()
      .single();

    if (insertResult.error) {
      toast.error("Error inserting new product.");
      return null;
    } else {
      const logo = newProduct.productIcon;
      const logoFileExt = logo.name.split(".").pop();

      const iconUpload = await supabase.storage
        .from("products")
        .upload(`public/${insertResult.data.id}.${logoFileExt}`, logo, {
          cacheControl: "0",
          upsert: true,
        });

      toast.success("Product added successfully!");
      dispatch(
        ADD_PRODUCT({
          product: {
            id: insertResult.data.id,
            name: insertResult.data.name,
            description: insertResult.data.description,
            sellMethod: insertResult.data.sell_method,
            attributes: insertResult.data.attributes,
            price: insertResult.data.price,
            stock: isNaN(insertResult.data.stock)
              ? 0
              : Number(insertResult.data.stock),
          },
        })
      );

      setNewProduct({});
      setAttributes([]);
      setAttributeInput("");
      setImagePreview(null);
      setErrors({});

      onDialogClose();
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
    <Dialog open={isAddDialogOpen} onOpenChange={onDialogClose}>
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
                  <p className="text-red-500 text-sm mt-2">
                    {errors.productIcon}
                  </p>
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
                <label className="block">Product Type</label>
                <Input
                  id="type"
                  type="text"
                  placeholder="e.g. LEAFY GREENS"
                  name="type"
                  className="mt-2"
                  onChange={onInputHandleChange}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">{errors.type}</p>
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
                <Textarea
                  id="description"
                  placeholder="e.g. This product is..."
                  name="description"
                  className="mt-2 p-2 w-full border rounded resize-none"
                  onChange={onInputHandleChange}
                  rows="4"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.description}
                  </p>
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
                  <p className="text-red-500 text-sm mt-2">
                    {errors.sellMethod}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block">Stock</label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  placeholder="Enter stock quantity"
                  className="mt-2"
                  onChange={onInputHandleChange}
                />
                {errors.stock && (
                  <p className="text-red-500 text-sm mt-2">{errors.stock}</p>
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
                    className="mt-2 bg-green hover:bg-green-950"
                    onClick={handleAttributeAdd}
                    type="button"
                  >
                    Add
                  </Button>
                </div>
                {errors.attributes && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.attributes}
                  </p>
                )}
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
                        <CircleMinus className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </form>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                variant="default"
                className="ml-2 bg-green hover:bg-green-950"
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
