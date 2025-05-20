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
  references = "idReferenceDevelopment",
  workExperiences = "idWorkExperienceDevelopment",
  githubData = "idGithubDataDevelopment",
}
export enum ComponentTitleMappingEnum {
  info = "Personal Information",
  skills = "Skills",
  languages = "Languages",
  projects = "Projects",
  certificates = "Certificates",
  education = "Education",
  hobbies = "Hobbies",
  other = "Other",
  references = "References",
  workExperiences = "Work Experiences",
  githubData = "Github Data",
}

export type ComponentSectionProps = {
  data: Code[];
  title: string;
  selectedComponents: GetSelectedComponents | undefined;
  setSelectedComponents: Dispatch<
    SetStateAction<GetSelectedComponents | undefined>
  >;
  setHasSelectedComponentChanged: Dispatch<SetStateAction<boolean>>;
  itemsToReplace: { key: string; value: string | number }[];
};
