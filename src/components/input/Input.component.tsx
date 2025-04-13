import { cn } from "../../utils/cn.util";

type InputProps = {
  inputWrapperClass?: string;
  readonly?: boolean;
  name: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  props?: Record<string, unknown>;
};

export const Input = ({
  inputWrapperClass,
  readonly,
  name,
  label,
  type,
  placeholder,
  value,
  onChange,
  props,
}: InputProps) => {
  return (
    <div
      className={cn("relative", inputWrapperClass, readonly && "opacity-50")}
    >
      <label htmlFor={name} className="absolute top-[-1.5rem] left-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(value) => onChange(value.target.value)}
        className={cn(
          "w-full bg-white rounded-md p-2 px-3 text-base border border-gray-300"
        )}
        disabled={readonly}
        name={name}
        {...props}
      />
    </div>
  );
};
