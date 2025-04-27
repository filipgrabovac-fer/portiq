import { useQuery } from "@tanstack/react-query";
import { userDetailsApi } from "../../../schema";

export type UserDetailsDataType = {
  certificates: [];
  education: [];
  info: UserDetailsInfoType;
  projects: [];
  skills: [];
};

export type UserDetailsInfoType = {
  address: string;
  city: string;
  country: string;
  email: string;
  first_name: string;
  image_url: string;
  last_name: string;
  phone_number: string;
  state: string;
  zip_code: string;
};
export const useGetUserData = () => {
  return useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const response = await userDetailsApi.userDetailsUserDetailsRetrieve();
      return response;
    },
  });
};
