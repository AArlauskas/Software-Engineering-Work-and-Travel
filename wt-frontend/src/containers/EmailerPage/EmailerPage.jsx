import { Grid, TextField } from "@mui/material";
import EmailEditor from "../../components/EmailEditor/EmailEditor";
import FileUploader from "../../components/FileUploader/FileUploader";

const EmailerPage = () => {
  return (
    <Grid className="grow-container" container spacing={2}>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Email header"
          type="text"
        />
      </Grid>
      <Grid item xs={12}>
        <EmailEditor />
      </Grid>
      <Grid item xs={12}>
        <FileUploader />
      </Grid>
    </Grid>
  );
};

export default EmailerPage;
