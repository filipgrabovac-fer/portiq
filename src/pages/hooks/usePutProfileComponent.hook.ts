import { useMutation } from "@tanstack/react-query";
import { profileComponentApi } from "../../schema";
import { objectToSnake } from "ts-case-convert";

export type UsePutProfileComponentProps = {
  type: string;
  item: {
    id?: number;
    title?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    location?: string;
    link?: string;
    level?: string;
    type?: string;
  };
};

export const usePutProfileComponent = ({
  onSuccess,
}: {
  onSuccess?: (() => Promise<unknown> | unknown) | undefined;
}) => {
  return useMutation({
    mutationKey: ["putProfileComponent"],
    onSuccess: onSuccess,
    mutationFn: async ({ type, item }: UsePutProfileComponentProps) => {
      const response =
        await profileComponentApi.profileComponentProfileComponentUpdateCreate({
          body: JSON.stringify({ type, item: objectToSnake(item) }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      return response;
    },
  });
};
