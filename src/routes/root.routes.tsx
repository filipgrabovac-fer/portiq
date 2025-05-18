import { createRootRoute, Outlet, redirect } from "@tanstack/react-router";
import { getUserLoggedIn } from "../hooks/useGetUserLoggedIn.hook";
import { loginRoute } from "./login.routes";

const excludedRoutes = ["/login", "/", "/static", "/media"];

export const rootRoute = createRootRoute({
  // beforeLoad: async ({ location }) => {
  //   const data = await getUserLoggedIn();

  //   if (!data?.idUser && !excludedRoutes.includes(location.pathname)) {
  //     throw redirect({ to: loginRoute.to });
  //   }
  // },

  component: () => <Outlet />,
});
