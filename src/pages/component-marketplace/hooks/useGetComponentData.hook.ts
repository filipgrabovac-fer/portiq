import { useQuery } from "@tanstack/react-query";
import { developmentApi } from "../../../schema";
import { DevelopmentCodeResponse } from "../../../../generated-client";

export const useGetComponentData = () => {
  return useQuery({
    queryKey: ["getComponentData"],
    queryFn: async () => {
      const response: DevelopmentCodeResponse =
        await developmentApi.developmentGetComponentDataRetrieve();

      return response;
    },
  });
};
