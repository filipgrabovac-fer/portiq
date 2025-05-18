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
    <div className="relative group  cursor-pointer" onClick={setAction}>
      <Icon className="w-8 h-8 bg-button_blue rounded-md p-1 text-white cursor-pointer" />
      <p className="absolute left-1/2 -translate-x-1/2 group-hover:opacity-100 opacity-0 transition-all duration-300 text-button_blue">
        {text}
      </p>
    </div>
  );
};
