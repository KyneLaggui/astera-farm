import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@src/components/ui/alert-dialog";
  import { supabase } from "@src/supabase/config";
  import { useState } from "react";
  import { toast } from "react-toastify";
  
  const ConfirmSlideDelete = ({
    slotIndex,
    images,
    setImages,
    isDeleteDialogOpen,
    onDialogClose,
  }) => {
    const [isDeleting, setIsDeleting] = useState(false); // Add a state for disabling the button
  
    const handleDelete = async (index) => {
      setIsDeleting(true); // Disable the button once clicked
  
      const fileUrl = images[index];
      const fileName = fileUrl.split("/").pop().split("?")[0]; // Extract file name from the URL
  
      const { error: deleteError } = await supabase.storage
        .from("slideshow")
        .remove([`public/${fileName}`]);
  
      if (deleteError) {
        toast.error("Error deleting slide!");
        setIsDeleting(false); // Re-enable the button if there's an error
        return;
      } else {
        toast.success("Slide deleted successfully!");
      }
  
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
      setIsDeleting(false); // Re-enable the button after successful deletion
      onDialogClose(); // Close the dialog after deletion
    };
  
    return (
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={onDialogClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              <h1>{slotIndex}</h1>
              This action cannot be undone. This will permanently delete your
              slide image and remove data from the servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onDialogClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(slotIndex)}
              disabled={isDeleting} // Disable the button while deleting
            >
              {isDeleting ? "Deleting..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  
  export default ConfirmSlideDelete;
  