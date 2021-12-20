import {
  Button,
  CardContent,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import URI from "../../constants/URI";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onNavigate = (path) => {
    navigate(path);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };
  return (
    <Paper elevation={4}>
      <CardContent>
        <form onSubmit={onSubmit}>
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
              <TextField
                fullWidth
                placeholder="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="App password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Link
                style={{ cursor: "pointer" }}
                color="secondary"
                onClick={() => onNavigate(URI.REGISTER)}
              >
                Don't have an account yet? <strong>Register!</strong>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                color="secondary"
                type="submit"
              >
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
