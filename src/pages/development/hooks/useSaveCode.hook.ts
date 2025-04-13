import { useMutation } from "@tanstack/react-query";
import { developmentApi } from "../../../schema";
import { Development, Json } from "../../../../generated-client";

export const useSaveCode = () => {
  return useMutation({
    mutationFn: async (data: Development) => {
      console.log(data);
      const asd = await developmentApi.developmentSaveCodeCreate({
        development: data,
      });

      console.log(asd);
    },
  });
};
