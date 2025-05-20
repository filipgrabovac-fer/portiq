import { useQueryClient } from "@tanstack/react-query";
import { EditIcon, SaveIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "../../../../utils/cn.util";
import { UserDetailsInfoType } from "../../hooks/useGetUserData.hook";
import { usePutUserData } from "../../hooks/usePutUserData.hook";
import { FormInputs } from "../FormInputs.component";
import { FormInputProps } from "../profile-form/form-inputs.types";
import { useGetGithubRepo } from "../../hooks/useGetGithubRepo.hook";

export type PersonalInfoFormProps = {
  data?: UserDetailsInfoType;
};

export const PersonalInfoForm = ({ data }: PersonalInfoFormProps) => {
  const [name, setName] = useState(data?.first_name);
  const [surname, setSurname] = useState(data?.last_name);
  const [email, setEmail] = useState(data?.email);
  const [phone, setPhone] = useState(data?.phone_number);
  const [address, setAddress] = useState(data?.address);
  const [city, setCity] = useState(data?.city);
  const [state, setState] = useState(data?.state);
  const [zipCode, setZipCode] = useState(data?.zip_code);
  const [country, setCountry] = useState(data?.country);
  const [readonly, setReadonly] = useState(true);
  const [githubUsername, setGithubUsername] = useState(data?.github_username);

  const formInputs: FormInputProps[] = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Name",
      onChange: setName,
      value: name,
      inputWrapperClass: "w-max",
    },
    {
      label: "Surname",
      name: "surname",
      type: "text",
      placeholder: "Surname",
      onChange: setSurname,
      value: surname,
      inputWrapperClass: "w-max",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Email",
      onChange: setEmail,
      value: email,
      inputWrapperClass: "min-lg:w-2/5 max-lg:w-full",
    },

    {
      label: "Phone",
      name: "phone",
      type: "number",
      placeholder: "Phone",
      onChange: setPhone,
      value: phone,
    },
    {
      label: "Address",
      name: "address",
      type: "text",
      placeholder: "Address",
      onChange: setAddress,
      value: address,
    },
    {
      label: "City",
      name: "city",
      type: "text",
      placeholder: "City",
      onChange: setCity,
      value: city,
    },
    {
      label: "State",
      name: "state",
      type: "text",
      placeholder: "State",
      onChange: setState,
      value: state,
    },
    {
      label: "Zip Code",
      name: "zip_code",
      type: "text",
      placeholder: "Zip Code",
      onChange: setZipCode,
      value: zipCode,
    },
    {
      label: "Country",
      name: "country",
      type: "text",
      placeholder: "Country",
      onChange: setCountry,
      value: country,
    },
    {
      label: "Github Username",
      name: "github_username",
      type: "text",
      placeholder: "Github Username",
      onChange: setGithubUsername,
      value: githubUsername,
    },
  ];

  const { mutate: updateUserData, isLoading } = usePutUserData();
  const { mutate: getGithubRepo } = useGetGithubRepo();
  const queryClient = useQueryClient();

  return (
    <div className="bg-white w-3/5 max-lg:w-full m-auto rounded-md flex flex-col gap-6 border border-gray-200 p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold pb-2">Personal Info</h2>

        {readonly ? (
          <EditIcon
            width={24}
            height={24}
            className="cursor-pointer hover:text-button_blue duration-300"
            onClick={() => setReadonly(false)}
          />
        ) : (
          <div className="flex gap-2">
            <SaveIcon
              onClick={() => {
                updateUserData({
                  info: {
                    first_name: name ?? "",
                    last_name: surname ?? "",
                    email: email ?? "",
                    phone_number: phone ?? "",
                    address: address ?? "",
                    city: city ?? "",
                    state: state ?? "",
                    zip_code: zipCode ?? "",
                    country: country ?? "",
                    github_username: githubUsername ?? "",
                  },
                });
                setReadonly(true);
              }}
              className="cursor-pointer hover:text-button_blue duration-300"
            />
            <TrashIcon
              onClick={() => {
                setReadonly(true);
                queryClient.invalidateQueries({
                  queryKey: ["getUserData"],
                });
              }}
              className="cursor-pointer hover:text-red-500 duration-300"
            />
          </div>
        )}
      </div>
      <FormInputs formInputs={formInputs} readonly={readonly} />

      <button
        className={cn(
          "bg-button_blue text-white px-4 py-2 rounded-md cursor-pointer",
          !githubUsername &&
            "cursor-not-allowed opacity-50 pointer-events-none",
          isLoading && "opacity-50 pointer-events-none"
        )}
        onClick={() => getGithubRepo()}
      >
        {isLoading ? "Loading..." : "Connect with Github"}
      </button>
    </div>
  );
};
