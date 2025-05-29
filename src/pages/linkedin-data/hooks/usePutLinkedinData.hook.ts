import { useMutation } from "@tanstack/react-query";
import { linkedinApi } from "../../../schema";
import { GetLinkedinData } from "../../../../generated-client";

export const usePutLinkedinData = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) => {
  return useMutation({
    onSuccess: onSuccess,
    mutationFn: async (selectedData: GetLinkedinData) =>
      await linkedinApi.linkedinDataUpdateDetailsUpdate({
        putLinkedinData: {
          email: selectedData.email,
          firstName: selectedData.givenName,
          lastName: selectedData.familyName,
          imageUrl: selectedData.picture,
        },
      }),
  });
};
