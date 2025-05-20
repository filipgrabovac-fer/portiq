import { useMutation } from "@tanstack/react-query";
import { githubApi } from "../../../schema";

export const useGetGithubRepo = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await githubApi.githubGithubReposRetrieve();
      return response;
    },
    mutationKey: ["get-gh-repos"],
  });
};
