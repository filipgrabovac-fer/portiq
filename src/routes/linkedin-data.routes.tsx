import { createRoute } from "@tanstack/react-router";
import { LinkedinData } from "../pages/linkedin-data/LinkedinData.page";
import { mainLayoutRoute } from "./main-layout.routes";

export const linkedinDataRoute = createRoute({
  path: "/linkedin",
  component: LinkedinData,
  getParentRoute: () => mainLayoutRoute,
});
