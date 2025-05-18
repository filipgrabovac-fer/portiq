import { useEffect, useState } from "react";
import { useGetUserData } from "../home/hooks/useGetUserData.hook";
import { ComponentSection } from "./components/ComponentSection.component";
import { useGetComponentData } from "./hooks/useGetComponentData.hook";
import { useGetSelectedComponents } from "./hooks/useGetSelectedComponents.hook";
import { GetSelectedComponents, UserDetails } from "../../../generated-client";
import { usePutSelectedComponents } from "./hooks/usePutSelectedComponents.hook";
import { cn } from "../../utils/cn.util";

export const ComponentMarketplace = () => {
  const { data: userData } = useGetUserData();
  const { data: componentData } = useGetComponentData();
  const { data: selectedComponentsData } = useGetSelectedComponents();
  const { mutate: putSelectedComponents } = usePutSelectedComponents();
  const [hasSelectedComponentChanged, setHasSelectedComponentChanged] =
    useState(false);

  const [selectedComponents, setSelectedComponents] = useState<
    GetSelectedComponents | undefined
  >();

  useEffect(() => {
    setSelectedComponents(selectedComponentsData);
  }, [selectedComponentsData]);

  return (
    <div className="pt-16 flex gap-4 md:mx-4 mx-0 relative">
      <div className="fixed h-16 top-0 w-full bg-white"></div>
      <button
        disabled={!hasSelectedComponentChanged}
        className={cn(
          "bg-button_blue text-white px-4 py-2 rounded-md cursor-pointer fixed top-3 right-8 md:right-14",

          !hasSelectedComponentChanged && "opacity-50 cursor-not-allowed"
        )}
        onClick={() => {
          putSelectedComponents({ data: selectedComponents ?? {} });
          setHasSelectedComponentChanged(false);
        }}
      >
        Save changes
      </button>
      <div className="flex flex-col gap-4 w-full mx-10 border border-gray-300 rounded-md p-0 md:p-4">
        {Object.entries(componentData ?? {}).map(([key, data]) => {
          return (
            <ComponentSection
              data={data}
              title={key}
              itemsToReplace={
                // @ts-ignore
                userData?.[key as keyof UserDetails]?.[0] ?? {}
              }
              selectedComponents={selectedComponents}
              setSelectedComponents={setSelectedComponents}
              setHasSelectedComponentChanged={setHasSelectedComponentChanged}
            />
          );
        })}
      </div>
    </div>
  );
};
