import { useMutation } from "@tanstack/react-query";
import { profileComponentApi } from "../../schema";
export type UseDeleteProfileComponentProps = {
  onSuccess?: (() => Promise<unknown> | unknown) | undefined;
};

export const useDeleteProfileComponent = ({
  onSuccess,
}: UseDeleteProfileComponentProps) => {
  return useMutation({
    mutationKey: ["deleteProfileComponent"],
    onSuccess: onSuccess,
    mutationFn: async ({ id, type }: { id: number; type: string }) => {
      const response =
        await profileComponentApi.profileComponentProfileComponentDeleteCreate({
          body: JSON.stringify({ id, type }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      return response;
    },
  });
};
