export type ProfileFormComponentItemType = {
  id?: string;
  title: string;
  description: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  link?: string;
  createdAt?: string;
  level?: string;
  type?: string;
};

export const profileFormInputsByCategory = {
  certificates: [
    "title",
    "description",
    "startDate",
    "endDate",
    "location",
    "link",
  ],
  education: [
    "title",
    "description",
    "location",
    "type",
    "startDate",
    "endDate",
    "link",
  ],
  skills: ["title", "description", "location", "level", "link"],
  projects: ["title", "description", "startDate", "endDate", "location"],
  languages: ["title", "level"],
  other: ["title", "description", "startDate", "endDate", "location", "link"],
  hobbies: ["title", "description"],
  workExperiences: ["title", "description", "startDate", "endDate", "location"],
  references: ["title", "description", "link"],
  githubData: [
    "avatarUrl",
    "followers",
    "following",
    "publicRepos",
    "githubUrl",
  ],
};

export type ProfileFormComponentType =
  | "certificates"
  | "education"
  | "skills"
  | "projects"
  | "languages"
  | "hobbies"
  | "other"
  | "workExperiences"
  | "references"
  | "githubData";

export const ProfileFormComponentTitle = {
  certificates: "Certificates",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  languages: "Languages",
  hobbies: "Hobbies",
  other: "Other",
  workExperiences: "Work Experiences",
  references: "References",
  githubData: "Github Data",
};

export type ProfileFormHookDataProps = {
  id: string;
  item: ProfileFormComponentItemType;
  type: ProfileFormComponentType;
};

export type ProfileFormComponentProps = {
  item: ProfileFormComponentItemType;
  profileFormComponentType: ProfileFormComponentType;
};
