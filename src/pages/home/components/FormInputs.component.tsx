import { Input, Select } from "antd";
import { cn } from "../../../utils/cn.util";
import {
  FormInputErrorType,
  FormProps,
} from "./profile-form/form-inputs.types";

export const FormInputs = ({
  formInputs,
  readonly,
  setFieldValue,
  errors,
}: FormProps) => {
  return (
    <div className={"flex flex-col gap-2"}>
      {formInputs.map((formInput) => (
        <div className={formInput.className}>
          <label>{formInput.label ?? ""}</label>

          {formInput.type === "select" ? (
            <Select
              placeholder={formInput.placeholder}
              value={formInput.value}
              onChange={(value) => {
                formInput.onChange(value as string);
                setFieldValue(formInput.name, value as string);
              }}
              options={formInput.options}
            />
          ) : (
            <div className="relative">
              <Input
                name={formInput.name}
                type={formInput.type ?? "text"}
                placeholder={formInput.placeholder}
                value={formInput.value}
                onChange={(event) => {
                  formInput.onChange(event.target.value);
                  setFieldValue(formInput.name, event.target.value);
                }}
                readOnly={readonly}
                onClick={() =>
                  console.log(
                    errors?.[formInput.name as keyof FormInputErrorType]
                  )
                }
                className={cn(
                  readonly &&
                    "bg-gray-100 cursor-not-allowed hover:outline-none hover:border-none opacity-70",
                  errors?.[formInput.name as keyof FormInputErrorType] &&
                    "outline-red-500 outline-1"
                )}
              />
              {errors?.[formInput.name as keyof FormInputErrorType] && (
                <div className=" text-red-500 text-sm mt-1">
                  {errors?.[formInput.name as keyof FormInputErrorType]}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
