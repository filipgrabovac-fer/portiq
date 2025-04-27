import { cn } from "../../utils/cn.util";

export type AddNewDataButtonProps = {
  onClick: () => void;
};

export const AddNewDataButton = ({
  onClick,
  title,
  ...props
}: AddNewDataButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={cn(
        "text-button_blue rounded-b-md w-full hover:opacity-90  duration-100 cursor-pointer  hover:scale-105 ",
        props.className
      )}
      onClick={onClick}
    >
      + Add {title}
    </button>
  );
};
