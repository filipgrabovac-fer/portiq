import { DotIcon } from "lucide-react";
import { AddNewDataButton } from "../../../../components/add-new-data-button/AddNewDataButton.component";
import {
  ProfileFormComponent,
  ProfileFormComponentItemType,
  ProfileFormComponentType,
  UpdateHookDataProps,
} from "./components/profile-form-component/ProfileFormComponent.component";
import { cn } from "../../../../utils/cn.util";
import { usePutCertificate } from "./hooks/usePutCertificate.hook";
import { usePutEducation } from "./hooks/usePutEducation.hook";
import { TypeEnum } from "../../../../../generated-client";

export type ProfileFormProps = {
  sectionTitle: string;
  data?: ProfileFormComponentItemType[];
  type: ProfileFormComponentType;
};

export const ProfileForm = ({ sectionTitle, data, type }: ProfileFormProps) => {
  const { mutate: updateCertificate } = usePutCertificate();
  const { mutate: updateEducation } = usePutEducation();
  const updateHook = (data: UpdateHookDataProps) => {
    if (data.type === "certificates") {
      updateCertificate({
        certificate: {
          ...data.item,
          idCertificate: Number(data.id),
          createdAt: new Date(data.item.createdAt ?? ""),
          startDate: new Date(data.item.startDate ?? ""),
          endDate: new Date(data.item.endDate ?? ""),
        },
      });
    } else if (data.type === "education") {
      updateEducation({
        education: {
          ...data.item,
          idEducation: Number(data.id),
          type: TypeEnum["HighSchool"],
          createdAt: new Date(data.item.createdAt ?? ""),
          startDate: new Date(data.item.startDate ?? ""),
          endDate: new Date(data.item.endDate ?? ""),
          location: data.item.location ?? "",
        },
      });
    }
  };

  return (
    <>
      <div className="bg-white w-3/5 max-lg:w-full m-auto rounded-md flex flex-col  border border-gray-200 p-8 pb-0">
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
                updateHook={updateHook}
                type={type}
              />
            </div>
          ))}
        </div>
        <AddNewDataButton
          onClick={() => {}}
          className="p-2"
          title={sectionTitle}
        />
      </div>
    </>
  );
};
