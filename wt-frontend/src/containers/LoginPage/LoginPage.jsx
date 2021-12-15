import { Grid, Hidden } from "@mui/material";
import LoginForm from "../../components/LoginForm/LoginForm";
import LoginImage from "../../constants/LoginImage.jpg";

const LoginPage = () => {
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
        <LoginForm />
      </Grid>
    </Grid>
  );
};

export default LoginPage;
