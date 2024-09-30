import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { ADD_TO_CART, SET_CART, selectCartItems } from "@src/redux/slice/cartSlice";
import { selectEmail } from "@src/redux/slice/authSlice";
import { addToCart } from "@src/supabase/actions";
import { toast } from "react-toastify";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@src/components/ui/drawer";
import Background from "@src/assets/images/BG-Products.png";
import { ScrollArea } from "@src/components/ui/scroll-area";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import LoggedInOnlyComponent from "@src/layouts/component-restriction/LoggedInOnlyComponent";

const ProductView = ({ isOpen, onClose, product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const [loading, setLoading] = useState(false); // Loading state for add to cart
  const email = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    setQuantity(1); // Reset quantity when the drawer opens
  }, [isOpen]);

  // Handle input change without immediately forcing a valid value
  const handleQuantityChange = (e) => {
    const value = e.target.value;
    setQuantity(value); // Allow the user to clear or input any value temporarily
  };

  // Ensure quantity is valid after the user finishes inputting (e.g., on blur or add to cart)
  const handleBlur = () => {
    if (quantity === "" || quantity < 1) {
      setQuantity(1); // Reset to 1 if the input is empty or less than 1
    }
  };

  // Add product to cart with the validated quantity and sync with Supabase + Redux
  const handleAddToCart = async () => {
    if (loading) return; // Prevent duplicate requests
    setLoading(true); // Lock the action while adding

    const validQuantity = Math.max(1, parseInt(quantity)); // Ensure quantity is at least 1
    
    // Check if quantity exceeds the available stock
    if (validQuantity > product.stock) {
      toast.error(`Cannot add more than ${product.stock} items to the cart.`); // Show error message
      setLoading(false); // Unlock the action
      return;
    }

    const productWithQuantity = {
      ...product,
      cartQuantity: validQuantity,
    };

    try {
      const result = await addToCart(cartItems, productWithQuantity, email);
      if (result) {
        dispatch(SET_CART(result.cartItems)); // Update Redux with the new cart
        toast.success("Added to cart"); // Show success message
        onClose(); // Close the drawer
      }
    } catch (error) {
      toast.error("Failed to add to cart. Please try again."); // Show error message
    } finally {
      setLoading(false); // Unlock the action
    }
  };

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <VisuallyHidden>
        <DrawerTitle></DrawerTitle>
        <DrawerDescription></DrawerDescription>
      </VisuallyHidden>
      <DrawerContent
        className="p-6 pb-0 bg-cover bg-center bg-white max-h-[90vh] lg:min-h-[90vh]"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <ScrollArea className="overflow-y-auto flex-grow">
          {product && (
            <div className="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-12 px-5 py-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-[250px] md:max-w-[300px] lg:max-w-[500px] xl:max-w-[600px] object-contain"
              />
              <div className="text-[#293400] flex flex-col gap-5 lg:items-start">
                <h1 className="font-gothic text-center sm:text-start lg:text-start text-5xl md:text-7xl lg:text-8xl xl:text-9xl uppercase tracking-wide ">
                  {product.name}
                </h1>
                <p className="font-spartan text-center sm:text-start text-xl md:text-2xl xl:text-3xl font-medium xl:max-w-[800px]">
                  {product.description}
                </p>
                <ul className="list-disc p-0 flex flex-col flex-wrap gap-4 ml-5">
                  {product.attributes.map((category, index) => (
                    <li
                      key={index}
                      className="font-spartan font-extrabold text-xl md:text-2xl xl:text-3xl uppercase"
                    >
                      {category}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center flex-wrap gap-4 lg:items-start lg:flex-col">
                  <p className="font-spartan sm:text-xl text-lg lg:text-2xl font-medium tracking-wider">
                    {product.sellMethod}
                  </p>
                  <h1 className="font-spartan font-bold text-4xl md:text-5xl xl:text-6xl uppercase tracking-wide">
                    ₱{product.price.toFixed(2)}
                  </h1>
                  <p className="font-spartan sm:text-xl text-lg lg:text-2xl font-medium tracking-wider">
                    Stock: {product.stock} {/* Display stock */}
                  </p>
                </div>

                {/* Desktop add to cart */}
                <LoggedInOnlyComponent forUser={true} forAdmin={false}>
                  <div className="hidden lg:block">
                    <div className="flex items-center h-14">
                      <input
                        type="number"
                        value={quantity}
                        min={1}
                        onChange={handleQuantityChange}
                        onBlur={handleBlur} // Ensure valid quantity on blur
                        className="border border-yellow h-full max-w-[50px] text-center text-2xl"
                      />
                      <button
                        onClick={handleAddToCart}
                        className={`bg-yellow text-green h-full font-spartan font-extrabold text-2xl xl:text-3xl pt-3 pb-2 px-5 rounded-r-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading} // Disable while loading
                      >
                        {loading ? "Adding..." : "ADD TO CART"}
                      </button>
                    </div>
                  </div>
                </LoggedInOnlyComponent>
              </div>
            </div>
          )}
        </ScrollArea>

        {/* Mobile add to cart */}
        <LoggedInOnlyComponent forUser={true} forAdmin={false}>
          <div className="block lg:hidden border-t">
            <div className="flex items-center h-12 bottom-0 my-3">
              <input
                type="number"
                value={quantity}
                min={1}
                onChange={handleQuantityChange}
                onBlur={handleBlur} // Ensure valid quantity on blur
                className="border border-yellow h-full max-w-[50px] sm:max-w-[100px] text-center text-2xl flex-grow-0 text-green [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                onClick={handleAddToCart}
                className={`bg-yellow text-green font-spartan font-extrabold text-xl pt-3 pb-2 px-5 rounded-r-full w-full h-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading} // Disable while loading
              >
                {loading ? "Adding..." : "ADD TO CART"}
              </button>
            </div>
          </div>
        </LoggedInOnlyComponent>
      </DrawerContent>
    </Drawer>
  );
};

ProductView.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string,
    attributes: PropTypes.arrayOf(PropTypes.string).isRequired,
    sellMethod: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired, // Add stock to prop types
  }),
};

export default ProductView;
