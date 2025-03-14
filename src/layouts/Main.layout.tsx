import { Outlet } from "@tanstack/react-router";
import { Button } from "antd";
import { useState } from "react";
import { cn } from "../utils/cn.util";

export const MainLayout = () => {
  const [isQRCodeVisible, setIsQRCodeVisible] = useState(false);

  return (
    <div className="bg-[linear-gradient(252.35deg,#C180FF99_2.52%,rgba(150,53,241,0.3)_50.43%,#7A6FF699_100.30%,rgba(223,129,129,0.1)_100.29%)] h-screen w-screen flex">
      <div className=" h-screen bg-[linear-gradient(600deg,#C180FF_2.52%,rgba(150,53,241,0.8)_32.43%,#7A6FF6_60.98%,rgba(223,129,129,0.9)_90.29%)] w-60 flex flex-col">
        <div className="my-auto flex flex-col gap-4 items-center">
          <div
            className="w-40 h-40 m-auto bg-white rounded-md p-4 cursor-pointer z-50 relative"
            onClick={() => setIsQRCodeVisible(!isQRCodeVisible)}
          >
            <p
              className={cn(
                "text-black top-[-1.5rem] font-bold absolute bg-white rounded-md px-2 left-[50%] translate-x-[-50%] w-full pb-2 z-0 text-center",
                isQRCodeVisible
                  ? " translate-y-10 duration-300 transition-all hidden "
                  : "block translate-y-0 duration-300 transition-all"
              )}
            >
              Reveal QR code!
            </p>
            {!isQRCodeVisible ? (
              <img
                src="images/icons/avatar-icon.svg"
                className="z-2"
                alt="logo"
              />
            ) : (
              <p>QR Code</p>
            )}
          </div>
          <Button>Export to pdf</Button>
          <Button>Web Portfolio</Button>
        </div>
        <div className="flex flex-col mt-auto mb-4">
          <button>Create a template</button>
          <button className="bg-none text-red-600">Logout</button>
        </div>
      </div>

      <div className="w-full h-full overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};
