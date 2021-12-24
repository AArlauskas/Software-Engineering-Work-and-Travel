import { Grid, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import URI from "../../constants/URI";

const RegisterPage = () => {
  const navigate = useNavigate();

  const onNavigate = (path) => {
    navigate(path);
  };

  return (
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
        <RegisterForm />
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
