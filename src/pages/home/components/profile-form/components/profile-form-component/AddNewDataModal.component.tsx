import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { XIcon } from "lucide-react";
import { useState } from "react";
import * as yup from "yup";
import { TypeEnum } from "../../../../../../../generated-client/models/TypeEnum";
import { FormInputs } from "../../../FormInputs.component";
import { FormInputProps } from "../../form-inputs.types";
import { usePostProfileComponent } from "../../hooks/usePostProfileComponent.hook";
import {
  AddNewDataModalProps,
  educationLevelOptions,
  educationTypeOptions,
  languageLevelOptions,
} from "./add-new-data-modal.types";
import {
  ProfileFormComponentTitle,
  profileFormComponentValidationSchema,
  profileFormInputsByCategory,
} from "./profile-form-component.types";

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
      required: true,
      placeholder: "Enter Title",
    },
    {
      name: "description",
      label: "Description",
      value: description,
      onChange: (value) => setDescription(value),
      required: true,
      placeholder: "Enter Description",
    },
    {
      name: "startDate",
      label: "Start Date",
      type: "date",
      value: startDate,
      onChange: (value) => setStartDate(value),
      required: true,
      placeholder: "Select Start Date",
    },
    {
      name: "endDate",
      label: "End Date",
      type: "date",
      value: endDate,
      required: true,
      onChange: (value) => setEndDate(value),
      placeholder: "Select End Date",
    },
    {
      name: "location",
      label: "Location",
      value: location,
      onChange: (value) => setLocation(value),
      placeholder: "Enter Location",
    },
    {
      name: "link",
      label: "Link",
      value: link,
      onChange: (value) => setLink(value),
      placeholder: "Enter Link",
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
      required: true,
      placeholder: "Select Type",
    },
    {
      name: "level",
      label: "Level",
      type: "select",
      value: level,
      placeholder: "Select Level",
      options: educationLevelOptions,
      onChange: (value) => setLevel(value),
      required: true,
    },
    {
      name: "languageLevel",
      label: "Level",
      value: languageLevel,
      placeholder: "Select Language Level",
      options: languageLevelOptions,
      type: "select",
      onChange: (value) => setLanguageLevel(value),
      required: true,
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
  const requiredParameters: Record<string, yup.AnySchema> = {};

  Object.keys(profileFormComponentValidationSchema).forEach((field) => {
    if (filteredFormInputs.find((input) => input.name === field)?.required) {
      requiredParameters[field] = profileFormComponentValidationSchema[
        field as keyof typeof profileFormComponentValidationSchema
      ].required("This field is required");
    } else
      requiredParameters[field] =
        profileFormComponentValidationSchema[
          field as keyof typeof profileFormComponentValidationSchema
        ];
  });

  const ValidationSchema = yup.object().shape(requiredParameters);

  const initialValues = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    link: "",
    level: "",
    type: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={(values) => {
        createProfileComponent({
          type: dataType,
          item: {
            title: values.title,
            description: values.description,
            endDate: new Date(values.endDate ?? ""),
            level: values.level ?? languageLevel,
            link: values.link,
            location: values.location,
            startDate: new Date(values.startDate ?? ""),
            type: values.type,
          },
        });
        setIsAddNewDataModalOpen(false);
      }}
    >
      {({ submitForm, setFieldValue, validateForm, errors }) => (
        <div className="absolute top-0 left-0 bg-black/80 h-screen w-screen z-10">
          <div className="relative bg-white w-full sm:w-4/5 md:w-3/5 lg:w-2/5 md:max-w-6xl pt-16 max-w-full rounded-md p-4 md:p-16 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full md:h-max flex flex-col">
            <h1 className="text-2xl font-semibold mb-8">
              {ProfileFormComponentTitle[dataType]}
            </h1>
            <XIcon
              className="absolute top-5 right-5 cursor-pointer"
              onClick={() => setIsAddNewDataModalOpen(false)}
            />
            <Form className="flex flex-col">
              <FormInputs
                formInputs={filteredFormInputs}
                setFieldValue={setFieldValue}
                errors={errors}
              />
              <div
                className="bg-button_blue text-white p-2 rounded-md max-w-40 hover:opacity-90  duration-300 cursor-pointer mx-auto mt-4"
                onClick={async () => {
                  const errors = await validateForm();
                  if (Object.entries(errors).length === 0) {
                    submitForm();
                  }
                }}
              >
                Create {ProfileFormComponentTitle[dataType]}
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};
