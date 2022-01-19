import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EmailEditor = ({ body, setBody }) => {
  return <ReactQuill theme="snow" value={body} onChange={setBody} />;
};

export default EmailEditor;
