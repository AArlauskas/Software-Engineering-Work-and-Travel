import { DropzoneArea } from "material-ui-dropzone";

const FileUploader = () => {
  return (
    <DropzoneArea
      filesLimit={2}
      maxFileSize={5000000}
      onChange={(files) => console.log(files)}
    />
  );
};

export default FileUploader;
