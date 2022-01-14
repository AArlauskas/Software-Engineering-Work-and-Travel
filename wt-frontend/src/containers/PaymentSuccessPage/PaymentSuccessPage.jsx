import { Grid, Typography, Button } from "@mui/material";
const PaymentSuccessPage = () => {
  const onRelogin = () => {
    window.localStorage.clear();
    window.location.reload();
  };
  return (
    <Grid
      className="grow-container"
      container
      justifyContent="center"
      spacing={3}
    >
      <Grid item xs={12}>
        <Typography align="center" variant="h4">
          Payment succeeded! Press the button below to rejoin as PRO user!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          color="secondary"
          fullWidth
          variant="contained"
          onClick={() => onRelogin()}
        >
          Relogin
        </Button>
      </Grid>
    </Grid>
  );
};

export default PaymentSuccessPage;
