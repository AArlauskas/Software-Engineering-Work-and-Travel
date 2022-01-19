import { Grid, Typography, Button } from "@mui/material";
import { checkout } from "../../api/Api";
const PaymentFailPage = () => {
  const onNavigate = () => {
    checkout().then((response) => (window.location.href = response.data));
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
          Payment failed. Please try again.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          color="secondary"
          fullWidth
          variant="contained"
          onClick={() => onNavigate()}
        >
          Proceed to payment
        </Button>
      </Grid>
    </Grid>
  );
};

export default PaymentFailPage;
