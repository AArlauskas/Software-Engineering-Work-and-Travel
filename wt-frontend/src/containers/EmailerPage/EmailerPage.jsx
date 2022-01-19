import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import EmailEditor from "../../components/EmailEditor/EmailEditor";

const EmailerPage = ({ onNext, data }) => {
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (data?.header !== undefined) {
      setHeader(data.header);
    }
    if (data?.body !== undefined) {
      setBody(data.body);
    }
  }, [data]);

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
        {console.log(data)}
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
            <Button
              variant="contained"
              onClick={onNextClick}
              disabled={header.length === 0}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default EmailerPage;
