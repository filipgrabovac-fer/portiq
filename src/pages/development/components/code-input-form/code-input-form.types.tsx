export type CodeInputFormProps = {
  html: string;
  css: string;
  js: string;
  title: string;
  setHtml: (html: string) => void;
  setCss: (css: string) => void;
  setJs: (js: string) => void;
  setTitle: (title: string) => void;
};
