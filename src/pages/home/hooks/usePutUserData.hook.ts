import { useMutation, useQuery } from "@tanstack/react-query";
import { userApi, userDetailsApi } from "../../../schema";
import { UserDetailsInfoType } from "./useGetUserData.hook";
import { objectToCamel } from "ts-case-convert";

export type PutUserDataProps = {
  info: UserDetailsInfoType;
};

export const usePutUserData = () => {
  return useMutation({
    mutationKey: ["putUserData"],
    mutationFn: async ({ info }: PutUserDataProps) => {
      const response = await userApi.userUpdate({
        putUserData: objectToCamel(info),
        idUser: -1,
      });
      return response;
    },
  });
};
