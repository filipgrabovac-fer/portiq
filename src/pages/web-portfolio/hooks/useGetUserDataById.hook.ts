import { useQuery } from "@tanstack/react-query";
import { userDetailsApi } from "../../../schema";

export const useGetUserDataById = ({ userId }: { userId: number }) => {
  return useQuery({
    queryKey: ["getUserDataById"],
    queryFn: async () => {
      const response = await userDetailsApi.userDetailsUserDetailsRetrieve({
        userId: userId.toString(),
      });
      return response;
    },
  });
};
