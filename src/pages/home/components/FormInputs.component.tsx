import { Input, Select } from "antd";
import { cn } from "../../../utils/cn.util";
import { FormProps } from "./profile-form/form-inputs.types";

export const FormInputs = ({ formInputs, readonly }: FormProps) => {
  return (
    <div className={"flex flex-col gap-2"}>
      {formInputs.map((formInput) => (
        <div className={formInput.className}>
          <label>{formInput.label ?? ""}</label>

          {formInput.type === "select" ? (
            <Select
              placeholder={formInput.placeholder}
              value={formInput.value}
              onChange={(value) => formInput.onChange(value as string)}
              options={formInput.options}
            />
          ) : (
            <Input
              name={formInput.name}
              type={formInput.type ?? "text"}
              placeholder={formInput.placeholder}
              value={formInput.value}
              onChange={(event) => formInput.onChange(event.target.value)}
              readOnly={readonly}
              className={cn(
                readonly &&
                  "bg-gray-100 cursor-not-allowed hover:outline-none hover:border-none opacity-70"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};
