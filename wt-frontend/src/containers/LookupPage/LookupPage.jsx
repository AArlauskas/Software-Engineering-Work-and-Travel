import { Grid } from "@mui/material";
import LookupTable from "../../components/LookupTable/LookupTable";

const LookupPage = () => {
  return (
    <Grid
      className="grow-container"
      container
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <Grid item xs={12}>
        <LookupTable />
      </Grid>
    </Grid>
  );
};

export default LookupPage;
