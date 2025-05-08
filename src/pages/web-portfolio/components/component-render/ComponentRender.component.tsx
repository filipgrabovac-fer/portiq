import { itemsToReplaceFn } from "../../../component-marketplace/ComponentMarketplace.page";
import { formatHtml } from "../../../component-marketplace/components/ComponentSection.component";
import { useRef } from "react";
import Handlebars from "handlebars";

export const ComponentRender = ({
  componentData,
  componentCode,
}: {
  componentData: any;
  componentCode?: { html: string; css: string; js: string };
}) => {
  const iframeRefs = useRef<(HTMLIFrameElement | null)[]>([]);

  if (!componentCode || !componentData) {
    return null;
  }

  return componentData?.map((item: { [key: string]: any }, idx: number) => {
    const itemsToReplace = itemsToReplaceFn(item);
    const html = formatHtml({
      html: componentCode.html,
      css: componentCode.css,
      js: componentCode.js,
      itemsToReplace: itemsToReplace,
    });

    const template = Handlebars.compile(html);

    return (
      <div
        dangerouslySetInnerHTML={{
          __html: template({}),
        }}
      />
    );
  });
};
