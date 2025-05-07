import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { webPortfolioRoute } from "../../routes/web-portfolio.routes";
import { useGetProfileComponentCode } from "./hooks/useGetProfileComponentCode.hook";
import { useGetUserDataById } from "./hooks/useGetUserDataById.hook";
import { ComponentRender } from "./components/component-render/ComponentRender.component";

export const a4Style = {
  width: "210mm",
  height: "297mm",
  margin: "0 auto",
  padding: "20mm",
  backgroundColor: "white",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
};

export const WebPortfolio = () => {
  const { userId } = useParams({ from: webPortfolioRoute.fullPath });
  const { data: componentCodeData } = useGetProfileComponentCode();
  const { data: userData } = useGetUserDataById({ userId: userId });

  const [fullName, setFullName] = useState("");

  useEffect(() => {
    setFullName(
      // @ts-ignore
      `${userData?.info?.[0]?.first_name} ${userData?.info?.[0]?.last_name}`
    );
  }, [userData]);

  return (
    <div className="h-screen">
      <h1 className="text-xl md:text-5xl font-semibold text-center mt-20">
        Welcome to {fullName}
        's Web Portfolio!
      </h1>

      <div>
        <ComponentRender
          componentData={userData?.info}
          componentCode={componentCodeData?.info}
        />
        {/* <ComponentRender
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
        /> */}
      </div>
    </div>
  );
};
