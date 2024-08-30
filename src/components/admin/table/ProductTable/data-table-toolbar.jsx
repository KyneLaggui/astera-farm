// import { useState, useEffect } from "react";
// // import { Input } from "@src/components/ui/input";
// import { Table } from "@tanstack/react-table";
// import { DataTableFacetedFilter } from "./data-table-faceted-filter";
// import { roles } from "./data";
// // import { Button } from "@src/components/ui/button";
// import { X, Plus } from "lucide-react";
// // import { signUpWithEmailAndPasswordOnly } from "@/utils/supabase/actions";
// // import FormsLabel from "@/app/custom_components/FormsLabel";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@src/components/ui/select";

// function DataTableToolbar({ table, allData }) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [role, setRole] = useState(null);
//   const [tableState, setTableState] = useState(null);

//   const isFiltered = table.getState().columnFilters.length > 0;

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   const onInputHandleChange = (event) => {
//     const { name, value } = event.target;
//     setTableState((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     // Handle the submit logic here
//   };

//   const downloadCSV = () => {
//     // Logic to download data as CSV
//   };

//   return (
//     <div className="flex items-center justify-between w-full">
//       <div className="flex flex-1 items-center gap-2 w-full justify-between">
//         {/* <Input
//           placeholder="Search for first name..."
//           value={
//             (table.getColumn("first_name")?.getFilterValue() as string) ?? ""
//           }
//           onChange={(event) =>
//             table.getColumn("first_name")?.setFilterValue(event.target.value)
//           }
//           className="h-8 w-[150px] lg:w-[250px]"
//         /> */}

//         {table.getColumn("role") && (
//           <DataTableFacetedFilter
//             column={table.getColumn("role")}
//             title="Role"
//             options={roles}
//           />
//         )}

//         {/* {isFiltered && (
//           <Button
//             variant="tertiary"
//             onClick={() => table.resetColumnFilters()}
//             size="sm"
//           >
//             <X className="mr-2 h-4 w-4" />
//             <p>Reset</p>
//           </Button>
//         )} */}
//         {/* <div className="flex gap-2">
//           {role === "admin" && (
//             <Button variant="default" size="sm" className="ml-auto" onClick={toggleModal}>
//               <div className="flex items-center gap-2">
//                 Add account
//                 <Plus className="h-4 w-4" />
//               </div>
//             </Button>
//           )}
//           <Button variant="green" size="sm" className="ml-auto" onClick={downloadCSV}>
//             <div className="flex items-center gap-2">
//               Export data to CSV
//               <Plus className="h-4 w-4" />
//             </div>
//           </Button>
//         </div> */}
//       </div>
//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 p-[20px]">
//           <div className="bg-white p-6 rounded shadow-lg w-full max-w-xs">
//             <h2 className="text-xl font-bold mb-4">Add Account</h2>
//             <form>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Email</label>
//                 {/* <Input
//                   id="email"
//                   type="email"
//                   placeholder="e.g. johndoe@email.com"
//                   name="email"
//                   className="mt-2"
//                   onChange={onInputHandleChange}
//                 /> */}
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Password</label>
//                 {/* <Input
//                   id="password"
//                   type="text"
//                   placeholder="********"
//                   name="password"
//                   className="mt-2"
//                   onChange={onInputHandleChange}
//                 /> */}
//               </div>
//               <div className="mb-4">
//                 {/* <FormsLabel text="Role" label="role" />
//                 <Select
//                   id="role"
//                   name="role"
//                   onValueChange={(value) => {
//                     onInputHandleChange({ target: { name: "role", value } });
//                   }}
//                   defaultValue={tableState?.role || ""}
//                 >
//                   <SelectTrigger className="mt-1">
//                     <SelectValue placeholder="Please select..." />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="applicant">Applicant</SelectItem>
//                     <SelectItem value="faculty">Faculty</SelectItem>
//                   </SelectContent>
//                 </Select> */}
//               </div>
//               <div className="flex justify-end">
//                 {/* <Button variant="tertiary" onClick={toggleModal}>
//                   Cancel
//                 </Button>
//                 <Button variant="default" className="ml-2" onClick={handleSubmit}>
//                   Save
//                 </Button> */}
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default DataTableToolbar;
