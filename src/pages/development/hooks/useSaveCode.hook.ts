import { useMutation } from "@tanstack/react-query";
import { developmentApi } from "../../../schema";
import { Development } from "../../../../generated-client";

export const useSaveCode = () => {
  return useMutation({
    mutationFn: async (data: Development) => {
      await developmentApi.developmentSaveCodeCreate({
        development: data,
      });
    },
  });
};
