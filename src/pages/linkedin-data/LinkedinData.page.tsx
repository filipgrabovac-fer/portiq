import { useState } from "react";
import { LinkedinDataComponent } from "./components/linkedin-data-component/LinkedinDataComponent.component";
import { useGetLinkedinData } from "./hooks/useGetLinkedinData.hook";
import { linkedinDataType } from "./linkedin-data.types";
import { usePutLinkedinData } from "./hooks/usePutLinkedinData.hook";
import { useNavigate } from "@tanstack/react-router";
import { homeRoute } from "../../routes/home.routes";
import { useQueryClient } from "@tanstack/react-query";

export const LinkedinData = () => {
  const navigate = useNavigate();
  const { data: linkedinData } = useGetLinkedinData();
  const { mutate: putLinkedinData } = usePutLinkedinData({
    onSuccess: () => navigate({ to: homeRoute.to }),
  });

  const [selectedData, setSelectedData] = useState<
    | {
        [key in keyof typeof linkedinDataType]: string;
      }
    | {}
  >({});

  return (
    <div className="flex flex-col gap-4 m-auto w-2/5 items-center h-full justify-center">
      <h2 className="text-2xl font-bold text-center">
        Select the data you want to import from Linkedin
      </h2>
      <div className="w-full flex flex-col gap-4">
        {Object.entries(linkedinData ?? {}).map(([key, values]) => (
          <LinkedinDataComponent
            // @ts-ignore
            item={{ [key as keyof typeof linkedinDataType]: values as string }}
            selectedData={selectedData}
            setSelectedData={setSelectedData}
          />
        ))}
      </div>

      <div className="flex flex-col gap-2 cursor-pointer">
        <button
          className="text-white bg-button_blue rounded-md p-3 text-xl"
          onClick={() => putLinkedinData({})}
        >
          Import data
        </button>
        <button
          className="text-xl text-red-500 cursor-pointer"
          onClick={() => {
            setSelectedData({});
            navigate({ to: homeRoute.to });
          }}
        >
          Discard
        </button>
      </div>
    </div>
  );
};
