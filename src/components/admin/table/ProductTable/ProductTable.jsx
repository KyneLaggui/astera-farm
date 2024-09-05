import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./columns";
import DataTable from "./data-table";
import fetchAllProduct from "@src/custom-hooks/fetchAllProduct";
import { SET_PRODUCTS } from "@src/redux/slice/productsSlice";

export default function ProductTable() {
  const dispatch = useDispatch();
  const { products: fetchedProducts } = fetchAllProduct(); // Fetch products from Supabase
 
  useEffect(() => {
    if (fetchedProducts) {
      const allProducts = fetchedProducts.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        sellMethod: product.sell_method,
        attributes: product.attributes,
        price: product.price,
      }));
      dispatch(SET_PRODUCTS({ products: allProducts })); // Dispatch to Redux
    }
    
  }, [fetchedProducts, dispatch]);

  return <DataTable columns={columns} />; // Pass Redux products to DataTable
}
