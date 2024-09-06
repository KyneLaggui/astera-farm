import React from "react";
import ProductTable from "@src/components/admin/table/ProductTable/ProductTable";
import { ScrollArea } from "@src/components/ui/scroll-area";

const Products = () => {
  return (
    <div className="flex flex-col sm:items-center justify-center gap-8 bg-black navbar-spacing">
      <h1 className="font-gothic text-7xl sm:text-9xl text-white text-center tracking-wide">
        PRODUCTS
      </h1>
      <ProductTable />
    </div>
  );
};

export default Products;
