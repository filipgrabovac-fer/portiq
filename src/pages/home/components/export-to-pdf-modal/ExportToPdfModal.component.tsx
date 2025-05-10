import { DownloadIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import generatePDF from "react-to-pdf";
import { UserDetails } from "../../../../../generated-client";
import {
  ProfileFormComponentItemType,
  ProfileFormComponentType,
} from "../profile-form/components/profile-form-component/ProfileFormComponent.component";
import { ExportToPdfSection } from "./ExportToPdfSection.component";
import { PdfPreview } from "./PdfPreview.component";
import { cn } from "../../../../utils/cn.util";

export type ExportToPdfModalProps = {
  userData: UserDetails;
  setIsModalOpen: (isModalOpen: boolean) => void;
};

export const ExportToPdfModal = ({
  userData,
  setIsModalOpen,
}: ExportToPdfModalProps) => {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<
    Record<string, string[]>
  >({});

  // @ts-ignore-next-line
  const fullName = `${userData?.info?.[0]?.name} ${userData?.info?.[0]?.surname}`;
  const handleDownloadPDF = () => {
    generatePDF(pdfRef, {
      filename: `${fullName}.pdf`,
    });
  };

  return (
    <div className="h-screen w-screen bg-black/50 absolute z-100 ">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col w-full h-screen rounded-none lg:w-4/5  bg-white md:rounded-md p-4">
        <div className="flex justify-between">
          <div className="flex-1">
            <div className="relative flex text-white font-medium max-w-40 border border-button_blue/20 rounded-lg">
              <span
                className={cn(
                  "absolute top-0 left-0 w-1/2 h-full bg-button_blue rounded-md transition-all duration-300 outline outline-button_blue",
                  isPreview && "translate-x-[100%]"
                )}
              />
              <button
                onClick={() => setIsPreview(false)}
                className={cn(
                  "w-full z-10 transition-all duration-300 cursor-pointer",
                  isPreview && "text-button_blue"
                )}
              >
                Select
              </button>
              <button
                className={cn(
                  "z-10 w-full text-center transition-all duration-300 h-10 cursor-pointer",
                  !isPreview && "text-button_blue"
                )}
                onClick={() => setIsPreview(true)}
              >
                Preview
              </button>
            </div>
          </div>
          <XIcon
            className="w-5 h-5 absolute top-4 right-4 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="flex-1">
            <div className="flex gap-4 items-center justify-center">
              <h1 className="text-2xl font-bold">Export to PDF</h1>
              <DownloadIcon
                className="w-8 h-8 bg-button_blue rounded-md p-1 text-white cursor-pointer"
                onClick={handleDownloadPDF}
              />
            </div>
          </div>
          <div className="w-5 flex-1"></div>
        </div>

        <div className="overflow-y-scroll max-h-[100vh] flex flex-col gap-4 p-8">
          {isPreview ? (
            <PdfPreview
              userData={userData}
              selectedItemsIds={selectedItemIds}
              pdfRef={pdfRef}
            />
          ) : (
            Object.entries(userData).map(
              (entry) =>
                entry[0] !== "info" &&
                entry[1].length > 0 && (
                  <ExportToPdfSection
                    selectedItemIds={selectedItemIds}
                    setSelectedItemIds={setSelectedItemIds}
                    items={
                      entry[1] as unknown as ProfileFormComponentItemType[]
                    }
                    type={entry[0] as ProfileFormComponentType}
                  />
                )
            )
          )}
        </div>
      </div>
    </div>
  );
};
