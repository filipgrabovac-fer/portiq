import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./routes/root.routes";
import { loginRoute } from "./routes/login.routes";
import { landingRoute } from "./routes/landing.routes";
import { mainLayoutRoute } from "./routes/main-layout.routes";
import { homeRoute } from "./routes/home.routes";
import { developmentRoute } from "./routes/development.routes";
import { webPortfolioRoute } from "./routes/web-portfolio.routes";
import { componentMarketplaceRoute } from "./routes/component-marketplace.routes";

const routeTree = rootRoute.addChildren([
  landingRoute,
  loginRoute,
  mainLayoutRoute.addChildren([homeRoute, componentMarketplaceRoute]),
  developmentRoute,
  webPortfolioRoute,
]);

export const router = createRouter({ routeTree });
