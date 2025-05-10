import { Checkbox } from "antd";
import {
  ProfileFormComponentItemType,
  ProfileFormComponentTitle,
  ProfileFormComponentType,
} from "../profile-form/components/profile-form-component/ProfileFormComponent.component";
import { useEffect, useState } from "react";
import { cn } from "../../../../utils/cn.util";

export type ExportToPdfSectionProps = {
  items: Record<string, string>[];
  type: ProfileFormComponentType;
  selectedItemIds: Record<string, string[]>;
  setSelectedItemIds: (ids: Record<string, string[]>) => void;
};
export const ExportToPdfSection = ({
  items,
  type,
  selectedItemIds,
  setSelectedItemIds,
}: ExportToPdfSectionProps) => {
  const data = items as ProfileFormComponentItemType[];

  const handleCheckboxChange = (item: ProfileFormComponentItemType) => {
    if (selectedItemIds[type]?.includes(item.id ?? "")) {
      setSelectedItemIds({
        ...selectedItemIds,
        [type]: selectedItemIds[type]?.filter((id) => id !== item.id),
      });
    } else {
      setSelectedItemIds({
        ...selectedItemIds,
        [type]: [...(selectedItemIds[type] ?? []), item.id ?? ""],
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">{ProfileFormComponentTitle[type]}</h1>
      <div className="flex gap-2 flex-wrap">
        {data.map((item) => (
          <div
            className={cn(
              "border border-gray-200 rounded-md py-2 px-4 flex gap-4 justify-between items-center hover:bg-button_blue  hover:border-button_blue hover:text-white cursor-pointer transition-all duration-300 w-[calc(50%-0.5rem)]",
              selectedItemIds[type]?.includes(item.id ?? "") &&
                " outline-2 outline-button_blue border-none"
            )}
            onClick={() => handleCheckboxChange(item)}
          >
            <Checkbox
              checked={selectedItemIds[type]?.includes(item.id ?? "")}
              onChange={() => handleCheckboxChange(item)}
            />
            <div className="flex-1">
              <h2 className="text-lg font-medium">{item.title}</h2>
              <p className="text-sm ">{item.description}</p>
            </div>
            <div className="grid grid-cols-1 grid-rows-[auto auto] md:grid-rows-1 md:grid-cols-2 w-full text-gray-500 text-sm flex-1">
              <div>
                {item.location && <p>Location: {item.location}</p>}
                {item.link && <p>Link: {item.link}</p>}
                {item.level && <p>Level: {item.level}</p>}
                {item.type && <p>Type: {item.type}</p>}
              </div>
              <div>
                {item.startDate && <p>Start Date: {item.startDate}</p>}
                {item.endDate && <p>End Date: {item.endDate}</p>}
                {item.createdAt && <p>Created At: {item.createdAt}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
