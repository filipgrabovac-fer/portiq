import { Outlet, useNavigate } from "@tanstack/react-router";
import {
  FileIcon,
  FileUserIcon,
  HomeIcon,
  MenuIcon,
  PaintBucket,
  PaperclipIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { cn } from "../utils/cn.util";

import QRCode from "react-qr-code";
import { ExportToPdfModal } from "../pages/home/components/export-to-pdf-modal/ExportToPdfModal.component";
import { useGetUserData } from "../pages/home/hooks/useGetUserData.hook";
import { useGetUserId } from "../pages/home/hooks/useGetUserId.hook";
import { componentMarketplaceRoute } from "../routes/component-marketplace.routes";
import { developmentRoute } from "../routes/development.routes";
import { homeRoute } from "../routes/home.routes";
import { loginRoute } from "../routes/login.routes";
import { webPortfolioRoute } from "../routes/web-portfolio.routes";
import { logoutApi } from "../schema";
import {
  NavigationIcon,
  NavigationIconProps,
} from "./components/NavigationIcon.component";

export const MainLayout = () => {
  const { data: userId } = useGetUserId();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const { data: userData } = useGetUserData();
  const [isExportToPdfActive, setIsExportToPdfActive] = useState(false);

  const navigationIcons: NavigationIconProps[] = [
    {
      text: "Home",
      Icon: HomeIcon,
      setAction: () => {
        setIsSidebarOpen(false);
        navigate({ to: homeRoute.to });
      },
    },
    {
      text: "Portfolio",
      Icon: FileUserIcon,
      setAction: () => {
        setIsSidebarOpen(false);
        navigate({ to: webPortfolioRoute.to, params: { userId } });
      },
    },
    {
      text: "PDF",
      Icon: FileIcon,
      setAction: () => setIsExportToPdfActive(true),
    },
    {
      text: "Style",
      Icon: PaintBucket,
      setAction: () => {
        setIsSidebarOpen(false);
        navigate({ to: componentMarketplaceRoute.to });
      },
    },
  ];

  const webPortfolioUrl = `http://localhost:3000/user/${userId}/web-portfolio`;
  return (
    <div className="h-screen w-screen flex">
      <button
        className="absolute top-2 left-2 z-20 bg-button_blue rounded-md p-2 max-sm:block hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <XIcon width={24} height={24} color="white" />
        ) : (
          <MenuIcon width={24} height={24} color="white" />
        )}
      </button>
      <div
        className={cn(
          isSidebarOpen && "max-sm:translate-x-[0]",
          "h-screen w-120 flex flex-col max-sm:absolute max-sm:translate-x-[-100%] max-sm:w-full duration-300 transition-all border-r border-gray-200 bg-gray-50 z-10"
        )}
      >
        <div className="my-auto flex flex-col gap-6 items-center">
          <div className="w-40 m-auto rounded-md flex flex-col justify-center">
            <div
              className={cn(
                "text-black top-[-1.5rem] font-bold z-0 text-center flex items-center gap-2 mx-auto m-2"
              )}
            >
              <p>Share QR Code</p>
              <PaperclipIcon
                className="w-6 h-6 cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(webPortfolioUrl);
                }}
              />
            </div>
            <QRCode value={webPortfolioUrl} className="w-full h-full" />
          </div>
          <div className="flex w-4/5 gap-2 flex-wrap ">
            {navigationIcons.map((icon) => (
              <NavigationIcon key={icon.text} {...icon} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <button
            className="bg-white hover:bg-button_blue/20 text-button_blue p-3 rounded-md max-w-40 hover:opacity-90  cursor-pointer mx-auto transition-all duration-300"
            onClick={() => navigate({ to: developmentRoute.to })}
          >
            Create template
          </button>
          <button
            className="bg-white p-3 text-red-500 cursor-pointer rounded-md max-w-40 mx-auto hover:bg-red-500/20 transition-all duration-300"
            onClick={async () => {
              await logoutApi.logoutCreate();
              navigate({ to: loginRoute.to });
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="w-full h-full overflow-y-scroll">
        <Outlet />
      </div>
      {isExportToPdfActive && userData && (
        <ExportToPdfModal
          userData={userData}
          setIsModalOpen={setIsExportToPdfActive}
        />
      )}
    </div>
  );
};
