import { useMutation } from "@tanstack/react-query";
import { profileComponentApi } from "../../schema";

export type UsePutProfileComponentProps = {
  onSuccess?: (() => Promise<unknown> | unknown) | undefined;
};

export const usePutProfileComponent = ({
  onSuccess,
}: UsePutProfileComponentProps) => {
  return useMutation({
    mutationKey: ["putProfileComponent"],
    onSuccess: onSuccess,
    mutationFn: async ({ id, type }: { id: number; type: string }) => {
      const response =
        await profileComponentApi.profileComponentProfileComponentUpdateCreate({
          body: JSON.stringify({ id, type }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      return response;
    },
  });
};
