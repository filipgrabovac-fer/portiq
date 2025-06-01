import { useMutation } from "@tanstack/react-query";
import { summaryApi } from "../../../schema";

export const usePutSummary = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    onSuccess,
    mutationKey: ["put-summary"],
    mutationFn: ({ summary }: { summary: string }) =>
      summaryApi.summaryGenerateTextUpdate({ putSummary: { summary } }),
  });
};
