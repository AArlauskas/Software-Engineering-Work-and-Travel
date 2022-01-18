import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import EmailEditor from "../../components/EmailEditor/EmailEditor";

const EmailerPage = ({ onNext, data }) => {
  const [header, setHeader] = useState(data?.header || "");
  const [body, setBody] = useState(data?.body || "");

  const onNextClick = () => {
    if (onNext === undefined) return;
    const data = {
      header,
      body,
    };
    onNext(data);
  };
  return (
    <Grid className="grow-container" container spacing={2}>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Email header"
          type="text"
          value={header}
          onChange={(e) => setHeader(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <EmailEditor body={body} setBody={setBody} />
      </Grid>
      {onNext && (
        <Grid
          container
          item
          xs={12}
          justifyContent="flex-end"
          alignContent="flex-end"
        >
          <Grid item xs={2}>
            <Button variant="contained" onClick={onNextClick}>
              Next
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default EmailerPage;
