import { UserDetails } from "../../../../generated-client";

export const formatUserInfoToPropmt = ({
  userData,
}: {
  userData: UserDetails;
}) => {
  let prompt = "";
  Object.entries(userData).forEach(([key, value]) => {
    value?.forEach((val_item: any) => {
      prompt += formatDataToString({ data: val_item });
    });
  });

  return prompt;
};

const formatDataToString = ({ data }: { data: Record<string, string> }) => {
  return Object.entries(data)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
};
