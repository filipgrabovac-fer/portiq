import { Input } from "antd";
import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";
import { cn } from "../../../utils/cn.util";

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
};

export const FormInputs = ({ formInputs, readonly }: FormProps) => {
  return (
    <div className={"flex flex-col gap-2"}>
      {formInputs.map((formInput) => (
        <div className={formInput.className}>
          <label>{formInput.label ?? ""}</label>
          <Input
            name={formInput.name}
            type={formInput.type ?? "text"}
            placeholder={formInput.placeholder ?? ""}
            value={formInput.value ?? ""}
            onChange={(event) => formInput.onChange(event.target.value)}
            readOnly={readonly}
            className={cn(
              readonly &&
                "bg-gray-100 cursor-not-allowed hover:outline-none hover:border-none opacity-70"
            )}
          />
        </div>
      ))}
    </div>
  );
};
