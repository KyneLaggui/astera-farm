import React from "react";
import ProductTable from "@src/components/admin/table/ProductTable/ProductTable";
import { ScrollArea } from "@src/components/ui/scroll-area";
import LoggedInOnly from "@src/layouts/LoggedInOnly";
import { useNavigate } from "react-router-dom";

const Products = () => {
  return (
    <LoggedInOnly forAdmin={true} forUser={false} >
      <div className="flex flex-col sm:items-center justify-center gap-8 bg-black navbar-spacing">
        <h1 className="font-gothic text-7xl sm:text-9xl text-white text-center tracking-wide">
          PRODUCTS
        </h1>
        <ProductTable />
      </div>
    </LoggedInOnly>
  );
};

export default Products;
