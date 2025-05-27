import { Checkbox } from "antd";
import { cn } from "../../../../utils/cn.util";
import { linkedinDataType } from "../../linkedin-data.types";

export const LinkedinDataComponent = ({
  item,
  selectedData,
  setSelectedData,
}: {
  item: {
    [key in keyof typeof linkedinDataType]: string;
  };
  setSelectedData: (data: {
    [key in keyof typeof linkedinDataType]: string;
  }) => void;
  selectedData:
    | {
        [key in keyof typeof linkedinDataType]: string;
      }
    | {};
}) => {
  const handleCheckboxChange = () => {
    // @ts-ignore
    setSelectedData({
      ...selectedData,
      // @ts-ignore
      [Object.keys(item)[0]]: selectedData[
        Object.keys(item)[0] as keyof typeof linkedinDataType
      ]
        ? undefined
        : item[Object.keys(item)[0] as keyof typeof linkedinDataType],
    });
  };
  return (
    <div
      className={cn(
        "border border-gray-200 rounded-md py-2 px-4 flex gap-4 justify-between items-center hover:bg-button_blue  hover:border-button_blue hover:text-white cursor-pointer transition-all duration-300 w-full",
        Object.keys(item)[0] in selectedData &&
          // @ts-ignore
          selectedData[Object.keys(item)[0]] &&
          "outline-2 outline-button_blue"
      )}
      onClick={handleCheckboxChange}
    >
      <Checkbox
        checked={
          Object.keys(item)[0] in selectedData &&
          // @ts-ignore
          selectedData[Object.keys(item)[0]]
        }
        onChange={handleCheckboxChange}
      />
      <div className="flex-1">
        <p className="font-medium">
          {
            linkedinDataType[
              Object.keys(item)[0] as keyof typeof linkedinDataType
            ]
          }
        </p>
        <p className=" font-medium">
          {
            linkedinDataType[
              Object.keys(item)[0] as keyof typeof linkedinDataType
            ]
          }
        </p>
      </div>
    </div>
  );
};
