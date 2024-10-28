import React from "react";
import VoucherTable from "@src/components/admin/table/VoucherTable/VoucherTable";
import LoggedInOnly from "@src/layouts/LoggedInOnly";
import { useNavigate } from "react-router-dom";

const Vouchers = () => {
  return (
    <LoggedInOnly forAdmin={true} forUser={false}>
      <div className="flex flex-col sm:items-center justify-center gap-8 navbar-spacing">
        <h1 className="font-gothic text-7xl sm:text-9xl text-center tracking-wide">
          VOUCHERS
        </h1>
        <VoucherTable />
      </div>
    </LoggedInOnly>
  );
};

export default Vouchers;
