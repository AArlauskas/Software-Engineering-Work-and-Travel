import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import LookupTable from "../../components/LookupTable/LookupTable";
import { getAllCompanies, getUsedCompanies } from "../../api/Api";

const LookupPage = ({ onPrevious, onNext, data }) => {
  const isBasic = window.localStorage.getItem("role") === "BASIC";
  const [companies, setCompanies] = useState([]);
  const [usedCompanies, setUsedCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  const onCompanySelectChange = (data) => {
    setSelectedCompanies(data);
  };

  useEffect(() => {
    getAllCompanies().then((response) => {
      setCompanies(response.data);
    });
    getUsedCompanies().then((response) => {
      setUsedCompanies(response.data);
    });
  }, []);

  useEffect(() => {
    if (data) {
      setSelectedCompanies(data);
    }
  }, [data]);

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
          usedCompanies={usedCompanies}
          selectedCompanies={selectedCompanies}
          onSelectChange={
            onPrevious && onNext ? onCompanySelectChange : undefined
          }
        />
      </Grid>
      {onPrevious && onNext && (
        <Grid item container xs={12} justifyContent="space-between">
          <Grid item xs={2}>
            <Button variant="contained" onClick={onPrevious}>
              Previous
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              disabled={
                selectedCompanies.length === 0 ||
                (!isBasic && selectedCompanies.length >= 30)
              }
              variant="contained"
              onClick={() => onNext(selectedCompanies)}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default LookupPage;
