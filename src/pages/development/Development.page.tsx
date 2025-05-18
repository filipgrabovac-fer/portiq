import { useNavigate } from "@tanstack/react-router";
import { Tabs } from "antd";
import { InfoIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { homeRoute } from "../../routes/home.routes";
import { CodeInputForm } from "./components/code-input-form/CodeInputForm.component";
import {
  componentInfo,
  GroupData,
  initialGroupData,
  items,
} from "./development.types";
import { usePostProfileComponentCode } from "./hooks/usePostProfileComponentCode";

export const Development = () => {
  const [groupId, setGroupId] = useState(0);
  const groupData: GroupData[] = initialGroupData;
  const [html, setHtml] = useState<string>("");
  const [css, setCss] = useState<string>("");
  const [js, setJs] = useState<string>("");
  const [createFullTemplate, setCreateFullTemplate] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const navigate = useNavigate();

  const [infoModalOpen, setInfoModalOpen] = useState<boolean>(false);

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

  const { mutate: saveCode } = usePostProfileComponentCode({
    onSuccess: () => navigate({ to: homeRoute.to }),
  });
  const handleSave = () => {
    saveCode({ groupData: groupData, createFullTemplate: createFullTemplate });
  };

  return (
    <>
      <div className="w-screen h-screen">
        {infoModalOpen && (
          <div className="absolute h-screen w-screen bg-black/50 flex justify-center items-center -mt-20 z-100">
            <div className=" bg-white p-8 rounded-md flex flex-col gap-4 relative">
              <XIcon
                onClick={() => setInfoModalOpen(false)}
                className="absolute top-4 right-4 cursor-pointer"
              />
              <p className="text-3xl font-semibold ">
                Variables you can use based on the component you are building:
              </p>

              <div className="flex flex-wrap gap-8">
                {componentInfo.map((info) => (
                  <div>
                    <label className="text-xl font-semibold">
                      {info.label}
                    </label>
                    <ul>
                      {info.variables.map((variable) => (
                        <li>- {variable}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                When submitting code, please make sure all of your variables
                have {`{{`} and {`}}`} around them so the data can be properly
                parsed.
              </p>
            </div>
          </div>
        )}
        <div className="max-sm:hidden mt-20 w-4/5 md:w-1/2 m-auto">
          <div className="flex flex-col gap-2 ">
            <div className="flex gap-8 items-center">
              <h1 className="text-3xl md:text-5xl font-semibold">
                Create your own design!
              </h1>
              <InfoIcon
                onClick={() => setInfoModalOpen(true)}
                className="cursor-pointer"
              />
            </div>
            <h3 className="text-sm md:text-base text-gray-500">
              Below you can paste your code (HTML, CSS, JS)
            </h3>
          </div>

          <div className="mt-4">
            <Tabs
              items={items?.map((item) => ({
                ...item,
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
              }))}
              onChange={handleChange}
            />
          </div>
          <div className="flex ml-auto px-8 justify-between">
            <div className="flex gap-4 ml-auto">
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
    </>
  );
};
