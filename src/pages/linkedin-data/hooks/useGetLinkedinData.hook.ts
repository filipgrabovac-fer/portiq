import { useQuery } from "@tanstack/react-query";
// import { linkedinApi } from "../../../schema";

export const useGetLinkedinData = () => {
  return useQuery({
    queryKey: ["linkedin-data"],
    queryFn: async () =>
      //   (await linkedinApi.linkedinDataDetailsRetrieve()) ?? [],
      mockLinkedinData,
  });
};

export const mockLinkedinData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "1234567890",
  address: "123 Main St, Anytown, USA",
};
