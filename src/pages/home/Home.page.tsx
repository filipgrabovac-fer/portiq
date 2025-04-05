import { PersonalInfoForm } from "./components/personal-info-form/PersonalInfoForm.component";
import { useGetUserData } from "./hooks/useGetUserData.hook";

export const Home = () => {
  const { data: userData } = useGetUserData();

  return (
    <div className="h-screen">
      <div className="flex flex-col gap-4 items-center p-2 mt-12">
        {userData && <PersonalInfoForm data={userData?.info} />}
      </div>
    </div>
  );
};
