import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";
import * as yup from "yup";

export type FormProps = {
  formInputs: FormInputProps[];
  readonly?: boolean;
  setFieldValue: (field: string, value: string) => void;
  errors?: FormInputErrorType;
};

export type FormInputProps = {
  label?: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string;
  onChange: Dispatch<SetStateAction<string | undefined>>;
  props?: Record<string, unknown>;
  inputWrapperClass?: string;
  readonly?: boolean;
  className?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
};

export type FormInputErrorType = {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  link?: string;
  level?: string;
  type?: string;
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  github_username?: string;
  image?: string;
};

export const PersonalInfoFormProps = {
  name: yup.string().required("This field is required"),
  surname: yup.string().required("This field is required"),
  email: yup.string().email().required("This field is required"),
  phone: yup.string().required("This field is required"),
  address: yup.string().required("This field is required"),
  city: yup.string().required("This field is required"),
  state: yup.string().required("This field is required"),
  zip_code: yup.string().required("This field is required"),
  country: yup.string().required("This field is required"),
  github_username: yup.string().nullable(),
  image: yup.mixed(),
};
