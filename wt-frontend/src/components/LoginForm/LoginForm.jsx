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

const LoginForm = ({ onLogin, showLoginError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const navigate = useNavigate();

  const onNavigate = (path) => {
    navigate(path);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    resetErrors();
    if (email.length < 8 || !email.includes("@gmail.com")) {
      setShowEmailError(true);
      return;
    }
    // if (password.length !== 19) {
    //   setShowPasswordError(true);
    //   return;
    // }
    onLogin(email, password);
  };

  const resetErrors = () => {
    setShowEmailError(false);
    setShowPasswordError(false);
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
                error={showEmailError}
                helperText={
                  showEmailError &&
                  "Email is invalid. Please provide a valid Gmail email"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="App password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={showPasswordError}
                helperText={
                  showPasswordError &&
                  "Password is invalid. It must follow XXXX-XXXX-XXXX-XXXX pattern"
                }
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
