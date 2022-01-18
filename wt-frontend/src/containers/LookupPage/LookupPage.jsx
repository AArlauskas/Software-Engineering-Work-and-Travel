import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import LookupTable from "../../components/LookupTable/LookupTable";
import { getAllCompanies } from "../../api/Api";

const LookupPage = ({ onPrevious, onNext }) => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  const onCompanySelectChange = (data) => {
    setSelectedCompanies(data);
  };

  useEffect(() => {
    getAllCompanies().then((response) => {
      setCompanies(response.data);
    });
  }, []);

  return (
    <Grid
      className="grow-container"
      container
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <Grid item xs={12}>
        <LookupTable
          companies={companies}
          onSelectChange={onCompanySelectChange}
        />
      </Grid>
      <Grid item container xs={12} justifyContent="space-between">
        <Grid item xs={2}>
          <Button variant="contained" onClick={onPrevious}>
            Previous
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            disabled={selectedCompanies.length === 0}
            variant="contained"
            onClick={() => onNext(selectedCompanies)}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LookupPage;
