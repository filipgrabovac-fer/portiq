import { useQuery } from "@tanstack/react-query";
import { userDetailsApi } from "../schema";

export const useGetUserLoggedIn = () => {
  return useQuery({
    queryFn: getUserLoggedIn,
    queryKey: ["user-logged-in"],
  });
};

export const getUserLoggedIn = async () => {
  const response = await userDetailsApi.userDetailsUserLoggedInRetrieve();
  return response;
};
