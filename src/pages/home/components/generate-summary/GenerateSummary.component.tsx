import { useState } from "react";
import { UserDetails } from "../../../../../generated-client";
import { Input } from "../../../../components/input/Input.component";
import { cn } from "../../../../utils/cn.util";
import { formatUserInfoToPropmt } from "../../utils/formatUserInfoToPropmt.util";
import { usePostGenerateSummary } from "../profile-form/hooks/usePostGenerateSummary.hook";
import { Loader2, Sparkle, SparkleIcon, Sparkles } from "lucide-react";

export type GenerateSummaryProps = {
  userData: UserDetails;
};
export const GenerateSummary = ({ userData }: GenerateSummaryProps) => {
  //@ts-ignore
  const [summary, setSummary] = useState(userData?.info?.[0]?.summary ?? "");
  const { mutate: generateSummary, isLoading } = usePostGenerateSummary({
    setSummary,
  });

  console.log(userData);

  const prompt = formatUserInfoToPropmt({ userData: userData });

  return (
    <div className="bg-white w-3/5 max-lg:w-full m-auto rounded-md flex flex-col  border border-gray-200 p-8 gap-4">
      <h2
        className={cn(
          "text-2xl font-semibold pb-2 border-b-[1px] border-gray-200 mb-6"
        )}
      >
        Summary
      </h2>

      <Input
        label="Summary"
        name="summary"
        type="textarea"
        placeholder="Summary"
        onChange={setSummary}
        value={summary}
        rows={10}
      />

      <div className="flex w-full justify-end gap-2">
        <button
          className={cn(
            " text-button_blue px-4 py-2 rounded-md cursor-pointer flex gap-2 justify-between items-center hover:bg-button_blue/10 transition-all duration-300",
            isLoading && "bg-button_blue/10"
          )}
          onClick={() => generateSummary({ summary: prompt })}
        >
          {isLoading ? (
            <Loader2 className="animate-spin opacity-50 cursor-not-allowed pointer-events-none" />
          ) : (
            <>
              <div></div>
              <Sparkles className="w-4 h-4" />
              <p>Generate summary</p>
            </>
          )}
        </button>
        <button className="bg-button_blue text-white px-4 py-2 rounded-md cursor-pointer flex gap-2 justify-between items-center">
          Save
        </button>
      </div>
    </div>
  );
};
