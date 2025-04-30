import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import { Button } from "antd";
import { useState } from "react";
import { cn } from "../utils/cn.util";
import { MenuIcon, XIcon } from "lucide-react";

import { logoutApi } from "../schema";
import { loginRoute } from "../routes/login.routes";
import { developmentRoute } from "../routes/development.routes";
import QRCode from "react-qr-code";

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
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
              value={`http://localhost:3000/user/${123}/web-portfolio`}
              className="w-full h-full"
            />
          </div>
          <Button>Export to pdf</Button>
          <Button>Web Portfolio</Button>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <button
            className="bg-button_blue text-white p-2 rounded-md max-w-40 hover:opacity-90  duration-300 cursor-pointer mx-auto"
            onClick={() => navigate({ to: developmentRoute.to })}
          >
            Create a template
          </button>
          <button
            className="bg-none text-red-600"
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
    </div>
  );
};
