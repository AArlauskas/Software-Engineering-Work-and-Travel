import {
  Button,
  CardContent,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import URI from "../../constants/URI";

const RegisterForm = () => {
  const navigate = useNavigate();

  const onNavigate = (path) => {
    navigate(path);
  };
  return (
    <Paper elevation={4}>
      <CardContent>
        <form>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <Typography align="center" variant="h5">
                Register
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField fullWidth placeholder="First name" type="text" />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField fullWidth placeholder="Last name" type="text" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth placeholder="email" type="email" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth placeholder="App password" type="password" />
            </Grid>
            <Grid item xs={12}>
              <Link
                style={{ cursor: "pointer" }}
                onClick={() => onNavigate(URI.LOGIN)}
              >
                Already have an account? <strong>Login!</strong>
              </Link>
            </Grid>
            <Grid item md={6} xs={12}>
              <Button variant="outlined" fullWidth color="secondary">
                Test email
              </Button>
            </Grid>
            <Grid item md={6} xs={12}>
              <Button variant="contained" fullWidth color="secondary" disabled>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Paper>
  );
};

export default RegisterForm;
