import { useState, useEffect } from "react";
import { Input } from "@src/components/ui/input";
import { Button } from "@src/components/ui/button";
import { ScrollArea } from "@src/components/ui/scroll-area";
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
import { X, Trash2 } from "lucide-react";
import { supabase } from "@src/supabase/config";
import { z } from "zod";
import fetchProductUrl from "@src/custom-hooks/actions/fetchProductUrl";
import { useDispatch } from "react-redux";
import { UPDATE_PRODUCT } from "@src/redux/slice/productsSlice";

function EditProductDialog({ product, onProductUpdated, isEditDialogOpen, onDialogClose }) {
  const [editProduct, setEditProduct] = useState({});
  const [attributes, setAttributes] = useState([]);
  const [attributeInput, setAttributeInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch(); 

  useEffect(() => {
    if (product) {
      setEditProduct(product);
      setAttributes(product.attributes || []);
      
      const fetchProductImage = async () => {
        const imageUrl = await fetchProductUrl(product.id);
        setImagePreview(imageUrl);
      }

      fetchProductImage()
    }
  }, [product]);


  const onInputHandleChange = (event) => {
    const { name, type, value, files } = event.target;

    setEditProduct((prevState) => {
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
    price: z.number()
      .min(0, { message: "Price must be a non-negative number" }), // Ensures price is >= 0
    description: z.string().min(1, "Description is required"),
    sellMethod: z.string().min(1, "Sell method is required"),
  });
  
    const handleSubmit = async () => {
      const validationResult = productSchema.safeParse(editProduct);

      if (!validationResult.success) {
        const fieldErrors = validationResult.error.formErrors.fieldErrors;
        setErrors(fieldErrors);
        return;
      }

      const updateData = {
        name: editProduct.name,
        description: editProduct.description,
        price: editProduct.price,
        sell_method: editProduct.sellMethod,
        attributes: attributes,
      };

      const updateResult = await supabase
        .from("product")
        .update(updateData)
        .eq("id", product.id);

      if (updateResult.error) {
        console.error("Error updating product:", updateResult.error.message);
        return null;
      }

      if (editProduct.productIcon) {
        const logoFileExt = editProduct.productIcon.name.split(".").pop();
        await supabase.storage
          .from("products")
          .upload(`public/${product.id}.${logoFileExt}`, editProduct.productIcon, {
            cacheControl: "3600",
            upsert: true,
          });
      }

      // Dispatch the updated product to Redux
      dispatch(UPDATE_PRODUCT({
        id: product.id,
        ...updateData,
        sellMethod: updateData.sell_method,
        productIcon: editProduct.productIcon ? editProduct.productIcon : product.productIcon,
      }));

      onProductUpdated();
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
    <Dialog open={isEditDialogOpen} onOpenChange={onDialogClose}>
      <DialogContent className="max-w-md p-0">
        <ScrollArea className="max-h-[80vh] w-full p-6">
          <div className="p-1">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
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
                  Upload New Product Icon
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
                  value={editProduct.name || ""}
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
                  value={editProduct.price || ""}
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
                  value={editProduct.description || ""}
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
                  value={editProduct.sellMethod || ""}
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
                Save Changes
              </Button>
            </DialogFooter>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default EditProductDialog;