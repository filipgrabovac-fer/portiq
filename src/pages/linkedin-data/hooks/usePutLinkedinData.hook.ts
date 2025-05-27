import { useMutation } from "@tanstack/react-query";
import { linkedinApi } from "../../../schema";

export const usePutLinkedinData = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) => {
  return useMutation({
    onSuccess: onSuccess,
    mutationFn: async ({}: any) =>
      await linkedinApi.linkedinDataUpdateDetailsUpdate({
        putLinkedinData: {
          email: "filip.grabovac@netgen.io",
          firstName: "Filip",
          lastName: "Grabovac",
          phoneNumber: "0912345678",
          imageUrl: "https://via.placeholder.com/150",
        },
      }),
  });
};
