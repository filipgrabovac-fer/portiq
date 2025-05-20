import { useParams } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { webPortfolioRoute } from "../../routes/web-portfolio.routes";
import { cn } from "../../utils/cn.util";
import { ComponentRender } from "./components/component-render/ComponentRender.component";
import { useGetProfileComponentCode } from "./hooks/useGetProfileComponentCode.hook";
import { useGetUserDataById } from "./hooks/useGetUserDataById.hook";

export const WebPortfolio = () => {
  const { userId } = useParams({ from: webPortfolioRoute.fullPath });
  const { data: componentCodeData } = useGetProfileComponentCode();
  const { data: userData } = useGetUserDataById({ userId: userId });

  const pdfRef = useRef<HTMLDivElement>(null);

  const [fullName, setFullName] = useState("");

  useEffect(() => {
    setFullName(
      // @ts-ignore
      `${userData?.info?.[0]?.first_name} ${userData?.info?.[0]?.last_name}`
    );
  }, [userData]);

  return (
    <div className="h-screen">
      <div className="flex justify-center items-center mt-10 px-20 gap-4">
        <h1 className="text-xl md:text-5xl font-semibold text-center">
          Welcome to {fullName}
          's Web Portfolio!
        </h1>
      </div>

      <div
        ref={pdfRef}
        className={cn("transition-all duration-300 mx-auto outline-gray-200 ")}
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
        <ComponentRender
          componentData={userData?.references}
          componentCode={componentCodeData?.references}
        />
        <ComponentRender
          componentData={userData?.workExperiences}
          componentCode={componentCodeData?.workExperiences}
        />
      </div>
    </div>
  );
};
