import { Input } from "../../../../components/input/Input.component";

type CodeInputFormProps = {
  html: string;
  css: string;
  js: string;
  setHtml: (html: string) => void;
  setCss: (css: string) => void;
  setJs: (js: string) => void;
};

export const CodeInputForm = ({
  html,
  css,
  js,
  setHtml,
  setCss,
  setJs,
}: CodeInputFormProps) => {
  return (
    <div className="flex flex-col gap-8 p-8">
      <Input
        rows={6}
        name="html"
        label="HTML"
        type="textarea"
        placeholder="paste your code here"
        value={html}
        onChange={(value) => setHtml(value)}
      />
      <Input
        rows={6}
        name="css"
        label="CSS"
        type="textarea"
        placeholder="paste your code here"
        value={css}
        onChange={(value) => setCss(value)}
      />
      <Input
        rows={6}
        name="js"
        label="JS"
        type="textarea"
        placeholder="paste your code here"
        value={js}
        onChange={(value) => setJs(value)}
      />
    </div>
  );
};
