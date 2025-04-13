import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";
import { cn } from "../../../utils/cn.util";
import { Input } from "../../../components/input/Input.component";

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
};

export const FormInputs = ({ formInputs, readonly }: FormProps) => {
  return (
    <div className={"flex flex-col gap-10"}>
      {formInputs.map((formInput) => (
        <Input
          label={formInput.label ?? ""}
          name={formInput.name}
          type={formInput.type ?? "text"}
          placeholder={formInput.placeholder ?? ""}
          value={formInput.value ?? ""}
          onChange={formInput.onChange}
          readonly={readonly}
        />
      ))}
    </div>
  );
};
