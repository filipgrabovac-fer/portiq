import { useParams } from "@tanstack/react-router";
import { useGetUserDataById } from "./hooks/useGetUserDataById.hook";
import { webPortfolioRoute } from "../../routes/web-portfolio.routes";
import { formatHtml } from "../component-marketplace/components/ComponentSection.component";
import { itemsToReplaceFn } from "../component-marketplace/ComponentMarketplace.page";

export const a4Style = {
  width: "210mm",
  height: "297mm",
  margin: "0 auto",
  padding: "20mm",
  backgroundColor: "white",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
};

export const WebPortfolio = () => {
  const { userId } = useParams({ from: webPortfolioRoute.fullPath });
  const { data: userData } = useGetUserDataById({ userId: userId });
  const fullName = `${userData?.info.first_name} ${userData?.info.last_name}`;

  return (
    <div>
      <h1 className="text-xl md:text-5xl font-semibold text-center mt-20">
        Welcome to {fullName}'s Web Portfolio!
      </h1>

      <div>
        {" "}
        {userData?.info &&
          userData?.info?.map((item) => {
            const itemsToReplace = itemsToReplaceFn(item);
            console.log(itemsToReplace);

            const html = "null";

            // const html = formatHtml({
            //   html: item.html,
            //   itemsToReplace: itemsToReplace,
            // });

            return (
              <div>
                <h2>{item.title}</h2>
                <div>
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                  <iframe
                    srcDoc={`
            <html>
            <head>
            <style>${item.css}</style>
            </head>
            <body>
            <script>${item.js}<\/script>
            </body>
            </html>
            `}
                    sandbox="allow-scripts"
                    style={{ height: 0 }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
