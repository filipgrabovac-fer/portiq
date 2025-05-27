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
};

export const PersonalInfoFormProps = {
  name: yup.string().nullable(),
  surname: yup.string().nullable(),
  email: yup.string().nullable(),
  phone: yup.string().nullable(),
  address: yup.string().nullable(),
  city: yup.string().nullable(),
  state: yup.string().nullable(),
  zip_code: yup.string().nullable(),
  country: yup.string().nullable(),
  github_username: yup.string().nullable(),
};
