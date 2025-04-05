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
};

export const FormInputs = ({ formInputs, readonly }: FormProps) => {
  return (
    <div className={"flex flex-col gap-10"}>
      {formInputs.map((formInput) => (
        <div
          className={cn(
            "relative",
            formInput.inputWrapperClass,
            readonly && "opacity-50"
          )}
        >
          <label
            htmlFor={formInput.name}
            className="absolute top-[-1.5rem] left-2"
          >
            {formInput.label}
          </label>
          <input
            type={formInput.type}
            placeholder={formInput.placeholder}
            value={formInput.value}
            onChange={(value) => formInput.onChange(value.target.value)}
            className={cn(
              "w-full bg-white rounded-md p-2 px-3 text-base border border-gray-300"
            )}
            disabled={readonly}
            name={formInput.name}
            {...formInput?.props}
          />
        </div>
      ))}
    </div>
  );
};
