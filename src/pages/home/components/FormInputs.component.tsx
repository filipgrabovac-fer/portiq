import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";
import { cn } from "../../../utils/cn.util";

export type FormProps = {
  formInputs: {
    label?: string;
    name: string;
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
    value?: string;
    onChange: Dispatch<SetStateAction<string | number>>;
    props?: Record<string, unknown>;
  }[];
};
export const Form = ({ formInputs }: FormProps) => {
  return (
    <div>
      <div className="flex flex-col gap-10">
        {formInputs.map((formInput) => (
          <div className="relative w-full">
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
                "w-full bg-white rounded-md p-3 text-base border border-gray-300"
              )}
              name={formInput.name}
              {...formInput?.props}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
