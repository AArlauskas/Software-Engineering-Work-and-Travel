import { Grid, Link, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { emailTest, register } from "../../api/PublicApi";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import URI from "../../constants/URI";

const RegisterPage = () => {
  const [isEmailTested, setIsEmailTested] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const [isTestSuccessShowing, setIsTestSuccessShowing] = useState(false);
  const [isTestErrorShowing, setIsTestErrorShowing] = useState(false);
  const [isRegisterSuccessShowing, setIsRegisterSuccessShowing] =
    useState(false);
  const [isRegisterErrorShowing, setIsRegisterErrorShowing] = useState(false);
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");
  const navigate = useNavigate();

  const onNavigate = (path) => {
    navigate(path);
  };

  const onEmailTest = (data) => {
    setIsInProgress(true);
    emailTest(data)
      .then(() => {
        setIsInProgress(false);
        setIsEmailTested(true);
        setIsTestSuccessShowing(true);
      })
      .catch(() => {
        setIsInProgress(false);
        setIsTestErrorShowing(true);
        setIsEmailTested(false);
      });
  };

  const onUserRegister = (data) => {
    register(data)
      .then(() => {
        setIsInProgress(false);
        setIsRegisterSuccessShowing(true);
        window.localStorage.setItem("appPassword", data.password);
      })
      .catch((e) => {
        setIsInProgress(false);
        setRegisterErrorMessage(e.response.data);
        setIsRegisterErrorShowing(true);
      });
  };

  const hideMessages = () => {
    setIsRegisterErrorShowing(false);
    setIsRegisterSuccessShowing(false);
    setIsTestErrorShowing(false);
    setIsTestSuccessShowing(false);
    setRegisterErrorMessage("");
  };

  return (
    <>
      {isInProgress && (
        <CustomSnackbar
          message="Submit in progress..."
          onClose={hideMessages}
          severity="info"
        />
      )}
      {isTestErrorShowing && (
        <CustomSnackbar
          message="Failed to send test email. Double check your email and app password"
          onClose={hideMessages}
          severity="error"
        />
      )}
      {isRegisterErrorShowing && (
        <CustomSnackbar
          message={registerErrorMessage}
          onClose={hideMessages}
          severity="error"
        />
      )}
      {isTestSuccessShowing && (
        <CustomSnackbar
          message="Test email send successfully. Please check your inbox"
          onClose={hideMessages}
          severity="success"
        />
      )}
      {isRegisterSuccessShowing && (
        <CustomSnackbar
          message="Registered successfully. You can now login."
          onClose={hideMessages}
          severity="success"
        />
      )}
      <Grid
        className="container"
        container
        justifyContent="center"
        alignItems="center"
        spacing={0}
      >
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            Don't know how to get the <strong>App password?</strong>
          </Typography>
          <Typography variant="body1" align="center">
            Check out the{" "}
            <Link
              style={{ cursor: "pointer" }}
              color="secondary"
              onClick={() => onNavigate(URI.INSTRUCTIONS)}
            >
              Instructions
            </Link>
          </Typography>
        </Grid>
        <Grid item container xs={12}>
          <RegisterForm
            isTested={isEmailTested}
            inProgress={isInProgress}
            onTest={onEmailTest}
            onSubmit={onUserRegister}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterPage;
