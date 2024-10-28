import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./columns";
import DataTable from "./data-table";
import fetchAllVouchers from "@src/custom-hooks/fetchAllVouchers";
import { SET_VOUCHERS } from "@src/redux/slice/vouchersSlice";

export default function VoucherTable() {
  const dispatch = useDispatch();
  const { vouchers: fetchedVouchers } = fetchAllVouchers(); // Fetch products from Supabase

  useEffect(() => {
    if (fetchedVouchers) {      
      dispatch(SET_VOUCHERS({ vouchers: fetchedVouchers })); // Dispatch to Redux
    }
    
  }, [fetchedVouchers, dispatch]);

  return <DataTable columns={columns} />; // Pass Redux products to DataTable
}
