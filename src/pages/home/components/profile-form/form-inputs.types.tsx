import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";

export type FormProps = {
  formInputs: FormInputProps[];
  readonly?: boolean;
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
};
