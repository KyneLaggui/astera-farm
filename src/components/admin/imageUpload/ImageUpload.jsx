import { useState, useEffect } from "react";
import { supabase } from "@src/supabase/config"; // Adjust import path as needed
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import { CircleMinus } from "lucide-react";
import ConfirmSlideDelete from "@src/components/admin/modal/ConfirmSlideDelete"; // Adjust import path as needed

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);


  const fetchImages = async () => {
    setIsLoading(true);
    
    // Fetch all images from the "slideshow/public" folder
    const { data: files, error } = await supabase.storage
      .from("slideshow")
      .list("public");


    if (error) {
      console.error("Error fetching images:", error.message);
      setIsLoading(false);
      return;
    }

    // Map through the files and get their public URLs
    const imageUrls = await Promise.all(
      files.map(async (file) => {
        const { data: urlData } = await supabase.storage
          .from("slideshow")
          .getPublicUrl(`public/${file.name}`);

        return `${urlData.publicUrl}?t=${new Date().toISOString()}`;
      })
    );

    setImages(imageUrls.slice(1));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    const fileExtension = file.name.split(".").pop();
    const fileName = `image-${new Date().getTime()}.${fileExtension}`;

    const { error: uploadError } = await supabase.storage
      .from("slideshow")
      .upload(`public/${fileName}`, file);

    if (uploadError) {
      console.error("Error uploading image:", uploadError.message);
      setIsLoading(false);
      return;
    }

    // Fetch new URL for uploaded image
    const { data: newUrlData } = await supabase.storage
      .from("slideshow")
      .getPublicUrl(`public/${fileName}`);

    const timestampedUrl = `${newUrlData.publicUrl}?t=${new Date().toISOString()}`;

    setImages((prevImages) => [...prevImages, timestampedUrl]);

    setIsLoading(false);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  // const deleteSlot = async (index) => {
  //   const fileUrl = images[index];
  //   const fileName = fileUrl.split('/').pop().split('?')[0]; // Extract file name from the URL

  //   const { error: deleteError } = await supabase.storage
  //     .from("slideshow")
  //     .remove([`public/${fileName}`]);

  //   if (deleteError) {
  //     console.error("Error deleting image:", deleteError.message);
  //     return;
  //   }

  //   setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  // };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Slideshow</CardTitle>
        <CardDescription>
          Showcase stunning images on the Astera Farm e-commerce landing page.
        </CardDescription>
      </CardHeader>
      {isLoading ? (
        <div className="text-center m-2">Loading...</div>
      ) : (
        <CardContent className="flex flex-wrap justify-center gap-4">
          {images.map((imageUrl, index) => (
            <div
              key={index}
              className="relative w-full sm:w-40 h-40 border rounded"
            >
              {imageUrl ? (
                <>
                  <img
                    src={imageUrl}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                  <CircleMinus
                    onClick={() => {
                      setDeleteIndex(index);
                      setIsDeleteDialogOpen(true);
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full z-20 cursor-pointer"
                  />
                 <ConfirmSlideDelete 
                  slotIndex={deleteIndex}
                  setImages={setImages}
                  images={images}
                  isDeleteDialogOpen={isDeleteDialogOpen}
                  onDialogClose={handleDeleteDialogClose}
                />

                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}             
            </div>
          ))}
          <div
            className="sm:w-40 h-40 border rounded flex items-center justify-center cursor-pointer w-full hover:bg-yellow group"
            style={{ position: "relative" }}
          >
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleUpload}
            />
            <span className="text-2xl font-bold text-yellow group-hover:text-white">
              +
            </span>
            <span className="sr-only">Add Slot</span>
          </div>
         
        </CardContent>
      )}
    </Card>
  );
};

export default ImageUpload;
