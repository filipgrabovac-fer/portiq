import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.routes";
import { WebPortfolio } from "../pages/web-portfolio/WebPortfolio.page";

export const webPortfolioRoute = createRoute({
  path: "/user/$userId/web-portfolio",
  component: WebPortfolio,
  getParentRoute: () => rootRoute,
});
