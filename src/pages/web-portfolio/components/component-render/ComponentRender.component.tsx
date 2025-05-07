import { itemsToReplaceFn } from "../../../component-marketplace/ComponentMarketplace.page";
import { formatHtml } from "../../../component-marketplace/components/ComponentSection.component";

export const ComponentRender = ({
  componentData,
  componentCode,
}: {
  componentData: any;
  componentCode?: { html: string; css: string; js: string };
}) => {
  if (!componentCode || !componentData) {
    return null;
  }

  return componentData?.map((item: { [key: string]: any }) => {
    const itemsToReplace = itemsToReplaceFn(item);
    const html = formatHtml({
      html: componentCode.html,
      itemsToReplace: itemsToReplace,
    });

    return (
      <div>
        <iframe
          srcDoc={`
            <html>
            <head>
            <style>${componentCode.css}</style>
            </head>
            <body>
            <script>${componentCode.js}<\/script>
            ${html}
            </body>
            </html>
            `}
          sandbox="allow-scripts"
          style={{
            minHeight: "100px",
            width: "100%",
          }}
        />
      </div>
    );
  });
};
