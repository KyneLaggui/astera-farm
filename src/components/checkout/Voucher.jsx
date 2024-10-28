import voucherPic from "@src/assets/images/VoucherBG.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@src/components/ui/tooltip";

const Voucher = ({ voucher }) => {
  const { name, percentage_discount,
    free_shipping, reason, total_amount_threshold,
    products_bought_threshold, expires_at } = voucher;

    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };
    

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className="relative w-full flex-grow"
            style={{ paddingBottom: "42%" }}
          >
            <div
              className="absolute inset-0 bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url(${voucherPic})`,
                backgroundSize: "cover",
              }}
            />
            <div className="absolute inset-0 flex items-center flex-col px-5 gap-1 justify-center">
              <h1 className="font-arapey text-black text-4xl font-bold ">
                {name}
              </h1>

              <p className="text-black font-spartan">
                Valid until: {formatTimestamp(expires_at)}
              </p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-[300px]">
          <p className="text-yellow">Minimum of ₱{total_amount_threshold} spent and {products_bought_threshold} number of products bought.</p>
          <p>
            {reason}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Voucher;
