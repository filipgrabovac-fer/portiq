import { createRoute } from "@tanstack/react-router";
import { mainLayoutRoute } from "./main-layout.routes";
import { Home } from "../pages/home/Home.page";

export const homeRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: "/home",
  component: Home,
});
