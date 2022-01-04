import MaterialTable from "@material-table/core";

const LookupTable = ({companies}) => {
  const columns = [
    {
      field: "name",
      title: "Name",
    },
    {
      field: "address",
      title: "Address",
    },
    {
      field: "location",
      title: "Location",
    },
    {
      field: "mail",
      title: "Email",
    },
    {
      field: "phone",
      title: "Phone",
    },
    {
      field: "pricing",
      title: "Pricing",
    },
    {
      field: "rating",
      title: "Rating",
    },
    {
      field: "state",
      title: "State",
    },
    {
      field: "website",
      title: "Website",
    },
    {
      field: "worktype",
      title: "Work Type",
    },
    {
      field: "zip",
      title: "Zip",
    },
  ];
  return <MaterialTable columns={columns} data={companies} title="Companies" />;
};

export default LookupTable;
