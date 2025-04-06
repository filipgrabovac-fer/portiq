import { Outlet, useNavigate } from "@tanstack/react-router";
import { Button } from "antd";
import { useState } from "react";
import { cn } from "../utils/cn.util";
import { MenuIcon, XIcon } from "lucide-react";

import { logoutApi } from "../schema";
import { loginRoute } from "../routes/login.routes";

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="bg-[linear-gradient(252.35deg,#C180FF99_2.52%,rgba(150,53,241,0.3)_50.43%,#7A6FF699_100.30%,rgba(223,129,129,0.1)_100.29%)] h-screen w-screen flex">
      <button
        className="absolute top-2 left-2 z-10 bg-button_blue rounded-md p-2 max-sm:block hidden"
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
          "h-screen bg-[linear-gradient(600deg,#C180FF_2.52%,rgba(150,53,241,1)_32.43%,#7A6FF6_60.98%,rgba(223,129,129,1)_90.29%)] w-60 flex flex-col max-sm:absolute max-sm:translate-x-[-100%] max-sm:w-full duration-300 transition-all"
        )}
      >
        <div className="my-auto flex flex-col gap-4 items-center">
          <div className="w-40 h-40 m-auto bg-white rounded-md  z-50 relative">
            <p
              className={cn(
                "text-black top-[-1.5rem] font-bold absolute bg-white rounded-md px-2 left-[50%] translate-x-[-50%] w-full pb-2 z-0 text-center"
              )}
            >
              Scan QR Code
            </p>
            <img src="images/icons/qr.svg" className="z-2" alt="logo" />
          </div>
          <Button>Export to pdf</Button>
          <Button>Web Portfolio</Button>
        </div>
        <div className="flex flex-col mt-auto mb-4">
          <button>Create a template</button>
          <button
            className="bg-none text-red-600"
            onClick={async () => {
              await logoutApi.logoutCreate();
              console.log("logging out");
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
