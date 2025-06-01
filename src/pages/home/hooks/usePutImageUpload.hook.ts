import { useMutation } from "@tanstack/react-query";
import { imageUploadApi } from "../../../schema";

export const usePutImageUpload = ({
  onSuccess,
}: {
  onSuccess: (data: any) => void;
}) => {
  return useMutation({
    onSuccess,
    mutationKey: ["uploadImage"],
    mutationFn: async (image: File) => {
      const formData = new FormData();
      formData.append("image", image);

      const response = await imageUploadApi.imageUploadUploadImageCreate({
        body: formData,
      });
      return response;
    },
  });
};
