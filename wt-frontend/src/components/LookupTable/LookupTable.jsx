import MaterialTable from "@material-table/core";

const LookupTable = () => {
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
      field: "city",
      title: "City",
    },
    {
      field: "state",
      title: "State",
    },
    {
      field: "email",
      title: "Email",
    },
  ];
  return <MaterialTable columns={columns} data={[]} title="Companies" />;
};

export default LookupTable;
