import { Button, Grid, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { sendEmailTestTemplate } from "../../api/Api";
import EmailEditor from "../../components/EmailEditor/EmailEditor";

const EmailerPage = ({ onNext, data }) => {
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  const [isEmailSending, setIsEmailSending] = useState(false);

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

  const onEmailTemplateTestClick = () => {
    const data = {
      header,
      body,
    };
    setIsEmailSending(true);
    sendEmailTestTemplate(data)
      .then(() => {
        alert("email sent successfully. Check your inbox");
      })
      .catch((e) => {
        alert(e.response.data);
      })
      .finally(() => {
        setIsEmailSending(false);
      });
  };
  return (
    <Grid className="grow-container" container spacing={2}>
      <Grid item container justifyContent="space-between">
        <Grid item xs={3}>
          <LoadingButton
            variant="contained"
            disabled={header.length === 0}
            onClick={onEmailTemplateTestClick}
            loading={isEmailSending}
          >
            Test email
          </LoadingButton>
        </Grid>
      </Grid>
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
