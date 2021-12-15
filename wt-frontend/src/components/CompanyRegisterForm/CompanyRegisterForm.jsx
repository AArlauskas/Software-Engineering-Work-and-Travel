import {
  Autocomplete,
  Button,
  CardContent,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import states from "../../constants/states";

const CompanyRegisterForm = () => {
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
                Register your company
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth placeholder="Companie's name" type="text" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth placeholder="email" type="email" />
            </Grid>
            <Grid item md={6} xs={12}>
              <Autocomplete
                options={states}
                fullWidth
                getOptionLabel={(s) => s.name}
                renderInput={(params) => (
                  <TextField {...params} label="State" />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField fullWidth placeholder="Postal code" type="text" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth placeholder="Address" type="text" />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" fullWidth color="secondary">
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
