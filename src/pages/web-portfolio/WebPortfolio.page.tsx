import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { webPortfolioRoute } from "../../routes/web-portfolio.routes";
import { useGetProfileComponentCode } from "./hooks/useGetProfileComponentCode.hook";
import { useGetUserDataById } from "./hooks/useGetUserDataById.hook";
import { ComponentRender } from "./components/component-render/ComponentRender.component";
import { cn } from "../../utils/cn.util";
import { homeRoute } from "../../routes/home.routes";
import { HomeIcon } from "lucide-react";

import generatePDF from "react-to-pdf";

export const WebPortfolio = () => {
  const { userId } = useParams({ from: webPortfolioRoute.fullPath });
  const { data: componentCodeData } = useGetProfileComponentCode();
  const { data: userData } = useGetUserDataById({ userId: userId });

  const pdfRef = useRef<HTMLDivElement>(null);

  const [fullName, setFullName] = useState("");
  const [isA4, setIsA4] = useState(false);

  useEffect(() => {
    setFullName(
      // @ts-ignore
      `${userData?.info?.[0]?.first_name} ${userData?.info?.[0]?.last_name}`
    );
  }, [userData]);

  const handleDownloadPDF = () => {
    generatePDF(pdfRef, {
      filename: `${fullName}.pdf`,
    });
  };

  return (
    <div className="h-screen">
      <Link to={homeRoute.to}>
        <HomeIcon />
      </Link>
      <div className="flex justify-center items-center mt-10 px-20 gap-4">
        <button
          onClick={() => handleDownloadPDF()}
          className="rounded-md bg-button_blue text-white p-2 cursor-pointer"
        >
          Download PDF
        </button>
        <h1 className="text-xl md:text-5xl font-semibold text-center">
          Welcome to {fullName}
          's Web Portfolio!
        </h1>

        <div className="bg-gray-200 rounded-xl flex">
          <button
            className={cn(
              "bg-button_blue text-white px-4 py-2 rounded-l-xl cursor-pointer transition-all duration-300 hover:bg-button_blue/80 w-16",
              isA4 && "bg-gray-200"
            )}
            onClick={() => setIsA4(false)}
          >
            Web
          </button>
          <button
            className={cn(
              "bg-button_blue text-white px-4 py-2 rounded-r-xl cursor-pointer transition-all duration-300 hover:bg-button_blue/80 w-16",
              !isA4 && "bg-gray-200"
            )}
            onClick={() => setIsA4(true)}
          >
            A4
          </button>
        </div>
      </div>

      <div
        ref={pdfRef}
        className={cn(
          "transition-all duration-300 mx-auto outline-gray-200 ",
          isA4
            ? "w-[210mm] max-[210mm]:w-full outline rounded-md"
            : "h-full w-full px-10 sm:px-30 xl:px-100"
        )}
      >
        <ComponentRender
          componentData={userData?.info}
          componentCode={componentCodeData?.info}
        />
        <ComponentRender
          componentData={userData?.certificates}
          componentCode={componentCodeData?.certificates}
        />
        <ComponentRender
          componentData={userData?.education}
          componentCode={componentCodeData?.education}
        />
        <ComponentRender
          componentData={userData?.skills}
          componentCode={componentCodeData?.skills}
        />
        <ComponentRender
          componentData={userData?.projects}
          componentCode={componentCodeData?.projects}
        />
        <ComponentRender
          componentData={userData?.hobbies}
          componentCode={componentCodeData?.hobbies}
        />
        <ComponentRender
          componentData={userData?.languages}
          componentCode={componentCodeData?.languages}
        />
        <ComponentRender
          componentData={userData?.other}
          componentCode={componentCodeData?.other}
        />
      </div>
    </div>
  );
};
