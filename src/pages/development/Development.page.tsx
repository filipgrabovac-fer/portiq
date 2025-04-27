import { useEffect, useState } from "react";
import { Checkbox, Tabs, TabsProps } from "antd";
import { CodeInputForm } from "./components/code-input-form/CodeInputForm.component";
import { useNavigate } from "@tanstack/react-router";
import { useSaveCode } from "./hooks/useSaveCode.hook";

type GroupData = {
  title: string;
  html: string;
  css: string;
  js: string;
  type: string;
};

export enum GroupType {
  PERSONAL_INFO = "personal_info",
  SKILL = "skill",
  LANGUAGE = "language",
  PROJECT = "project",
  OTHER = "other",
}

const initialGroupData: GroupData[] = [
  ...Object.values(GroupType).map((type) => ({
    title: "",
    html: "",
    css: "",
    js: "",
    type: type,
  })),
];

export const Development = () => {
  const [groupId, setGroupId] = useState(0);
  const groupData: GroupData[] = initialGroupData;
  const [html, setHtml] = useState<string>("");
  const [css, setCss] = useState<string>("");
  const [js, setJs] = useState<string>("");
  const [createFullTemplate, setCreateFullTemplate] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (key: string) => {
    setGroupId(Number(key));
    const selectedGroupData = groupData[Number(key)];
    setHtml(selectedGroupData.html);
    setCss(selectedGroupData.css);
    setJs(selectedGroupData.js);
    setTitle(selectedGroupData.title);
  };

  useEffect(() => {
    groupData[groupId].html = html;
    groupData[groupId].css = css;
    groupData[groupId].js = js;
    groupData[groupId].title = title;
  }, [html, css, js, title]);

  const items: TabsProps["items"] = [
    {
      key: "0",
      label: "Personal Info",
      children: (
        <CodeInputForm
          html={html}
          css={css}
          js={js}
          title={title}
          setHtml={setHtml}
          setCss={setCss}
          setJs={setJs}
          setTitle={setTitle}
        />
      ),
    },
    {
      key: "1",
      label: "Skills",
      children: (
        <CodeInputForm
          html={html}
          css={css}
          js={js}
          title={title}
          setHtml={setHtml}
          setCss={setCss}
          setJs={setJs}
          setTitle={setTitle}
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
          title={title}
          setHtml={setHtml}
          setCss={setCss}
          setJs={setJs}
          setTitle={setTitle}
        />
      ),
    },
    {
      key: "3",
      label: "Projects",
      children: (
        <CodeInputForm
          html={html}
          css={css}
          js={js}
          title={title}
          setHtml={setHtml}
          setCss={setCss}
          setJs={setJs}
          setTitle={setTitle}
        />
      ),
    },
    {
      key: "4",
      label: "Other",
      children: (
        <CodeInputForm
          html={html}
          css={css}
          js={js}
          title={title}
          setHtml={setHtml}
          setCss={setCss}
          setJs={setJs}
          setTitle={setTitle}
        />
      ),
    },
  ];

  const { mutate: saveCode } = useSaveCode();

  const handleSave = () => {
    saveCode({ groupData: groupData, createFullTemplate: createFullTemplate });
  };

  return (
    <div className="w-screen h-screen">
      <div className="max-sm:hidden mt-20 w-4/5 md:w-1/2 m-auto">
        <div className="flex flex-col gap-2 ">
          <h1 className="text-3xl md:text-5xl font-semibold">
            Create your own design!
          </h1>
          <h3 className="text-sm md:text-base text-gray-500">
            Below you can paste your code (HTML, CSS, JS)
          </h3>
        </div>
        <div className="mt-4">
          <Tabs items={items} onChange={handleChange} />
        </div>
        <div className="flex ml-auto px-8 justify-between">
          <div className="flex gap-4 items-center">
            <Checkbox
              onChange={() => setCreateFullTemplate(!createFullTemplate)}
            />
            Create full template
          </div>
          <div className="flex gap-4">
            <div className="m-auto w-max ">
              <button
                className="text-red-500 p-2 rounded-md max-w-40 hover:opacity-90  duration-300 cursor-pointer"
                onClick={() => navigate({ to: "/home" })}
              >
                Discard
              </button>
            </div>
            <div className="m-auto w-max">
              <button
                className="bg-button_blue text-white p-2 rounded-md max-w-40 hover:opacity-90  duration-300 cursor-pointer"
                onClick={handleSave}
              >
                Save template
              </button>
            </div>
          </div>
        </div>
      </div>

      <h1 className="sm:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        You can create templates only on desktop!
      </h1>
    </div>
  );
};
