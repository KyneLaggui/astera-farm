import React from "react";
import OrderTable from "@src/components/admin/table/OrderTable/OrderTable";
import { ScrollArea } from "@src/components/ui/scroll-area";
import LoggedInOnly from "@src/layouts/LoggedInOnly";

const Orders = () => {
  return (
    <LoggedInOnly forAdmin={true} forUser={false}>
      <div className="flex flex-col sm:items-center justify-center gap-8 navbar-spacing">
        <h1 className="font-gothic text-7xl sm:text-9xl text-center tracking-wide">
          ORDERS
        </h1>
        <OrderTable />
      </div>
    </LoggedInOnly>
  );
};

export default Orders;
