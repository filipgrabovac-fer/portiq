import {
  BlendIcon,
  BookIcon,
  BriefcaseIcon,
  FileIcon,
  GithubIcon,
  HeartHandshakeIcon,
  LanguagesIcon,
  Lightbulb,
  LinkIcon,
  UsersIcon,
} from "lucide-react";

export const sectionIcons = {
  certificates: () => FileIcon,
  education: () => BookIcon,
  skills: () => Lightbulb,
  projects: () => UsersIcon,
  languages: () => LanguagesIcon,
  hobbies: () => HeartHandshakeIcon,
  workExperiences: () => BriefcaseIcon,
  references: () => LinkIcon,
  githubData: () => GithubIcon,
  other: () => BlendIcon,
};
