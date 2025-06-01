import { useMutation } from "@tanstack/react-query";
import { userApi } from "../../../schema";
import { UserDetailsInfoType } from "./useGetUserData.hook";

export type PutUserDataProps = {
  info: UserDetailsInfoType;
};

export const usePutUserData = () => {
  return useMutation({
    mutationKey: ["putUserData"],
    mutationFn: async ({ info }: PutUserDataProps) => {
      const response = await userApi.userUpdate({
        email: info.email,
        firstName: info.first_name,
        lastName: info.last_name,
        phoneNumber: info.phone_number,
        address: info.address,
        city: info.city,
        state: info.state,
        zipCode: info.zip_code,
        country: info.country,
        githubUsername: info.github_username ?? "",
        imageUrl: info.image_url ?? "",
        idUser: -1,
      });
      return response;
    },
  });
};
