import { useMutation } from "@tanstack/react-query";
import { developmentApi } from "../../../schema";
import { Development } from "../../../../generated-client";

export type UsePostProfileComponentCodeProps = {
  onSuccess:
    | ((
        data: void,
        variables: Development,
        context: unknown
      ) => Promise<unknown> | unknown)
    | undefined;
};
export const usePostProfileComponentCode = ({
  onSuccess,
}: UsePostProfileComponentCodeProps) => {
  return useMutation({
    onSuccess: onSuccess,
    mutationFn: async (data: Development) => {
      await developmentApi.developmentSaveCodeCreate({
        development: data,
      });
    },
  });
};
