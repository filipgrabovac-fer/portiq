import { useMutation } from "@tanstack/react-query";
import { githubApi } from "../../../schema";

export const useDeleteGithubData = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) => {
  return useMutation({
    mutationFn: async () => await githubApi.githubDeleteGithubDataDestroy(),
    onSuccess: onSuccess,
  });
};
