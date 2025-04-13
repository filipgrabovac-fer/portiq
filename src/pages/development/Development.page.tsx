import { useEffect, useState } from "react";
import { Tabs, TabsProps } from "antd";
import { CodeInputForm } from "./components/code-input-form/CodeInputForm.component";
import { group } from "console";

type GroupData = {
  html: string;
  css: string;
  js: string;
};

const initialGroupData: GroupData[] = [
  {
    html: "",
    css: "",
    js: "",
  },
  {
    html: "",
    css: "",
    js: "",
  },
  {
    html: "",
    css: "",
    js: "",
  },
  {
    html: "",
    css: "",
    js: "",
  },
  {
    html: "",
    css: "",
    js: "",
  },
];

export const Development = () => {
  const [groupId, setGroupId] = useState(0);
  const groupData: GroupData[] = initialGroupData;
  const [html, setHtml] = useState<string>("");
  const [css, setCss] = useState<string>("");
  const [js, setJs] = useState<string>("");

  const handleChange = (key: string) => {
    setGroupId(Number(key));
    const selectedGroupData = groupData[Number(key)];
    setHtml(selectedGroupData.html);
    setCss(selectedGroupData.css);
    setJs(selectedGroupData.js);
  };

  useEffect(() => {
    groupData[groupId].html = html;
    groupData[groupId].css = css;
    groupData[groupId].js = js;
  }, [html, css, js]);

  const items: TabsProps["items"] = [
    {
      key: "0",
      label: "Personal Info",
      children: (
        <CodeInputForm
          html={html}
          css={css}
          js={js}
          setHtml={setHtml}
          setCss={setCss}
          setJs={setJs}
        />
      ),
    },
    {
      key: "1",
      label: "Tab 2",
      children: (
        <CodeInputForm
          html={html}
          css={css}
          js={js}
          setHtml={setHtml}
          setCss={setCss}
          setJs={setJs}
        />
      ),
    },
    {
      key: "2",
      label: "Languages",
      children: (
        <CodeInputForm
          html={html}
          css={css}
          js={js}
          setHtml={setHtml}
          setCss={setCss}
          setJs={setJs}
        />
      ),
    },
  ];

  return (
    <div className="w-screen h-screen">
      <div className="max-sm:hidden">
        <div className="m-auto w-max flex flex-col gap-2 p-8 ">
          <h1 className="text-3xl md:text-5xl font-semibold">
            Create your own template!
          </h1>
          <h3 className="text-sm md:text-xl">
            Below you can paste your code (HTML, CSS, JS) and save it as a new
            template
          </h3>
        </div>
        <div className="w-3/5 m-auto">
          <Tabs items={items} onChange={handleChange} />
        </div>
      </div>
      <h1 className="sm:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        You can create templates only on desktop!
      </h1>
    </div>
  );
};
