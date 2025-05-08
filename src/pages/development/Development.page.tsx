import { useNavigate } from "@tanstack/react-router";
import { Checkbox, Tabs, TabsProps } from "antd";
import { InfoIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { CodeInputForm } from "./components/code-input-form/CodeInputForm.component";
import { usePostProfileComponentCode } from "./hooks/usePostProfileComponentCode";
import { homeRoute } from "../../routes/home.routes";

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
  CERTIFICATE = "certificate",
  EDUCATION = "education",
  HOBBY = "hobby",
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

const items: TabsProps["items"] = [
  {
    key: "0",
    label: "Personal Info",
    children: null,
  },
  {
    key: "1",
    label: "Skills",
    children: null,
  },
  {
    key: "2",
    label: "Languages",
    children: null,
  },
  {
    key: "3",
    label: "Projects",
    children: null,
  },
  {
    key: "4",
    label: "Certificates",
    children: null,
  },
  {
    key: "5",
    label: "Education",
    children: null,
  },
  {
    key: "6",
    label: "Hobbies",
    children: null,
  },
  {
    key: "7",
    label: "Other",
    children: null,
  },
];
const componentInfo = [
  {
    label: "User Info",
    variables: [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "imageUrl",
      "address",
      "city",
      "state",
      "zipCode",
      "country",
    ],
  },
  {
    label: "Certificates",
    variables: [
      "title",
      "description",
      "startDate",
      "endDate",
      "location",
      "link",
      "createdAt",
    ],
  },
  {
    label: "Education",
    variables: [
      "title",
      "description",
      "location",
      "type",
      "startDate",
      "endDate",
      "link",
      "createdAt",
    ],
  },
  {
    label: "Skills",
    variables: [
      "title",
      "description",
      "location",
      "level",
      "link",
      "createdAt",
    ],
  },
  {
    label: "Languages",
    variables: ["title", "level"],
  },
  {
    label: "Projects",
    variables: [
      "title",
      "description",
      "startDate",
      "endDate",
      "location",
      "link",
      "createdAt",
    ],
  },
  {
    label: "Hobbies",
    variables: ["title", "description", "createdAt"],
  },
  {
    label: "Other",
    variables: [
      "title",
      "description",
      "startDate",
      "endDate",
      "location",
      "link",
      "createdAt",
    ],
  },
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
              items={items.map((item) => ({
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
            {/* <div className="flex gap-4 items-center">
              <Checkbox
                onChange={() => setCreateFullTemplate(!createFullTemplate)}
              />
              Create full template
            </div> */}
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
