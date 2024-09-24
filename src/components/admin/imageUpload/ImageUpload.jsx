import { useState, useEffect } from "react";
import { supabase } from "@src/supabase/config"; // Adjust import path as needed
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import { Button } from "@src/components/ui/button";
import { CircleMinus, X } from "lucide-react";

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [slotCount, setSlotCount] = useState(5); // Initial slot count

  const fetchImages = async () => {
    setIsLoading(true);
    const imageUrls = await Promise.all(
      Array.from({ length: slotCount }, async (_, index) => {
        const { data, error } = await supabase.storage
          .from("slideshow")
          .list("public", {
            limit: 1000,
          });

        if (error) {
          console.error(
            `Error fetching image for slot ${index + 1}:`,
            error.message
          );
          return null;
        }

        const matchingFile = data.find((file) =>
          file.name.startsWith(`slot-${index + 1}`)
        );
        if (matchingFile) {
          const { data: urlData } = await supabase.storage
            .from("slideshow")
            .getPublicUrl(`public/${matchingFile.name}`);
          return `${urlData.publicUrl}?t=${new Date().toISOString()}`;
        }

        return null;
      })
    );

    setImages(imageUrls);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, [slotCount]);

  const handleUpload = async (event, index) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    const fileExtension = file.name.split(".").pop();
    const fileName = `slot-${index + 1}.${fileExtension}`;

    const { data: existingFiles, error: listError } = await supabase.storage
      .from("slideshow")
      .list("public");

    if (listError) {
      console.error(
        `Error checking existing image for slot ${index + 1}:`,
        listError.message
      );
      setIsLoading(false);
      return;
    }

    const existingFile = existingFiles.find((file) =>
      file.name.startsWith(`slot-${index + 1}`)
    );
    if (existingFile) {
      const { error: deleteError } = await supabase.storage
        .from("slideshow")
        .remove([`public/${existingFile.name}`]);

      if (deleteError) {
        console.error(
          `Error deleting existing image for slot ${index + 1}:`,
          deleteError.message
        );
        setIsLoading(false);
        return;
      }
    }

    const { error: uploadError } = await supabase.storage
      .from("slideshow")
      .upload(`public/${fileName}`, file);

    if (uploadError) {
      console.error(
        `Error uploading image for slot ${index + 1}:`,
        uploadError.message
      );
    } else {
      const { data: newUrlData } = await supabase.storage
        .from("slideshow")
        .getPublicUrl(`public/${fileName}`);

      const timestampedUrl = `${
        newUrlData.publicUrl
      }?t=${new Date().toISOString()}`;

      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index] = timestampedUrl;
        return updatedImages;
      });
    }

    setIsLoading(false);
  };

  const addSlot = () => {
    setSlotCount((prevCount) => prevCount + 1);
    setImages((prevImages) => [...prevImages, null]);
  };

  const deleteSlot = async (index) => {
    const fileName = `slot-${index + 1}`;
    const { data: existingFiles, error: listError } = await supabase.storage
      .from("slideshow")
      .list("public");

    if (listError) {
      console.error(
        `Error checking existing image for slot ${index + 1}:`,
        listError.message
      );
      return;
    }

    const existingFile = existingFiles.find((file) =>
      file.name.startsWith(fileName)
    );
    if (existingFile) {
      const { error: deleteError } = await supabase.storage
        .from("slideshow")
        .remove([`public/${existingFile.name}`]);

      if (deleteError) {
        console.error(
          `Error deleting existing image for slot ${index + 1}:`,
          deleteError.message
        );
        return;
      }
    }

    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      return updatedImages;
    });
    setSlotCount((prevCount) => prevCount - 1);
  };

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
        <CardContent className="flex flex-wrap gap-4">
          {Array.from({ length: slotCount }).map((_, index) => (
            <div key={index} className="relative w-40 h-40 border rounded">
              <div className="relative w-40 h-40 border rounded">
                {images[index] ? (
                  <>
                    <img
                      src={images[index]}
                      alt={`Slot ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                    <CircleMinus
                      onClick={() => deleteSlot(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full z-20"
                    />
                    {/* <button
                      onClick={() => deleteSlot(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 z-20 w-7 text-sm" // Added z-index
                    >
                      <X />
                    </button> */}
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(event) => handleUpload(event, index)}
                      style={{ zIndex: 10 }} // Set a lower z-index
                    />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(event) => handleUpload(event, index)}
              />
            </div>
          ))}
          <div
            onClick={addSlot}
            className="w-40 h-40 border rounded flex items-center justify-center cursor-pointer hover:bg-yellow group"
            style={{ position: "relative" }}
          >
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
