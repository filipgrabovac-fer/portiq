import { useQueryClient } from "@tanstack/react-query";
import {
  EditIcon,
  Github,
  Loader2,
  SaveIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { cn } from "../../../../utils/cn.util";
import { UserDetailsInfoType } from "../../hooks/useGetUserData.hook";
import { usePutUserData } from "../../hooks/usePutUserData.hook";
import { FormInputs } from "../FormInputs.component";
import { FormInputProps } from "../profile-form/form-inputs.types";

import { GithubResponse } from "../../../../../generated-client";
import { useDeleteGithubData } from "../../hooks/useDeleteGithubData.hook";
import { usePutGithubData } from "../../hooks/usePutGithubData.hook";
import { GithubData } from "./GithubData.component";
import { LinkedinData } from "./LinkedinData.component";

export type PersonalInfoFormProps = {
  data?: UserDetailsInfoType;
  githubData?: GithubResponse;
};

export const PersonalInfoForm = ({
  data,
  githubData,
}: PersonalInfoFormProps) => {
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

  const resetData = () => {
    setName(data?.first_name);
    setSurname(data?.last_name);
    setEmail(data?.email);
    setPhone(data?.phone_number);
    setAddress(data?.address);
    setCity(data?.city);
    setState(data?.state);
    setZipCode(data?.zip_code);
    setCountry(data?.country);
    setGithubUsername(data?.github_username);
  };

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
  const queryClient = useQueryClient();

  const { mutate: updateUserData } = usePutUserData();
  const { mutate: putGithubData, isLoading: isPutGithubDataLoading } =
    usePutGithubData({
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["getUserData"] }),
    });
  const { mutate: deleteGithubData, isLoading: isDeleteGithubDataLoading } =
    useDeleteGithubData({
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["getUserData"] }),
    });

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
                queryClient.invalidateQueries({
                  queryKey: ["getUserData"],
                });
                setReadonly(true);
                resetData();
              }}
              className="cursor-pointer hover:text-red-500 duration-300"
            />
          </div>
        )}
      </div>
      <FormInputs formInputs={formInputs} readonly={readonly} />

      {githubData && githubData.avatarUrl && <GithubData {...githubData} />}

      <div className="flex justify-between gap-4">
        <LinkedinData />

        {isPutGithubDataLoading || isDeleteGithubDataLoading ? (
          <Loader2 className="animate-spin mx-auto text-button_blue" />
        ) : (
          <div className="flex flex-col gap-2 flex-1">
            {
              <button
                className={cn(
                  "bg-[#24292e] text-white px-4 py-2 rounded-md cursor-pointer font-semibold flex gap-2 items-center w-full mx-auto h-16",
                  !githubUsername &&
                    "cursor-not-allowed opacity-50 pointer-events-none"
                )}
              >
                <button
                  className="cursor-pointer flex gap-2 w-full justify-center items-center"
                  onClick={() =>
                    putGithubData({ username: githubUsername ?? "" })
                  }
                >
                  <Github className="h-6 w-6 text-white" />
                  <div className="flex flex-col items-start  ">
                    <span className="font-semibold leading-tight">
                      {!githubData?.avatarUrl
                        ? "Connect with GitHub"
                        : "Update GitHub Data"}
                    </span>
                    <span className="text-xs text-gray-300 opacity-90">
                      {!githubData?.avatarUrl
                        ? "Import your repositories"
                        : "Refresh your data"}
                    </span>
                  </div>
                </button>
                {githubData && githubData.avatarUrl && (
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 bg-white hover:bg-red-500 transition-all duration-300 font-medium px-4 py-2 rounded-md ml-auto cursor-pointer group"
                    onClick={() => deleteGithubData()}
                  >
                    <XIcon className="w-6 h-6 text-red-500 hover:text-white group-hover:text-white transition-all duration-300" />
                  </button>
                )}
              </button>
            }
          </div>
        )}
      </div>
    </div>
  );
};
