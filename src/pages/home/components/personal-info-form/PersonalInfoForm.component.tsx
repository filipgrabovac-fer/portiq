import { useState } from "react";
import { AddNewDataButton } from "../../../../components/add-new-data-button/AddNewDataButton.component";
import { Form } from "../FormInputs.component";
import { FormActionButtons } from "../../../../components/form-action-buttons/FormActionButtons.component";

const formInputs = [
  {
    label: "Name",
    name: "name",
    type: "text",
    placeholder: "Name",
    onChange: () => {},
  },
  {
    label: "Surname",
    name: "surname",
    type: "text",
    placeholder: "Surname",
    onChange: () => {},
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Email",
    onChange: () => {},
  },

  {
    label: "Phone",
    name: "phone",
    type: "number",
    placeholder: "Phone",
    onChange: () => {},
  },
  {
    label: "Address",
    name: "address",
    type: "text",
    placeholder: "Address",
    onChange: () => {},
  },
];

export const PersonalInfoForm = () => {
  const [isAddNewDataClicked, setIsAddNewDataClicked] = useState(false);

  return (
    <div className="bg-white w-3/5 m-auto rounded-md flex flex-col gap-6">
      <h2 className="p-4 text-2xl font-semibold">Personal Info</h2>
      {isAddNewDataClicked ? (
        <div className="p-4">
          <Form formInputs={formInputs} />
          <FormActionButtons
            onDiscard={() => setIsAddNewDataClicked(false)}
            onSave={() => setIsAddNewDataClicked(false)}
          />
        </div>
      ) : (
        <AddNewDataButton onClick={() => setIsAddNewDataClicked(true)} />
      )}
    </div>
  );
};
