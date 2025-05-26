import { Delete, EditIcon, SaveIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useDeleteProfileComponent } from "../../../../../hooks/useDeleteProfileComponent.hook";
import { useQueryClient } from "@tanstack/react-query";
import { usePutProfileComponent } from "../../../../../hooks/usePutProfileComponent.hook";
import {
  ProfileFormComponentProps,
  profileFormInputsByCategory,
  ProfileFormHookDataProps,
} from "./profile-form-component.types";
import { FormInputProps } from "../../form-inputs.types";
import { FormInputs } from "../../../FormInputs.component";
import {
  educationLevelOptions,
  educationTypeOptions,
  languageLevelOptions,
} from "./add-new-data-modal.types";

export const ProfileFormComponent = ({
  item,
  profileFormComponentType,
}: ProfileFormComponentProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();
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
  const [level, setLevel] = useState<string | undefined>(item.level);
  const [type, setType] = useState<string | undefined>(item.type);

  const formInputs: FormInputProps[] = [
    {
      name: "title",
      label: "Title",
      value: title,
      onChange: (value) => setTitle(value),
    },
    {
      name: "description",
      label: "Description",
      value: description,
      onChange: (value) => setDescription(value),
    },
    {
      name: "startDate",
      label: "Start Date",
      type: "date",
      value: startDate,
      onChange: (value) => setStartDate(value),
    },
    {
      name: "endDate",
      label: "End Date",
      type: "date",
      value: endDate,
      onChange: (value) => setEndDate(value),
    },
    {
      name: "location",
      label: "Location",
      value: location,
      onChange: (value) => setLocation(value),
    },
    {
      name: "link",
      label: "Link",
      value: link,
      onChange: (value) => setLink(value),
    },
    {
      name: "type",
      label: "Type",
      value: type,
      type: "select",
      options: Object.entries(educationTypeOptions).map(([key, value]) => ({
        label: value,
        value: key,
      })),
      onChange: (value) => setType(value),
    },
    {
      name: "level",
      label: "Level",
      value: level,
      type: "select",
      options:
        profileFormComponentType === "languages"
          ? languageLevelOptions
          : educationLevelOptions,
      onChange: (value) => setLevel(value),
    },
  ];

  const allowedProfileFormInputs =
    profileFormInputsByCategory[profileFormComponentType];

  const filteredFormInputs = formInputs.filter((input) =>
    allowedProfileFormInputs.includes(input.name)
  );

  const { mutate: deleteProfileComponent } = useDeleteProfileComponent({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserData"] });
    },
  });
  const { mutate: putProfileComponent } = usePutProfileComponent({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserData"] });
    },
  });

  const deleteHook = (data: ProfileFormHookDataProps) => {
    deleteProfileComponent({
      id: Number(data.id),
      type: data.type,
    });
  };

  const updateHook = (data: ProfileFormHookDataProps) => {
    putProfileComponent({
      type: data.type,
      item: {
        ...data.item,
        id: Number(data.id),
        startDate: new Date(data.item.startDate + "T00:00:00.000Z"),
        endDate: new Date(data.item.endDate + "T00:00:00.000Z"),
      },
    });
  };

  const formattedLevel =
    profileFormComponentType === "languages"
      ? languageLevelOptions.find((option) => option.value === level)?.label
      : educationLevelOptions.find((option) => option.value === level)?.label;

  const formattedType =
    educationTypeOptions[item.type as keyof typeof educationTypeOptions];

  return (
    <div className="flex flex-col gap-2 rounded-md flex-1 p-2 pb-2 relative">
      <div className="absolute top-0 right-0">
        {isEditing ? (
          <div className="flex gap-2">
            <SaveIcon
              onClick={() => {
                updateHook({
                  id: item.id ?? "",
                  type: profileFormComponentType,
                  item: {
                    title: title ?? "",
                    description: description ?? "",
                    startDate: startDate ?? "",
                    endDate: endDate ?? "",
                    location: location ?? "",
                    link: link ?? "",
                    level: level ?? "",
                  },
                });
                setIsEditing(false);
              }}
              className="cursor-pointer hover:text-button_blue duration-300"
            />
            <Delete
              onClick={() => {
                setIsEditing(false);
                queryClient.invalidateQueries({ queryKey: ["getUserData"] });
              }}
              className="cursor-pointer hover:text-red-500 duration-300"
            />
          </div>
        ) : (
          <div className="flex gap-2">
            <EditIcon
              width={24}
              height={24}
              className="cursor-pointer hover:text-button_blue duration-300"
              onClick={() => setIsEditing(true)}
            />
            <TrashIcon
              onClick={() => {
                setIsEditing(false);
                deleteHook({
                  id: item.id ?? "",
                  type: profileFormComponentType,
                  item: item,
                });
              }}
              className="cursor-pointer hover:text-red-500 duration-300"
            />
          </div>
        )}
      </div>

      {isEditing ? (
        <FormInputs formInputs={filteredFormInputs} />
      ) : (
        <>
          <div>
            <h2 className="text-xl font-medium">{item.title}</h2>
            <p className="text-sm ">{item.description}</p>
          </div>
          <div className="grid grid-cols-1 grid-rows-[auto auto] md:grid-rows-1 md:grid-cols-2 w-full text-gray-500 text-sm">
            <div>
              {allowedProfileFormInputs.includes("location") && (
                <p>Location: {item.location}</p>
              )}
              {allowedProfileFormInputs.includes("link") && (
                <p>Link: {item.link}</p>
              )}
              {allowedProfileFormInputs.includes("level") && (
                <p>Level: {formattedLevel}</p>
              )}
              {allowedProfileFormInputs.includes("type") && (
                <p>Type: {formattedType}</p>
              )}
            </div>
            <div>
              {allowedProfileFormInputs.includes("startDate") && (
                <p>Start Date: {item.startDate?.slice(0, 10)}</p>
              )}
              {allowedProfileFormInputs.includes("endDate") && (
                <p>End Date: {item.endDate?.slice(0, 10)}</p>
              )}
              {allowedProfileFormInputs.includes("createdAt") && (
                <p>Created At: {item.createdAt?.slice(0, 10)}</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
