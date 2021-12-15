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

const LoginForm = () => {
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
                Login
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth placeholder="email" type="email" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth placeholder="password" type="password" />
            </Grid>
            <Grid item xs={12}>
              <Link
                style={{ cursor: "pointer" }}
                onClick={() => onNavigate(URI.REGISTER)}
              >
                Don't have an account yet? Register!
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth color="secondary">
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Paper>
  );
};

export default LoginForm;
