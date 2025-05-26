import { createRouter } from "@tanstack/react-router";
import { componentMarketplaceRoute } from "./routes/component-marketplace.routes";
import { developmentRoute } from "./routes/development.routes";
import { homeRoute } from "./routes/home.routes";
import { landingRoute } from "./routes/landing.routes";
import { loginRoute } from "./routes/login.routes";
import { mainLayoutRoute } from "./routes/main-layout.routes";
import { rootRoute } from "./routes/root.routes";
import { webPortfolioRoute } from "./routes/web-portfolio.routes";
import { linkedinDataRoute } from "./routes/linkedin-data.routes";

const routeTree = rootRoute.addChildren([
  landingRoute,
  loginRoute,
  mainLayoutRoute.addChildren([homeRoute, componentMarketplaceRoute]),
  developmentRoute,
  webPortfolioRoute,
  linkedinDataRoute,
]);

export const router = createRouter({ routeTree });
