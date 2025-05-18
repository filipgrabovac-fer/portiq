import { TabsProps } from "antd";

export type GroupData = {
  title: string;
  html: string;
  css: string;
  js: string;
  type: string;
};

export enum GroupType {
  PERSONAL_INFO = "personal_info",
  SKILL = "skill",
  LANGUAGE = "language",
  PROJECT = "project",
  OTHER = "other",
  CERTIFICATE = "certificate",
  EDUCATION = "education",
  HOBBY = "hobby",
}

export const initialGroupData: GroupData[] = [
  ...Object.values(GroupType).map((type) => ({
    title: "",
    html: "",
    css: "",
    js: "",
    type: type,
  })),
];

export const items: TabsProps["items"] = [
  {
    key: "0",
    label: "Personal Info",
    children: null,
  },
  {
    key: "1",
    label: "Skills",
    children: null,
  },
  {
    key: "2",
    label: "Languages",
    children: null,
  },
  {
    key: "3",
    label: "Projects",
    children: null,
  },
  {
    key: "4",
    label: "Certificates",
    children: null,
  },
  {
    key: "5",
    label: "Education",
    children: null,
  },
  {
    key: "6",
    label: "Hobbies",
    children: null,
  },
  {
    key: "7",
    label: "Other",
    children: null,
  },
];
export const componentInfo = [
  {
    label: "User Info",
    variables: [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "imageUrl",
      "address",
      "city",
      "state",
      "zipCode",
      "country",
    ],
  },
  {
    label: "Certificates",
    variables: [
      "title",
      "description",
      "startDate",
      "endDate",
      "location",
      "link",
      "createdAt",
    ],
  },
  {
    label: "Education",
    variables: [
      "title",
      "description",
      "location",
      "type",
      "startDate",
      "endDate",
      "link",
      "createdAt",
    ],
  },
  {
    label: "Skills",
    variables: [
      "title",
      "description",
      "location",
      "level",
      "link",
      "createdAt",
    ],
  },
  {
    label: "Languages",
    variables: ["title", "level"],
  },
  {
    label: "Projects",
    variables: [
      "title",
      "description",
      "startDate",
      "endDate",
      "location",
      "link",
      "createdAt",
    ],
  },
  {
    label: "Hobbies",
    variables: ["title", "description", "createdAt"],
  },
  {
    label: "Other",
    variables: [
      "title",
      "description",
      "startDate",
      "endDate",
      "location",
      "link",
      "createdAt",
    ],
  },
];
