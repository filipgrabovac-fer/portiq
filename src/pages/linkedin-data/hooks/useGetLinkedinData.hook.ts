import { useQuery } from "@tanstack/react-query";
import { linkedinApi } from "../../../schema";
import { GetLinkedinData } from "../../../../generated-client";

export const useGetLinkedinData = () => {
  return useQuery({
    queryKey: ["linkedin-data"],
    queryFn: async () => {
      const response: GetLinkedinData =
        (await linkedinApi.linkedinDataDetailsRetrieve()) ?? [];
      console.log(response);
      return response;
    },
  });
};
