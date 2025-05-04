import { createRoute } from "@tanstack/react-router";
import { mainLayoutRoute } from "./main-layout.routes";
import { ComponentMarketplace } from "../pages/component-marketplace/ComponentMarketplace.page";

export const componentMarketplaceRoute = createRoute({
  path: "/component-marketplace",
  component: ComponentMarketplace,
  getParentRoute: () => mainLayoutRoute,
});
