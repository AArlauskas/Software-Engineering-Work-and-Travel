import { useState } from "react";
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

const RegisterForm = ({ isTested, inProgress, onTest, onSubmit }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isFirstnameErrorShowing, setIsFirstnameErrorShowing] = useState(false);
  const [isLastnameErrorShowing, setIsLastnameErrorShowing] = useState(false);
  const [isEmailErrorShowing, setIsEmailErrorShowing] = useState(false);
  const [isPasswordErrorShowing, setIsPasswordErrorShowing] = useState(false);

  const onEmailTest = () => {
    resetErrors();
    if (!isFormValid()) return;
    const data = {
      mail: email,
      password,
    };
    onTest(data);
  };

  const onFormSubmit = () => {
    resetErrors();
    if (!isFormValid()) return;
    const data = {
      firstname,
      lastname,
      email,
      password,
    };
    onSubmit(data);
  };

  const isFormValid = () => {
    if (firstname.length < 2 || firstname.length > 15) {
      setIsFirstnameErrorShowing(true);
      return false;
    }

    if (lastname.length < 2 || lastname.length > 15) {
      setIsLastnameErrorShowing(true);
      return false;
    }

    if (
      email.length < 2 ||
      firstname.length > 30 ||
      !email.includes("@gmail.com")
    ) {
      setIsEmailErrorShowing(true);
      return false;
    }

    if (password.length !== 16) {
      setIsPasswordErrorShowing(true);
      return false;
    }
    return true;
  };

  const resetErrors = () => {
    setIsFirstnameErrorShowing(false);
    setIsLastnameErrorShowing(false);
    setIsEmailErrorShowing(false);
    setIsPasswordErrorShowing(false);
  };

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
              <TextField
                fullWidth
                placeholder="First name"
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                error={isFirstnameErrorShowing}
                helperText={isFirstnameErrorShowing && "First name is invalid."}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                placeholder="Last name"
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                error={isLastnameErrorShowing}
                helperText={isLastnameErrorShowing && "Last name is invalid."}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={isEmailErrorShowing}
                helperText={
                  isFirstnameErrorShowing &&
                  "Email format is invalid. Please use gmail account."
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
                error={isPasswordErrorShowing}
                helperText={
                  isFirstnameErrorShowing &&
                  "Password format is invalid. It must be 16 characters provided by google security"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Link
                style={{ cursor: "pointer" }}
                color="secondary"
                onClick={() => onNavigate(URI.LOGIN)}
              >
                Already have an account? <strong>Login!</strong>
              </Link>
            </Grid>
            <Grid item md={6} xs={12}>
              <Button
                variant="outlined"
                fullWidth
                color="secondary"
                disabled={isTested || inProgress}
                onClick={onEmailTest}
              >
                Test email
              </Button>
            </Grid>
            <Grid item md={6} xs={12}>
              <Button
                variant="contained"
                fullWidth
                color="secondary"
                disabled={!isTested || inProgress}
                onClick={onFormSubmit}
              >
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
