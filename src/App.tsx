import viteLogo from "/vite.svg";
import "./App.css";
import { userApi } from "../generated-client/schema";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function App() {
  const useGetEvents = () => {
    return useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        const req = await userApi.usersList();
        return req;
      },
    });
  };
  const { data } = useGetEvents();
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button>CLICK</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
