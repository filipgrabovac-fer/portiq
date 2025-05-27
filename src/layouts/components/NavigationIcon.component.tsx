import { LucideProps } from "lucide-react";

export type NavigationIconProps = {
  setAction: () => void;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
};

export const NavigationIcon = ({
  setAction,
  Icon,
  text,
}: NavigationIconProps) => {
  return (
    <div
      className="flex flex-col gap-1 justify-center items-center group  cursor-pointer w-[calc(50%-0.5rem)] bg-white rounded-md p-1 hover:bg-button_blue/20 transition-all duration-300"
      onClick={setAction}
    >
      <Icon className="w-8 h-8 rounded-md p-1 text-button_blue cursor-pointer" />
      <p className="text-button_blue">{text}</p>
    </div>
  );
};
