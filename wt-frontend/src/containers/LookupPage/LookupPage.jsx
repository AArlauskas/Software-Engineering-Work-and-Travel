import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import LookupTable from "../../components/LookupTable/LookupTable";
import {getAllCompanies} from "../../api/Api";

const LookupPage = () => {
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    getAllCompanies().then(response => {
      setCompanies(response.data);
    })
  }, [])

  return (
    <Grid
      className="grow-container"
      container
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <Grid item xs={12}>
        <LookupTable companies={companies}/>
      </Grid>
    </Grid>
  );
};

export default LookupPage;
