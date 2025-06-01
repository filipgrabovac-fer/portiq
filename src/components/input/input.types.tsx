export type InputProps = {
  inputWrapperClass?: string;
  rows?: number;
  readonly?: boolean;
  name: string;
  label?: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  props?: Record<string, unknown>;
};
