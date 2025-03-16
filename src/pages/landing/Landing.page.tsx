import { useNavigate } from "@tanstack/react-router";
import { homeRoute } from "../../routes/home.routes";

export const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[linear-gradient(252.35deg,#C180FF_2.52%,rgba(150,53,241,0.8)_32.43%,#7A6FF6_60.98%,rgba(223,129,129,0.9)_90.29%)] h-screen w-screen flex items-center justify-center">
      <div className="text-center flex flex-col items-center gap-4 w-full lg:w-3/5 p-4">
        <h1 className="lg:text-5xl md:text-3xl text-2xl font-bold opacity-80 text-white hover:scale-105 transition-all duration-200 cursor-default">
          Welcome to PortIQ - create your professional CV today!
        </h1>
        <h2 className="text-white opacity-80 italic hover:scale-105 transition-all duration-200 cursor-default md:text-base text-xs">
          lorem ipsum text summa summaroum
        </h2>

        <button
          className={
            "bg-button_blue p-3 rounded-lg text-white lg:text-xl text-base font-semibold w-[200px] cursor-pointer hover:scale-105 transition-all duration-200 max-sm:w-11/12 max-sm:absolute max-sm:bottom-4 "
          }
          onClick={() => navigate({ to: homeRoute.to })}
        >
          Create CV
        </button>
      </div>
    </div>
  );
};
