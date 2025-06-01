import { useMutation } from "@tanstack/react-query";
import { vertexAiApi } from "../../../../../schema";

export const usePostGenerateSummary = ({
  setSummary,
}: {
  setSummary: (data: string) => void;
}) => {
  return useMutation({
    mutationKey: ["generate-summary"],
    onSuccess: (data) => {
      setSummary(data.generatedText);
    },
    mutationFn: async ({ summary }: { summary: string }) => {
      const response = await vertexAiApi.vertexAiGenerateTextCreate({
        postVertexAiGenerateText: {
          prompt: summary,
        },
      });

      return response;
    },
  });
};
