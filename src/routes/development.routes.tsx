import { createRoute } from "@tanstack/react-router";
import { Development } from "../pages/development/Development.page";
import { rootRoute } from "./root.routes";

export const developmentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dev",
  component: Development,
});
