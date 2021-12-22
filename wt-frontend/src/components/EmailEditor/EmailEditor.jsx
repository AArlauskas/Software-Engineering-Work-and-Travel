import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EmailEditor = () => {
  const [convertedText, setConvertedText] = useState("");

  return (
    <ReactQuill
      theme="snow"
      value={convertedText}
      onChange={setConvertedText}
    />
  );
};

export default EmailEditor;
