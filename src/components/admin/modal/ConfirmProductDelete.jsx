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
  } from "@src/components/ui/alert-dialog"
import fetchProductIconPath from "@src/custom-hooks/actions/fetchProductIconPath"
import { supabase } from "@src/supabase/config"
import { useDispatch } from 'react-redux';
import { DELETE_PRODUCT } from '@src/redux/slice/productsSlice';
  
const ConfirmProductDelete = ({ product, onProductUpdated, isDeleteDialogOpen, onDialogClose }) => {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        const deleteResult = await supabase
        .from('product')
        .delete()
        .eq('id', product.id)      

        if (deleteResult.error) {
            console.log(deleteResult.error)
        } else {
            const imageUrl = await fetchProductIconPath(product.id);
            const { data, error } = await supabase
            .storage
            .from('products')
            .remove([`${imageUrl}`])

            if (error) {
                console.log(error)
            } else {
                dispatch(DELETE_PRODUCT({ id: product.id }))
                onDialogClose()
            }
        }
    }
    

  return (
    <AlertDialog open={isDeleteDialogOpen}  onOpenChange={onDialogClose}>
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
        <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default ConfirmProductDelete