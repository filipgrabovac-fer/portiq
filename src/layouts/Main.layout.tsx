import { Outlet, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
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

import { Popover } from "antd";
import QRCode from "react-qr-code";
import { ExportToPdfModal } from "../pages/home/components/export-to-pdf-modal/ExportToPdfModal.component";
import { useGetUserData } from "../pages/home/hooks/useGetUserData.hook";
import { useGetUserId } from "../pages/home/hooks/useGetUserId.hook";
import { componentMarketplaceRoute } from "../routes/component-marketplace.routes";
import { developmentRoute } from "../routes/development.routes";
import { homeRoute } from "../routes/home.routes";
import { loginRoute } from "../routes/login.routes";
import { webPortfolioRoute } from "../routes/web-portfolio.routes";
import { logoutApi, userApi, userDetailsApi } from "../schema";
import {
  NavigationIcon,
  NavigationIconProps,
} from "./components/NavigationIcon.component";
import { useGetUserJsonData } from "./hooks/useGetUserJsonData.hook";

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
  const { mutate: getUserJsonData } = useGetUserJsonData();

  const content = (
    <>
      <button
        className="w-full text-button_blue hover:bg-button_blue/20 p-2 rounded-md transition-all duration-300 cursor-pointer"
        onClick={() => navigate({ to: developmentRoute.to })}
      >
        Create template
      </button>
      <a
        className="w-full text-button_blue hover:bg-button_blue/20 p-2 transition-all duration-300 cursor-pointer text-center"
        href="/api/user-details/export-user-data/"
      >
        Export to JSON
      </a>
      <button
        className="w-full text-red-500 hover:bg-red-500/20 p-2 rounded-md transition-all duration-300 cursor-pointer"
        onClick={async () => {
          await logoutApi.logoutCreate();
          navigate({ to: loginRoute.to });
        }}
      >
        Logout
      </button>
    </>
  );
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
        <div className="w-full bg-white flex gap-2  items-center h-16 justify-between">
          <img
            // @ts-ignore
            src={userData?.info?.[0]?.image_url ?? ""}
            className="w-10 h-10 rounded-full z-100 ml-2 hidden sm:block"
            alt=""
          />
          <Popover
            content={content}
            title=""
            placement="bottomRight"
            arrow={false}
            trigger="click"
          >
            <div className="p-2 border border-gray-200 rounded-md mr-2 ml-auto">
              <ChevronDown className="w-6 h-6 cursor-pointer" />
            </div>
          </Popover>
        </div>
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
