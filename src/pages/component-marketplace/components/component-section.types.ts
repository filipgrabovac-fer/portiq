import { Dispatch, SetStateAction } from "react";
import { Code, GetSelectedComponents } from "../../../../generated-client";

export enum ComponentTypeMappingEnum {
  info = "idUserInfoDevelopment",
  skills = "idSkillDevelopment",
  languages = "idLanguageDevelopment",
  projects = "idProjectDevelopment",
  certificates = "idCertificateDevelopment",
  education = "idEducationDevelopment",
  hobbies = "idHobbyDevelopment",
  other = "idOtherDevelopment",
}

export type ComponentSectionProps = {
  data: Code[];
  title: string;
  selectedComponents: GetSelectedComponents | undefined;
  setSelectedComponents: Dispatch<
    SetStateAction<GetSelectedComponents | undefined>
  >;
  itemsToReplace: { key: string; value: string | number }[];
};
