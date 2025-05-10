import { itemsToReplaceFn } from "../../../component-marketplace/ComponentMarketplace.page";
import Handlebars from "handlebars";

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
