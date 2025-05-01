import { useMutation } from "@tanstack/react-query";
import { profileComponentApi } from "../../../../../schema";
import { objectToSnake } from "ts-case-convert";

export type UsePostProfileComponentProps = {
  type: string;
  item: {
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
export const usePostProfileComponent = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) => {
  return useMutation({
    onSuccess: onSuccess,
    mutationFn: async ({ type, item }: UsePostProfileComponentProps) => {
      const response =
        await profileComponentApi.profileComponentProfileComponentCreate({
          body: JSON.stringify({
            type: type,
            item: objectToSnake(item),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

      console.log(response);
    },
  });
};
