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
  const excludedTypes = ["select", "file"];
  return (
    <div className={"flex flex-col gap-2"}>
      {formInputs.map((formInput) => (
        <div className={formInput.className}>
          {formInput.type === "select" && (
            <>
              <label>{formInput.label ?? ""}</label>
              <Select
                placeholder={formInput.placeholder}
                value={formInput.value}
                onChange={(value) => {
                  formInput.onChange(value as string);
                  setFieldValue(formInput.name, value as string);
                }}
                options={formInput.options}
              />
            </>
          )}
          {formInput.type === "file" && (
            <>
              <p className="mb-2">{formInput.label ?? ""}</p>
              <label
                htmlFor={formInput.name}
                className={cn(
                  "cursor-pointer bg-button_blue hover:bg-button_blue/80 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-300 w-max text-xs",
                  errors?.[formInput.name as keyof FormInputErrorType] &&
                    "outline-red-500 outline-1",
                  readonly &&
                    "cursor-not-allowed pointer-events-none opacity-50"
                )}
              >
                {formInput?.value?.name ?? "Upload"}
              </label>

              <input
                id={formInput.name}
                name={formInput.name}
                type="file"
                onChange={(event) => {
                  formInput.onChange(event?.target.files?.[0]);
                  setFieldValue(formInput.name, event.target.files?.[0]);
                }}
                readOnly={readonly}
                className={cn("hidden")}
              />
              {errors?.[formInput.name as keyof FormInputErrorType] && (
                <div className=" text-red-500 text-sm mt-1">
                  {errors?.[formInput.name as keyof FormInputErrorType]}
                </div>
              )}
            </>
          )}

          {!excludedTypes.includes(formInput.type ?? "") && (
            <>
              <label>{formInput.label ?? ""}</label>

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
            </>
          )}
        </div>
      ))}
    </div>
  );
};
