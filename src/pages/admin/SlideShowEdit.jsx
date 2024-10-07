import ImageUpload from "@src/components/admin/imageUpload/ImageUpload";
import LoggedInOnly from "@src/layouts/LoggedInOnly";

const SlideShowEdit = () => {
  return (
    <LoggedInOnly forAdmin={true} forUser={false}>
      <div className="navbar-spacing flex flex-col items-center justify-center gap-4 sm:gap-8 max-w-6xl mx-auto">
        <h1 className="font-gothic text-7xl sm:text-9xl text-center tracking-wide">
          Slideshow 
        </h1>
        <ImageUpload />
      </div>
    </LoggedInOnly>
  );
};

export default SlideShowEdit;
