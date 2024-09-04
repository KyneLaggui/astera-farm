import { useState, useEffect } from "react";
import { columns } from "./columns";
import DataTable from "./data-table";
import fetchAllProduct from "@src/custom-hooks/fetchAllProduct";

export default function ProductTable() {
  const [productState, setProductState] = useState([]);
  const { products } = fetchAllProduct();

  useEffect(() => {
    if (products) {
      const allProducts = products.map((product) => {
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          sellMethod: product.sell_method,
          attributes: product.attributes,
          price: product.price,
        };
      });

      setProductState(allProducts)
    }
  }, [products])

  return (
      <DataTable columns={columns} data={productState} />
  );
}
