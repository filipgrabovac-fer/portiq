import { itemsToReplaceFn } from "../../../component-marketplace/ComponentMarketplace.page";
import { formatHtml } from "../../../component-marketplace/components/ComponentSection.component";
import { useEffect, useRef } from "react";

export const ComponentRender = ({
  componentData,
  componentCode,
}: {
  componentData: any;
  componentCode?: { html: string; css: string; js: string };
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      // Provjeri da je poruka broj (visina)
      if (typeof event.data === "number" && iframeRef.current) {
        iframeRef.current.style.height = event.data + "px";
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

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
          ref={iframeRef}
          srcDoc={`
            <html>
            <head>
            <style>${componentCode.css}</style>
            </head>
            <body>
            <script>
              function sendHeight() {
                window.parent.postMessage(document.body.scrollHeight, '*');
              }
              window.addEventListener('load', sendHeight);
              // Za slučaj dinamičkog sadržaja
              const observer = new MutationObserver(sendHeight);
              observer.observe(document.body, { childList: true, subtree: true, attributes: true });
            <\/script>
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
