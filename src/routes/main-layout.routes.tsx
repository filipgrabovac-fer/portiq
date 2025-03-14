import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.routes";
import { MainLayout } from "../layouts/Main.layout";

export const mainLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "main-layout",
  component: MainLayout,
});
