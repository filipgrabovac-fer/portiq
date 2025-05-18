import { PersonalInfoForm } from "./components/personal-info-form/PersonalInfoForm.component";
import { ProfileFormComponentType } from "./components/profile-form/components/profile-form-component/profile-form-component.types";
import {
  ProfileForm,
  ProfileFormProps,
} from "./components/profile-form/ProfileForm.component";
import {
  useGetUserData,
  UserDetailsInfoType,
} from "./hooks/useGetUserData.hook";

export enum UserDataKeysEnum {
  certificates = "Certificates",
  education = "Education",
  skills = "Skills",
  projects = "Projects",
  languages = "Languages",
  other = "Other",
  hobbies = "Hobbies",
}

import { objectToCamel } from "ts-case-convert";

type UserDataKey = keyof typeof UserDataKeysEnum;

const isKeyOfUserData = (key: string): key is UserDataKey => {
  return key in UserDataKeysEnum;
};

export const Home = () => {
  const { data: userData } = useGetUserData();

  return (
    <div className="h-screen">
      <div className="flex flex-col gap-4 items-center p-2 mt-12">
        {userData && (
          <PersonalInfoForm
            data={userData?.info?.[0] as unknown as UserDetailsInfoType}
          />
        )}

        {userData &&
          Object.entries(userData).map((componentData) => {
            const key = componentData[0];
            const data = objectToCamel(
              (componentData[1] as ProfileFormProps["data"]) ?? {}
            );

            if (!isKeyOfUserData(key) || !data) return null;

            return (
              <ProfileForm
                sectionTitle={UserDataKeysEnum[key]}
                data={data as ProfileFormProps["data"]}
                type={key as ProfileFormComponentType}
              />
            );
          })}
      </div>
    </div>
  );
};
