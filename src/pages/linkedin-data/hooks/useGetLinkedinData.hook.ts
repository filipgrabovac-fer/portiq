import { useQuery } from "@tanstack/react-query";
// import { linkedinApi } from "../../../schema";

export const useGetLinkedinData = () => {
  return useQuery({
    queryKey: ["linkedin-data"],
    queryFn: async () =>
      //   (await linkedinApi.linkedinDataDetailsRetrieve()) ?? [],
      [],
  });
};
