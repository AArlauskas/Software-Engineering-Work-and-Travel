import { Grid, Hidden } from "@mui/material";
import { login, getPersonalInfo } from "../../api/PublicApi";
import LoginForm from "../../components/LoginForm/LoginForm";
import LoginImage from "../../assets/LoginImage.jpg";
import { useState } from "react";

const LoginPage = () => {
  const [showLoginError, setShowLoginError] = useState(false);

  const onLogin = (email, password) => {
    setShowLoginError(false);
    login(email, password)
      .then((response) => {
        const { token } = response.data;
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
        <LoginForm onLogin={onLogin} showLoginError={showLoginError} />
      </Grid>
    </Grid>
  );
};

export default LoginPage;
