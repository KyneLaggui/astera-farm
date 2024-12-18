import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@src/components/ui/dropdown-menu";

const OrderStatusDropdownMenu = ({ status, handleStatusChange }) => {
  const getRowColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "bg-red";
      case "Processing":
        return "bg-orange";
      case "Shipped":
        return "bg-yellow";
      case "Delivered":
        return "bg-green-500";
      default:
        break;
    }
  }

  return (
    <DropdownMenu>
        <DropdownMenuTrigger className={`px-4 py-2 border rounded-md cursor-pointer ${getRowColor(status)} text-gray-900`}>
        {status}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-0">
        {["Order Placed", "Processing", "Shipped", "Delivered"].map(
            (statusOption) => (
            <DropdownMenuItem
                key={statusOption}
                onClick={() => handleStatusChange(statusOption)}
                className={`${getRowColor(statusOption)} rounded-none text-gray-900`}
            >
                {statusOption}
            </DropdownMenuItem>
            )
        )}
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default OrderStatusDropdownMenu