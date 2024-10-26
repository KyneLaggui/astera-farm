import voucherPic from "@src/assets/images/VoucherBG.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@src/components/ui/tooltip";

const Voucher = () => {
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
                Free Shipping
              </h1>

              <p className="text-black font-spartan">
                Valid until: December 20, 2024
              </p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-[300px]">
          <p className="text-yellow">Quantity: 1</p>
          <p>
            We understand that unexpected shipping costs can be a hurdle in your
            shopping experience. By eliminating these fees, we aim to make your
            shopping experience seamless and budget-friendly.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Voucher;
