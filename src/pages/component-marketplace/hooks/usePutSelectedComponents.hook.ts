import { useMutation } from "@tanstack/react-query";
import { developmentApi } from "../../../schema";
import { GetSelectedComponents } from "../../../../generated-client";

export const usePutSelectedComponents = () => {
  return useMutation({
    mutationKey: ["putSelectedComponents"],
    mutationFn: async ({ data }: { data: GetSelectedComponents }) => {
      console.log(data);
      const response =
        await developmentApi.developmentUpdateSelectedComponentsCreate({
          getSelectedComponents: data,
        });
      return response;
    },
  });
};
