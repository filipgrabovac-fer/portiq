import { Dispatch, SetStateAction } from "react";
import { ProfileFormComponentType } from "./profile-form-component.types";

export type AddNewDataModalProps = {
  setIsAddNewDataModalOpen: Dispatch<SetStateAction<boolean>>;
  dataType: ProfileFormComponentType;
};

export const educationTypeOptions = {
  primary_school: "Primary School",
  high_school: "High School",
  faculty: "Faculty",
  course: "Course",
  workshop: "Workshop",
  other: "Other",
};

export const languageLevelOptions = [
  { label: "A1", value: "A1" },
  { label: "A2", value: "A2" },
  { label: "B1", value: "B1" },
  { label: "B2", value: "B2" },
  { label: "C1", value: "C1" },
  { label: "C2", value: "C2" },
];

export const educationLevelOptions = [
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "professional", value: "Professional" },
];
