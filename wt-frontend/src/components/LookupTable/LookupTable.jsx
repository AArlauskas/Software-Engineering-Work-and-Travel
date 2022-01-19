import MaterialTable from "@material-table/core";
import { Grid, Typography } from "@mui/material";

const LookupTable = ({
  companies,
  usedCompanies,
  onSelectChange,
  selectedCompanies,
}) => {
  const isBasic = window.localStorage.getItem("role") === "BASIC";

  const proColumns = [
    {
      field: "name",
      title: "Name",
    },
    {
      field: "mail",
      title: "Email",
    },
    {
      field: "location",
      title: "Location",
    },
    {
      field: "state",
      title: "State",
    },
    {
      field: "workType",
      title: "Work Type",
    },
  ];

  const basicColumns = [
    {
      field: "name",
      title: "Name",
    },
    {
      field: "mail",
      title: "Email",
    },
  ];

  const renderWebsites = (websiteString) => {
    const websites = websiteString.split("|");
    if (websites.length === 1) {
      return (
        <Typography>
          <b>Website:</b> {websiteString}
        </Typography>
      );
    }
    return (
      <div>
        <Typography>
          <b>Websites:</b>{" "}
        </Typography>
        {websites.map((el) => {
          return <Typography>{el}</Typography>;
        })}
      </div>
    );
  };
  const calculatePricing = (pricing) => {
    if (pricing === 1)
      return (
        <Typography>
          <b>Pricing:</b> $
        </Typography>
      );
    if (pricing === 2)
      return (
        <Typography>
          <b>Pricing:</b> $$
        </Typography>
      );
    if (pricing === 3)
      return (
        <Typography>
          <b>Pricing:</b> $$$
        </Typography>
      );
  };
  return (
    <MaterialTable
      columns={isBasic ? basicColumns : proColumns}
      data={companies}
      title="Companies"
      onSelectionChange={(e) => {
        console.log(e);
        !!onSelectChange && onSelectChange(e.map((entry) => entry.id));
      }}
      options={{
        selection: !!onSelectChange,
        showSelectAllCheckbox: !isBasic,
        selectionProps: (rowData) => ({
          disabled: !!usedCompanies.find((el) => el.id === rowData.id),
          checked: !!selectedCompanies.find((el) => el === rowData.id),
        }),
      }}
      detailPanel={({ rowData }) => {
        if (isBasic) return false;
        return (
          <Grid
            style={{ width: "100%", padding: 10 }}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={6}>
              <Typography>
                <b>Address:</b> {rowData.address}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>
                <b>ZIP:</b> {rowData.zip}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>
                <b>Rating:</b> {rowData.rating}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              {calculatePricing(rowData.pricing)}
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <b>Phone:</b> {rowData.phone}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {renderWebsites(rowData.website)}
            </Grid>
          </Grid>
        );
      }}
    />
  );
};

export default LookupTable;
