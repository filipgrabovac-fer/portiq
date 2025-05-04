import { useQuery } from "@tanstack/react-query";
import { userApi } from "../../../schema";
import { User } from "../../../../generated-client";

export const useGetUserId = () => {
  return useQuery({
    queryKey: ["user-id"],
    queryFn: async () => {
      const response: User = await userApi.userUserIdRetrieve();
      return response.idUser;
    },
  });
};
