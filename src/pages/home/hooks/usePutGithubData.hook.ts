import { useMutation } from "@tanstack/react-query";
import { githubApi } from "../../../schema";
import { GithubResponse } from "../../../../generated-client";

export const usePutGithubData = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    onSuccess: onSuccess,
    mutationFn: async ({ username }: { username: string }) => {
      const response: GithubResponse =
        await githubApi.githubPutGithubReposCreate({
          githubRequest: { username },
        });
      return response;
    },
    mutationKey: ["get-gh-repos"],
  });
};
