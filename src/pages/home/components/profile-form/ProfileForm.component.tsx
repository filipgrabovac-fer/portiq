import { DotIcon } from "lucide-react";
import { useState } from "react";
import { AddNewDataButton } from "../../../../components/add-new-data-button/AddNewDataButton.component";
import { cn } from "../../../../utils/cn.util";
import { AddNewDataModal } from "./components/profile-form-component/AddNewDataModal.component";
import {
  ProfileFormComponent,
  ProfileFormComponentItemType,
  ProfileFormComponentType,
} from "./components/profile-form-component/ProfileFormComponent.component";

export type ProfileFormProps = {
  sectionTitle: string;
  data?: ProfileFormComponentItemType[];
  type: ProfileFormComponentType;
};

export const ProfileForm = ({ sectionTitle, data, type }: ProfileFormProps) => {
  const [isAddNewDataModalOpen, setIsAddNewDataModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white w-3/5 max-lg:w-full m-auto rounded-md flex flex-col  border border-gray-200 p-8 pb-0 ">
        <h2
          className={cn(
            "text-2xl font-semibold pb-2 border-b-[1px] border-gray-200",
            data?.length && "mb-6"
          )}
        >
          {sectionTitle}
        </h2>
        <div className="flex flex-col ">
          {data?.map((item) => (
            <div className="flex">
              <div className="flex flex-col px-4">
                <DotIcon className="text-button_blue p-0 m-0" size="40" />
                <div className="h-full w-[1px] border border-button_blue m-auto flex-1"></div>
              </div>
              <ProfileFormComponent
                item={item}
                profileFormComponentType={type}
              />
            </div>
          ))}
        </div>
        <AddNewDataButton
          onClick={() => setIsAddNewDataModalOpen(true)}
          className="p-2"
          title={sectionTitle}
        />
        {isAddNewDataModalOpen && (
          <AddNewDataModal
            setIsAddNewDataModalOpen={setIsAddNewDataModalOpen}
            dataType={type}
          />
        )}
      </div>
    </>
  );
};
