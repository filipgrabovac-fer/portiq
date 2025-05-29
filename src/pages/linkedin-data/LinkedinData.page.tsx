import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { homeRoute } from "../../routes/home.routes";
import { LinkedinDataComponent } from "./components/linkedin-data-component/LinkedinDataComponent.component";
import { useGetLinkedinData } from "./hooks/useGetLinkedinData.hook";
import { usePutLinkedinData } from "./hooks/usePutLinkedinData.hook";
import { linkedinDataType } from "./linkedin-data.types";
import { GetLinkedinData } from "../../../generated-client";

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

  return linkedinData ? (
    <div className="flex flex-col gap-4 m-auto w-4/5 items-center h-full justify-center">
      <div className="flex flex-col gap-4 shadow-sm border-0 bg-white/70 backdrop-blur-sm p-8 rounded-md">
        <h2 className="text-2xl font-bold text-center">
          Select the data you want to import from Linkedin
        </h2>
        <div className="w-full flex flex-col gap-4">
          {Object.entries(linkedinData ?? {}).map(
            ([key, values]) =>
              typeof values === "string" &&
              key in linkedinDataType && (
                <LinkedinDataComponent
                  // @ts-ignore
                  item={{
                    [key as keyof typeof linkedinDataType]: values as string,
                  }}
                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                />
              )
          )}
        </div>

        <div className="flex flex-col gap-2 cursor-pointer">
          <button
            className="bg-white hover:bg-button_blue/20 text-button_blue p-3 rounded-md w-full hover:opacity-90  cursor-pointer mx-auto transition-all duration-300 text-lg"
            onClick={() => putLinkedinData(selectedData as GetLinkedinData)}
          >
            Import data
          </button>
          <button
            className=" bg-white p-3 text-red-500 cursor-pointer rounded-md w-full mx-auto hover:bg-red-500/20 transition-all duration-300 text-lg"
            onClick={() => {
              setSelectedData({});
              navigate({ to: homeRoute.to });
            }}
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-4 m-auto w-4/5 items-center h-full justify-center text-gray-500">
      No data found
    </div>
  );
};
