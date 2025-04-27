import { EditIcon, SaveIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { FormInputProps, FormInputs } from "../../../FormInputs.component";

export type ProfileFormComponentItemType = {
  id?: string;
  title: string;
  description: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  link?: string;
  createdAt?: string;
};

export type ProfileFormComponentType =
  | "certificates"
  | "education"
  | "skills"
  | "projects";

export type UpdateHookDataProps = {
  id: string;
  item: ProfileFormComponentItemType;
  type: ProfileFormComponentType;
};

export type ProfileFormComponentProps = {
  item: ProfileFormComponentItemType;
  updateHook: (data: UpdateHookDataProps) => void;
  type: ProfileFormComponentType;
};

export const ProfileFormComponent = ({
  item,
  updateHook,
  type,
}: ProfileFormComponentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState<string | undefined>(item.title);
  const [description, setDescription] = useState<string | undefined>(
    item.description
  );
  const [startDate, setStartDate] = useState<string | undefined>(
    item.startDate
  );
  const [endDate, setEndDate] = useState<string | undefined>(item.endDate);
  const [location, setLocation] = useState<string | undefined>(item.location);
  const [link, setLink] = useState<string | undefined>(item.link);

  const formInputs: FormInputProps[] = [
    {
      name: "Title",
      label: "Title",
      value: title,
      onChange: (value) => setTitle(value),
    },
    {
      name: "Description",
      label: "Description",
      value: description,
      onChange: (value) => setDescription(value),
    },
    {
      name: "StartDate",
      label: "Start Date",
      type: "date",
      value: startDate,
      onChange: (value) => setStartDate(value),
    },
    {
      name: "EndDate",
      label: "End Date",
      type: "date",
      value: endDate,
      onChange: (value) => setEndDate(value),
    },
    {
      name: "Location",
      label: "Location",
      value: location,
      onChange: (value) => setLocation(value),
    },
    {
      name: "Link",
      label: "Link",
      value: link,
      onChange: (value) => setLink(value),
    },
  ];

  return (
    <div className="flex flex-col gap-2 rounded-md flex-1 p-2 pb-2 relative">
      <div className="absolute top-0 right-0">
        {isEditing ? (
          <div className="flex gap-2">
            <SaveIcon
              onClick={() =>
                updateHook({
                  id: item.id ?? "",
                  type,
                  item: {
                    title: title ?? "",
                    description: description ?? "",
                    startDate: startDate,
                    endDate: endDate,
                    location: location ?? "",
                    link: link ?? "",
                  },
                })
              }
              className="cursor-pointer hover:text-button_blue duration-300"
            />
            <TrashIcon
              onClick={() => setIsEditing(false)}
              className="cursor-pointer hover:text-red-500 duration-300"
            />
          </div>
        ) : (
          <EditIcon
            width={24}
            height={24}
            className="cursor-pointer hover:text-button_blue duration-300"
            onClick={() => setIsEditing(true)}
          />
        )}
      </div>

      {isEditing ? (
        <div>
          <FormInputs formInputs={formInputs} />
        </div>
      ) : (
        <>
          <div>
            <h2 className="text-xl font-medium">{item.title}</h2>
            <p className="text-sm ">{item.description}</p>
          </div>
          <div className="grid grid-cols-1 grid-rows-[auto auto] md:grid-rows-1 md:grid-cols-2 w-full text-gray-500 text-sm">
            <div>
              <p>Start Date: {item.startDate}</p>
              <p>End Date: {item.endDate}</p>
              <p>Created At: {item.createdAt}</p>
            </div>
            <div>
              <p>Location: {item.location}</p>
              <p>Link: {item.link}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
