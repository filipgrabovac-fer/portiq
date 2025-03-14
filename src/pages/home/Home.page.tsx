import { PersonalInfoForm } from "./components/personal-info-form/PersonalInfoForm.component";

export const Home = () => {
  return (
    <div className="h-screen">
      <div className="flex flex-col gap-4 items-center ">
        <PersonalInfoForm />
        <PersonalInfoForm />
        <PersonalInfoForm />
        <PersonalInfoForm />
      </div>
    </div>
  );
};
