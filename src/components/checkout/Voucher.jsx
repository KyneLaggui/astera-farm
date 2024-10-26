import voucherPic from "@src/assets/images/VoucherBG.png";

const Voucher = () => {
  return (
    <div className="relative w-full flex-grow" style={{ paddingBottom: "42%" }}>
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
  );
};

export default Voucher;
