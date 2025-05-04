import { useQuery } from "@tanstack/react-query";
import { developmentApi } from "../../../schema";

export const useGetSelectedComponents = () => {
  return useQuery({
    queryKey: ["getSelectedComponents"],
    queryFn: async () => {
      const response =
        await developmentApi.developmentGetSelectedComponentsRetrieve();
      return response;
    },
  });
};
