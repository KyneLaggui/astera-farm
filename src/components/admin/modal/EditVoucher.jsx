import { useState } from "react";
import { Input } from "@src/components/ui/input";
import { Button } from "@src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@src/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@src/components/ui/select"
import { ScrollArea } from "@src/components/ui/scroll-area";
import { CircleMinus } from "lucide-react";
import { z } from "zod";
import { supabase } from "@src/supabase/config";
import { useDispatch } from "react-redux";
import { ADD_VOUCHER, UPDATE_VOUCHER } from "@src/redux/slice/vouchersSlice";
import { Textarea } from "@src/components/ui/textarea";
import { toast } from "react-toastify";
import { useEffect } from "react";

function EditVoucher({
    voucher,
    onVoucherUpdated,   
    isEditDialogOpen,
    onDialogClose,
}) {
    const [newVoucher, setNewVoucher] = useState({
        percentage_discount: voucher.percentage_discount || 0,
    });

    const [errors, setErrors] = useState({});

    const getInitialBenefit = () => {
        console.log('voucher', voucher);
        if (voucher.percentage_discount) return "Percentage Discount";
        return "Free Shipping";
    };

    const [selectedBenefit, setSelectedBenefit] = useState(getInitialBenefit());

    const dispatch = useDispatch();
    
    const onInputHandleChange = (event) => {
      const { name, type, value } = event.target;
  
      setNewVoucher((prevState) => ({
        ...prevState,
        [name]: type === "number" ? parseFloat(value) : value,
      }));
    };
  
    const voucherSchema = z.object({
        name: z.string().min(1, "Voucher name is required"),
        percentage_discount: z.number().min(0).max(100, "Must be a valid percentage").optional(),
        free_shipping: z.boolean(),
        reason: z.string().min(1, "Reason is required"),
        total_amount_threshold: z.number().min(1, "Must be a non-negative number"),
        products_bought_threshold: z.number().min(1, "Must be a non-negative number"),
        expires_at: z.string().refine((date) => new Date(date) >= new Date(), {
            message: "Expiry date cannot be in the past",
        }),
    });
  
    const handleBenefitChange = (value) => {
        setSelectedBenefit(value);
    
        // Reset other discount values when changing the selected benefit
        setNewVoucher((prevState) => ({
          ...prevState,
          percentage_discount: value === "Percentage Discount" ? prevState.percentage_discount : 0,
          free_shipping: false,
        }));
      };

    const handleSubmit = async () => {
      const validationResult = voucherSchema.safeParse({
        ...newVoucher,
        free_shipping: newVoucher.free_shipping || false,
      });
  
      if (!validationResult.success) {
        const fieldErrors = validationResult.error.formErrors.fieldErrors;
        setErrors(fieldErrors);
        toast.error("Please fill out all required fields.");
        return;
      }
  
      // Simulate database insert and Redux dispatch
      
      const updateResult = await supabase
      .from("voucher")
      .update(newVoucher)
      .eq("id", voucher.id)
      .select()
      .single();

    if (updateResult.error) {
      toast.error("Error updating voucher.");
      return null;
    } else {
        dispatch(UPDATE_VOUCHER(updateResult.data))        
        toast.success("Voucher edited successfully!");
        setErrors({});
        onDialogClose();
        }    
    };

    useEffect(() => {
        setNewVoucher({
          ...voucher,
        });
    }, [voucher])
  
    return (
      <Dialog open={isEditDialogOpen} onOpenChange={onDialogClose}>
        <DialogContent className="max-w-md p-0">
            <ScrollArea className="max-h-[80vh] w-full p-6">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>Edit Voucher</DialogTitle>
            </DialogHeader>
            <form>
              <div className="mb-4">
                <label className="block">Voucher Name</label>
                <Input
                  id="name"
                  type="text"
                  placeholder="e.g. Summer Sale"
                  name="name"
                  className="mt-2"
                  value={newVoucher.name || ""}
                  onChange={onInputHandleChange}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                )}
              </div>              
               {/* Dropdown for selecting the benefit type */}
               <div className="mb-4">
                {/* <label className="block">Select Benefit</label>
                <select
                  name="selectedBenefit"
                  value={selectedBenefit}
                  onChange={handleBenefitChange}
                  className="mt-2"
                >
                  <option value="">Choose a benefit...</option>
                  <option value="Percentage Discount">Percentage Discount</option>
                  <option value="Absolute Discount">Absolute Discount</option>
                  <option value="Free Shipping">Free Shipping</option>
                </select> */}
                <Select className="w-full" onValueChange={handleBenefitChange} value={selectedBenefit}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Type of Benefit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Benefits</SelectLabel>
                            <SelectItem value="Percentage Discount">Percentage Discount</SelectItem>
                            <SelectItem value="Free Shipping">Free Shipping</SelectItem>                       
                        </SelectGroup>
                    </SelectContent>
                </Select>
              </div>

              {/* Input fields for all benefits */}
              {
                selectedBenefit === "Percentage Discount" && (
                    <div className="mb-4">
                        <label className="block">Percentage Discount (%)</label>
                        <Input
                            id="percentage_discount"
                            type="number"
                            placeholder="e.g. 10"
                            name="percentage_discount"
                            value={newVoucher.percentage_discount || 0}
                            className="mt-2"
                            onChange={onInputHandleChange}
                            disabled={selectedBenefit !== "Percentage Discount"}

                        />
                        {errors.percentage_discount && (
                            <p className="text-red-500 text-sm mt-2">{errors.percentage_discount}</p>
                        )}
                    </div>
                )
              }          
              {
                selectedBenefit === "Free Shipping" && (
                    <div className="mb-4">
                        <label className="block">Free Shipping</label>
                        <Input
                            id="free_shipping"
                            type="checkbox"
                            name="free_shipping"
                            checked={newVoucher.free_shipping}
                            className="mt-2"
                            onChange={(e) =>
                                setNewVoucher((prevState) => ({
                                ...prevState,
                                free_shipping: e.target.checked,
                                }))
                            }
                            disabled={selectedBenefit !== "Free Shipping"}
                        />
                    </div>
                )
              }                                         
              {/* <div className="mb-4">
                <label className="block">Free Shipping</label>
                <Input
                  id="free_shipping"
                  type="checkbox"
                  name="free_shipping"
                  className="mt-2"
                  onChange={(e) =>
                    setNewVoucher((prevState) => ({
                      ...prevState,
                      free_shipping: e.target.checked,
                    }))
                  }
                />
              </div> */}
              <div className="mb-4">
                <label className="block">Reason</label>
                <Textarea
                  id="reason"
                  placeholder="Reason for the voucher"
                  name="reason"
                  className="mt-2 resize-none"
                  value={newVoucher.reason || ""}
                  onChange={onInputHandleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block">Total Amount Threshold</label>
                <Input
                  id="total_amount_threshold"
                  type="number"
                  placeholder="e.g. 100"
                  name="total_amount_threshold"
                  className="mt-2"
                  value={newVoucher.total_amount_threshold || 0}
                  onChange={onInputHandleChange}
                />
                {errors.total_amount_threshold && (
                  <p className="text-red-500 text-sm mt-2">{errors.total_amount_threshold}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block">Products Bought Threshold</label>
                <Input
                  id="products_bought_threshold"
                  type="number"
                  placeholder="e.g. 5"
                  name="products_bought_threshold"
                  className="mt-2"
                  value={newVoucher.products_bought_threshold || ""}
                  onChange={onInputHandleChange}
                />
                {errors.products_bought_threshold && (
                  <p className="text-red-500 text-sm mt-2">{errors.products_bought_threshold}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block">Expiry Date</label>
                <Input
                  id="expires_at"
                  type="date"
                  name="expires_at"
                  className="mt-2"
                  min={new Date().toISOString().split("T")[0]} // Restrict past dates
                  value={newVoucher.expires_at ? new Date(newVoucher.expires_at).toISOString().split("T")[0] : ""}
                  onChange={onInputHandleChange}
                />
                {errors.expires_at && (
                  <p className="text-red-500 text-sm mt-2">{errors.expires_at}</p>
                )}
              </div>
            </form>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                variant="default"
                className="ml-2 bg-green hover:bg-green-950"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </DialogFooter>
          </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }
  
  export default EditVoucher;
