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

const ConfirmProductDelete = ({ product, onProductUpdated, isDeleteDialogOpen, onDialogClose }) => {
  return (
    <AlertDialog open={isDeleteDialogOpen}  onOpenChange={onDialogClose}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onDialogClose}>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onProductUpdated}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default ConfirmProductDelete