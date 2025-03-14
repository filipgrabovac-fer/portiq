import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.routes";
import { Login } from "../pages/login/Login.page";

export const loginRoute = createRoute({
  path: "/login",
  component: Login,
  getParentRoute: () => rootRoute,
});
