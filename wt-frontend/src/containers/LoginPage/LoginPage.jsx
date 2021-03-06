import { Grid, Hidden } from "@mui/material";
import { login, getPersonalInfo } from "../../api/PublicApi";
import LoginForm from "../../components/LoginForm/LoginForm";
import CustomSnackbar from "../../components/CustomSnackbar/CustomSnackbar";
import LoginImage from "../../assets/LoginImage.jpg";
import { useEffect, useState } from "react";

const LoginPage = () => {
  useEffect(() => {
    const appPassword = window.localStorage.getItem("appPassword");
    setAppPassword(appPassword);
  }, []);
  const [showLoginError, setShowLoginError] = useState(false);
  const [appPassword, setAppPassword] = useState(null);

  const hideLoginError = () => setShowLoginError(false);

  const onLogin = (email, password) => {
    setShowLoginError(false);
    login(email, password)
      .then((response) => {
        const { token } = response.data;
        if (token === null) {
          setShowLoginError(true);
          return;
        }
        getPersonalInfo(token)
          .then((response2) => {
            const { data } = response2;
            window.localStorage.setItem("token", token);
            window.localStorage.setItem("firstname", data.firstname);
            window.localStorage.setItem("lastname", data.lastname);
            window.localStorage.setItem("email", data.email);
            window.localStorage.setItem("role", data.role);
            window.localStorage.setItem("id", data.id);
            window.location.reload();
          })
          .catch(() => setShowLoginError(true));
      })
      .catch(() => setShowLoginError(true));
  };

  return (
    <>
      {showLoginError && (
        <CustomSnackbar
          message="Wrong credentials or the user does not exist"
          onClose={hideLoginError}
          severity="error"
        />
      )}
      <Grid
        className="container"
        container
        justifyContent="center"
        alignItems="center"
      >
        <Hidden smDown>
          <Grid item sm={6}>
            <img
              src={LoginImage}
              alt="login"
              style={{ width: "75%", height: "75%" }}
            />
          </Grid>
        </Hidden>
        <Grid item container xs={11} sm={6}>
          <LoginForm
            appPassword={appPassword}
            onLogin={onLogin}
            showLoginError={showLoginError}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
