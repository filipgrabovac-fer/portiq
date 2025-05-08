import { cn } from "../../../utils/cn.util";
import { ComponentRender } from "../../web-portfolio/components/component-render/ComponentRender.component";
import {
  ComponentSectionProps,
  ComponentTypeMappingEnum,
} from "./component-section.types";

export const ComponentSection = ({
  data,
  title,
  itemsToReplace,
  selectedComponents,
  setSelectedComponents,
  setHasSelectedComponentChanged,
}: ComponentSectionProps) => {
  const preselectedItemKey =
    ComponentTypeMappingEnum[title as keyof typeof ComponentTypeMappingEnum];

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      {data.length == 0 && <p className="mx-auto">No components found</p>}
      {data.map((item) => {
        return (
          <div
            className={cn(
              "border rounded-md p-4 flex flex-col gap-2 hover:bg-button_blue hover:text-white transition-all duration-300",
              selectedComponents?.[preselectedItemKey] === item.id
                ? "border-2 border-button_blue"
                : "border-gray-300"
            )}
            key={item.id}
            onClick={() => {
              setSelectedComponents({
                ...selectedComponents,
                [preselectedItemKey]: item.id,
              });
              setHasSelectedComponentChanged(true);
            }}
          >
            <h2>{item.title}</h2>
            <div>
              <ComponentRender
                componentData={[itemsToReplace]}
                componentCode={{ html: item.html, css: item.css, js: item.js }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
