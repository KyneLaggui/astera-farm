import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@src/components/ui/alert-dialog";
import fetchProductIconPath from "@src/custom-hooks/actions/fetchProductIconPath";
import { supabase } from "@src/supabase/config";
import { useDispatch } from "react-redux";
import { DELETE_PRODUCT } from "@src/redux/slice/productsSlice";
import { toast } from "react-toastify";

const ConfirmProductDelete = ({
  product,
  isDeleteDialogOpen,
  onDialogClose,
}) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const deleteResult = await supabase
      .from("product")
      .delete()
      .eq("id", product.id);

    if (deleteResult.error) {
      toast.error("Product deletion failed");
    } else {
      const imageUrl = await fetchProductIconPath(product.id);
      const { data, error } = await supabase.storage
        .from("products")
        .remove([`${imageUrl}`]);

      if (error) {
        console.log(error);
      } else {
        dispatch(DELETE_PRODUCT({ id: product.id }));
        toast.success("Product deleted successfully!");
        onDialogClose();
      }
    }
  };

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={onDialogClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            product listing and remove data from the servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onDialogClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-green hover:bg-green-950"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmProductDelete;
