import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";

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
};
