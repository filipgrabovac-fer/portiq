import { useQuery } from "@tanstack/react-query";
import { profileComponentApi } from "../../../schema";

export const useGetProfileComponentCode = () => {
  return useQuery({
    queryKey: ["profile-component-code"],
    queryFn: async () => {
      const response =
        await profileComponentApi.profileComponentProfileComponentGetCodeRetrieve();

      return response;
    },
  });
};
