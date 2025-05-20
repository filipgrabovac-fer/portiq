import { useQueryClient } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { usePostProfileComponent } from "../../hooks/usePostProfileComponent.hook";
import {
  AddNewDataModalProps,
  educationLevelOptions,
  educationTypeOptions,
  languageLevelOptions,
} from "./add-new-data-modal.types";
import {
  profileFormInputsByCategory,
  ProfileFormComponentTitle,
} from "./profile-form-component.types";
import { FormInputProps } from "../../form-inputs.types";
import { FormInputs } from "../../../FormInputs.component";
import { TypeEnum } from "../../../../../../../generated-client/models/TypeEnum";

export const AddNewDataModal = ({
  setIsAddNewDataModalOpen,
  dataType,
}: AddNewDataModalProps) => {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [link, setLink] = useState<string>();
  const [level, setLevel] = useState<string>();
  const [type, setType] = useState<string>();
  const [languageLevel, setLanguageLevel] = useState<string>();

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
      options: Object.values(TypeEnum).map((type) => ({
        label: educationTypeOptions[type],
        value: type,
      })),
      type: "select",
      onChange: (value) => setType(value),
    },
    {
      name: "level",
      label: "Level",
      type: "select",
      value: level,
      placeholder: "Select Level",
      options: educationLevelOptions,
      onChange: (value) => setLevel(value),
    },
    {
      name: "languageLevel",
      label: "Level",
      value: languageLevel,
      placeholder: "Select Language Level",
      options: languageLevelOptions,
      type: "select",
      onChange: (value) => setLanguageLevel(value),
    },
  ];

  const allowedProfileFormInputs = profileFormInputsByCategory[dataType];

  const filteredFormInputs = formInputs.filter((input) =>
    allowedProfileFormInputs.includes(input.name)
  );

  const queryClient = useQueryClient();

  const { mutate: createProfileComponent } = usePostProfileComponent({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserData"] }),
        setIsAddNewDataModalOpen(false);
    },
  });
  return (
    <div className="absolute top-0 left-0 bg-black/80 h-screen w-screen z-10">
      <div className="relative bg-white w-full sm:w-4/5 md:w-3/5 lg:w-2/5 md:max-w-6xl pt-16 max-w-full rounded-md p-4 md:p-16 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full md:h-max flex flex-col">
        <h1 className="text-2xl font-semibold mb-8">
          {ProfileFormComponentTitle[dataType]}
        </h1>
        <XIcon
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => setIsAddNewDataModalOpen(false)}
        />
        <FormInputs formInputs={filteredFormInputs} />
        <button
          className="bg-button_blue text-white p-2 rounded-md max-w-40 hover:opacity-90  duration-300 cursor-pointer mx-auto mt-4"
          onClick={() => {
            createProfileComponent({
              type: dataType,
              item: {
                title,
                description,
                endDate: new Date(endDate ?? ""),
                level: level ?? languageLevel,
                link,
                location,
                startDate: new Date(startDate ?? ""),
                type,
              },
            });
          }}
        >
          Create {dataType}
        </button>
      </div>
    </div>
  );
};
