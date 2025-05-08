import { cn } from "../../../utils/cn.util";
import {
  ComponentSectionProps,
  ComponentTypeMappingEnum,
} from "./component-section.types";

export const formatHtml = ({
  html,
  css,
  js,
  itemsToReplace,
}: {
  html: string;
  css: string;
  js: string;
  itemsToReplace: { key: string; value: string | number }[];
}) => {
  let formattedHtml = html;
  for (const item of itemsToReplace) {
    formattedHtml = formattedHtml.replace(
      `{{${item.key}}}`,
      item.value.toString()
    );
  }

  formattedHtml = `<style>${css}</style><script>${js}</script>${formattedHtml}`;

  return formattedHtml;
};

export const ComponentSection = ({
  data,
  title,
  itemsToReplace,
  selectedComponents,
  setSelectedComponents,
}: ComponentSectionProps) => {
  const preselectedItemKey =
    ComponentTypeMappingEnum[title as keyof typeof ComponentTypeMappingEnum];

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      {data.length == 0 && <p className="mx-auto">No components found</p>}
      {data.map((item) => {
        const html = formatHtml({
          html: item.html,
          itemsToReplace: itemsToReplace,
          css: item.css,
          js: item.js,
        });

        return (
          <div
            className={cn(
              "border rounded-md p-4 flex flex-col gap-2 hover:bg-button_blue hover:text-white transition-all duration-300",
              selectedComponents?.[preselectedItemKey] === item.id
                ? "border-2 border-button_blue"
                : "border-gray-300"
            )}
            key={item.id}
            onClick={() =>
              setSelectedComponents({
                ...selectedComponents,
                [preselectedItemKey]: item.id,
              })
            }
          >
            <h2>{item.title}</h2>
            <div>
              <iframe
                srcDoc={`
            <html>
            <head>
            <style>${item.css}</style>
            </head>
            <body>
            <script>${item.js}<\/script>
            <div>${html}</div>
            </body>
            </html>
            `}
                sandbox="allow-scripts"
                style={{ height: "100%", width: "100%" }}
              />
              {/* <div dangerouslySetInnerHTML={{ __html: html }} /> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};
