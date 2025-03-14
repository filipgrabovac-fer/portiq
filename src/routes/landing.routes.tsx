import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.routes";
import { Landing } from "../pages/landing/Landing.page";

export const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Landing,
});
