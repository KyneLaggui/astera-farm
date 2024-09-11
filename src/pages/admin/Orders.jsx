import React from "react";
import OrderTable from "@src/components/admin/table/OrderTable/OrderTable";
import { ScrollArea } from "@src/components/ui/scroll-area";

const Orders = () => {
  return (
    <div className="flex flex-col sm:items-center justify-center gap-8 bg-black navbar-spacing">
      <h1 className="font-gothic text-7xl sm:text-9xl text-white text-center tracking-wide">
        ORDERS
      </h1>
      <OrderTable />
    </div>
  );
};

export default Orders;
