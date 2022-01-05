import {
  Autocomplete,
  Button,
  CardContent,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import states from "../../constants/states";

const CompanyRegisterForm = ({ onSignUp }) => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState(states[0]);
  const [zip, setZip] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");

  const [showNameError, setShowNameError] = useState(false);
  const [showMailError, setShowMailError] = useState(false);
  const [showPhoneError, setShowPhoneError] = useState(false);
  const [showStateError, setShowStateError] = useState(false);
  const [showZipError, setShowZipError] = useState(false);
  const [showWebsiteError, setShowWebsiteError] = useState(false);
  const [showLocationError, setShowLocationError] = useState(false);
  const [showAddressError, setShowAddressError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    resetErrors();

    if (name.length < 4 || name.length > 30) {
      setShowNameError(true);
      return;
    }
    if (
      mail.length < 5 ||
      !mail.includes("@") ||
      !mail.includes(".") ||
      mail.length > 30
    ) {
      setShowMailError(true);
      return;
    }
    if (phone.length < 6 || phone.length > 12) {
      setShowPhoneError(true);
      return;
    }
    if (!states.includes(state)) {
      setShowStateError(true);
      return;
    }
    if (zip.length < 4 || zip.length > 10) {
      setShowZipError(true);
      return;
    }
    if (website.length < 5) {
      setShowWebsiteError(true);
      return;
    }
    if (location.length < 3 || location.length > 30) {
      setShowLocationError(true);
      return;
    }
    if (address.length < 3 || address.length > 30) {
      setShowAddressError(true);
      return;
    }

    const data = {
      name,
      mail,
      phone,
      zip,
      location,
      address,
      website,
      state: state.name,
    };
    onSignUp(data);
  };

  const resetErrors = () => {
    setShowNameError(false);
    setShowMailError(false);
    setShowPhoneError(false);
    setShowStateError(false);
    setShowZipError(false);
    setShowWebsiteError(false);
    setShowLocationError(false);
    setShowAddressError(false);
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
                Register your company
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Companie's name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={showNameError}
                helperText={showNameError && "Invalid company name"}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                placeholder="email"
                type="email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                error={showMailError}
                helperText={showMailError && "Invalid email address"}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                placeholder="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={showPhoneError}
                helperText={showPhoneError && "Invalid phone number"}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Autocomplete
                options={states}
                fullWidth
                getOptionLabel={(s) => s.name}
                value={state}
                onChange={(e, newValue) => setState(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="State"
                    error={showStateError}
                    helperText={showStateError && "Invalid state choice"}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                placeholder="Postal/ZIP code"
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                error={showZipError}
                helperText={showZipError && "Invalid zip code"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Website"
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                error={showWebsiteError}
                helperText={showWebsiteError && "Invalid website address"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Location/City"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                error={showLocationError}
                helperText={showLocationError && "Invalid location"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                error={showAddressError}
                helperText={showAddressError && "Invalid address"}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                fullWidth
                color="secondary"
                type="submit"
              >
                Register your company
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Paper>
  );
};

export default CompanyRegisterForm;
