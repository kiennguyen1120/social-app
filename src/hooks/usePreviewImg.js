import { useState } from "react";
import { useToast } from "./use-toast";

const usePreviewImg = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { toast } = useToast();

  const maxFileSizeInBytes = 2 * 1024 * 1024; // 2MB

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]; // Optional chaining to safely access file
    if (!file) return; // No file selected

    if (!file.type.startsWith("image/")) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please select an image file",
      });
      setSelectedFile(null);
      return;
    }

    if (file.size > maxFileSizeInBytes) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "File size must be less than 2MB",
      });
      setSelectedFile(null);
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };

    reader.onerror = () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was an error reading the file",
      });
      setSelectedFile(null);
    };

    reader.readAsDataURL(file);
  };

  return { selectedFile, handleImageChange, setSelectedFile };
};

export default usePreviewImg;
