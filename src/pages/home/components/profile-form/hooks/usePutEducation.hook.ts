import { useMutation } from "@tanstack/react-query";
import { Education } from "../../../../../../generated-client";
import { educationApi } from "../../../../../schema";

export const usePutEducation = () => {
  return useMutation({
    mutationFn: async ({ education }: { education: Education }) => {
      const response = await educationApi.educationUpdate({
        idEducation: education.idEducation,
        education: education,
      });
    },
  });
};
