import { useMutation, useQuery } from "@tanstack/react-query";
import { userApi, userDetailsApi } from "../../schema";

export const useGetUserJsonData = () => {
  return useMutation({
    mutationFn: async () =>
      await userDetailsApi.userDetailsExportUserDataRetrieve(),
  });
};
