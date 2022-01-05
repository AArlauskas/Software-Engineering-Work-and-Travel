import MaterialTable from "@material-table/core";
import { Grid, Typography } from "@mui/material";

const LookupTable = ({ companies }) => {
  const columns = [
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
  ];

  const renderWebsites = (websiteString) => {
    const websites = websiteString.split("|")
    if (websites.length === 1)
    {
      return <Typography><b>Website:</b> {websiteString}</Typography>;
    }
    return <div>
      <Typography><b>Websites:</b> </Typography>
      {websites.map(el => {
        return <Typography>{el}</Typography>
      })}
    </div>
  }
  const calculatePricing = (pricing) => {
    if (pricing === 1) return <Typography><b>Pricing:</b> $</Typography>
    if (pricing === 2) return <Typography><b>Pricing:</b> $$</Typography>
    if (pricing === 3) return <Typography><b>Pricing:</b> $$$</Typography>
  }
  return (
    <MaterialTable
      columns={columns}
      data={companies}
      title="Companies"
      options={{
        selection: true
      }}
      detailPanel={({rowData}) => {
        return (
          <Grid style={{width: "100%", padding: 10}} container justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography ><b>Address:</b> {rowData.address}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography><b>ZIP:</b> {rowData.zip}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography ><b>Rating:</b> {rowData.rating}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              {calculatePricing(rowData.pricing)}
            </Grid>
            <Grid item xs={12}>
              <Typography><b>Phone:</b> {rowData.phone}</Typography>
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
