import { Outlet, useNavigate } from "@tanstack/react-router";
import {
  FileIcon,
  FileUserIcon,
  HomeIcon,
  MenuIcon,
  PaintBucket,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { cn } from "../utils/cn.util";

import QRCode from "react-qr-code";
import { ExportToPdfModal } from "../pages/home/components/export-to-pdf-modal/ExportToPdfModal.component";
import { useGetUserData } from "../pages/home/hooks/useGetUserData.hook";
import { useGetUserId } from "../pages/home/hooks/useGetUserId.hook";
import { developmentRoute } from "../routes/development.routes";
import { homeRoute } from "../routes/home.routes";
import { loginRoute } from "../routes/login.routes";
import { webPortfolioRoute } from "../routes/web-portfolio.routes";
import { logoutApi } from "../schema";
import { componentMarketplaceRoute } from "../routes/component-marketplace.routes";

export const MainLayout = () => {
  const { data: userId } = useGetUserId();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const { data: userData } = useGetUserData();
  const [isExportToPdfActive, setIsExportToPdfActive] = useState(false);
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
          "h-screen w-80 flex flex-col max-sm:absolute max-sm:translate-x-[-100%] max-sm:w-full duration-300 transition-all border-r border-gray-200 bg-gray-50 z-10"
        )}
      >
        <div className="my-auto flex flex-col gap-4 items-center">
          <div className="w-40 m-auto rounded-md flex flex-col justify-center">
            <p
              className={cn(
                "text-black top-[-1.5rem] font-bold z-0 text-center"
              )}
            >
              Scan QR Code
            </p>
            <QRCode
              value={`http://localhost:3000/user/${userId}/web-portfolio`}
              className="w-full h-full"
            />
          </div>
          <div className="flex gap-2">
            <HomeIcon
              className="w-8 h-8 bg-button_blue rounded-md p-1 text-white cursor-pointer"
              onClick={() => {
                setIsSidebarOpen(false);
                navigate({ to: homeRoute.to });
              }}
            />

            <FileUserIcon
              className="w-8 h-8 bg-button_blue rounded-md p-1 text-white cursor-pointer"
              onClick={() => {
                setIsSidebarOpen(false);
                navigate({
                  to: webPortfolioRoute.to,
                  params: { userId: userId },
                });
              }}
            />
            <FileIcon
              className="w-8 h-8 bg-button_blue rounded-md p-1 text-white cursor-pointer"
              onClick={() => setIsExportToPdfActive(true)}
            />
            <PaintBucket
              onClick={() => {
                setIsSidebarOpen(false);

                navigate({ to: componentMarketplaceRoute.to });
              }}
              className="w-8 h-8 bg-button_blue rounded-md p-1 text-white cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <button
            className="bg-button_blue text-white p-2 rounded-md max-w-40 hover:opacity-90  duration-300 cursor-pointer mx-auto"
            onClick={() => navigate({ to: developmentRoute.to })}
          >
            Create a template
          </button>
          <button
            className="bg-none text-red-600 cursor-pointer"
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
