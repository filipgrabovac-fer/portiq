import { Input } from "../../../../components/input/Input.component";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { CodeInputFormProps } from "./code-input-form.types";

export const CodeInputForm = ({
  html,
  css,
  js,
  title,
  setHtml,
  setCss,
  setJs,
  setTitle,
}: CodeInputFormProps) => {
  return (
    <>
      <style>
        {`#code-input::placeholder {
          color: gray;
        }`}
      </style>
      <div className="flex flex-col gap-8 p-8">
        <Input
          rows={6}
          name="title"
          label="Title"
          type="text"
          placeholder="title"
          value={title}
          onChange={(value) => setTitle(value)}
        />
        <div className="relative">
          <label htmlFor="html" className="absolute top-[-1.5rem] left-2">
            HTML
          </label>
          <CodeEditor
            id="code-input"
            value={html}
            language="html"
            placeholder="Please enter HTML code."
            onChange={(el) => setHtml(el.target.value)}
            padding={15}
            style={{
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "0.2rem",
              color: "#111D4A",
              minHeight: "10rem",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
          />
        </div>
        <div className="relative">
          <label htmlFor="css" className="absolute top-[-1.5rem] left-2">
            CSS
          </label>
          <CodeEditor
            id="code-input"
            value={css}
            language="css"
            placeholder="Please enter CSS code."
            onChange={(el) => setCss(el.target.value)}
            padding={15}
            style={{
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "0.2rem",
              color: "#111D4A",
              minHeight: "10rem",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
          />
        </div>
        <div className="relative">
          <label htmlFor="js" className="absolute top-[-1.5rem] left-2">
            JS
          </label>
          <CodeEditor
            id="code-input"
            value={js}
            language="js"
            placeholder="Please enter JS code."
            onChange={(el) => setJs(el.target.value)}
            padding={15}
            style={{
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "0.2rem",
              color: "#111D4A",
              minHeight: "10rem",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
          />
        </div>
      </div>
    </>
  );
};
