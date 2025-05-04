import { useEffect, useState } from "react";
import { useGetUserData } from "../home/hooks/useGetUserData.hook";
import { ComponentSection } from "./components/ComponentSection.component";
import { useGetComponentData } from "./hooks/useGetComponentData.hook";
import { useGetSelectedComponents } from "./hooks/useGetSelectedComponents.hook";
import { GetSelectedComponents, UserDetails } from "../../../generated-client";
import { usePutSelectedComponents } from "./hooks/usePutSelectedComponents.hook";
import { objectToCamel } from "ts-case-convert";

export const itemsToReplaceFn = (data: Record<string, any>) => {
  return Object.entries(objectToCamel(data) ?? {})
    .map(([variableName, variableValue]) => {
      if (Array.isArray(variableValue)) {
        return {
          key: variableValue[0].toString(),
          value: variableValue[0][1]?.toString() ?? "",
        };
      }
      return {
        key: variableName.toString(),
        value: variableValue?.toString() ?? "",
      };
    })
    .flat();
};

export const ComponentMarketplace = () => {
  const { data: userData } = useGetUserData();
  const { data: componentData } = useGetComponentData();
  const { data: selectedComponentsData } = useGetSelectedComponents();
  const { mutate: putSelectedComponents } = usePutSelectedComponents();

  const [selectedComponents, setSelectedComponents] = useState<
    GetSelectedComponents | undefined
  >();

  useEffect(() => {
    setSelectedComponents(selectedComponentsData);
  }, [selectedComponentsData]);

  return (
    <div className="pt-16 flex gap-4 mx-4">
      <div className="flex flex-col gap-4 w-3/5 mx-auto border border-gray-300 rounded-md p-4">
        {Object.entries(componentData ?? {}).map(([key, data]) => {
          return (
            <ComponentSection
              data={data}
              title={key}
              itemsToReplace={itemsToReplaceFn(
                userData?.[key as keyof UserDetails]?.[0] ?? {}
              )}
              selectedComponents={selectedComponents}
              setSelectedComponents={setSelectedComponents}
            />
          );
        })}
      </div>
      <div className="top-16 right-2 flex-1">
        <button
          className="bg-button_blue text-white px-4 py-2 rounded-md cursor-pointer"
          onClick={() =>
            putSelectedComponents({ data: selectedComponents ?? {} })
          }
        >
          Save changes
        </button>
      </div>
    </div>
  );
};
