import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./root.routes";
import { loginRoute } from "./login.routes";
import { landingRoute } from "./landing.routes";
import { mainLayoutRoute } from "./main-layout.routes";
import { homeRoute } from "./home.routes";

const routeTree = rootRoute.addChildren([
  landingRoute,
  loginRoute,
  mainLayoutRoute.addChildren([homeRoute]),
]);

export const router = createRouter({ routeTree });
