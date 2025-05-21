import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../../schema";

export const useGetGithubData = () => {
  return useQuery({
    queryFn: async () => {
      const response = await githubApi.githubGetGithubDataRetrieve();
      return response;
    },
    queryKey: ["get-github-data"],
  });
};
