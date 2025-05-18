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
