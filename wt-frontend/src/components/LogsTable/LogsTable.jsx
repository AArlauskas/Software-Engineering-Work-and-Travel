import MaterialTable from "@material-table/core";

const LogsTable = ({ logs, types }) => {
  const columns = [
    {
      field: "id",
      title: "id",
      searchable: true,
    },
    {
      field: "type",
      title: "Type",
      lookup: types,
      searchable: true,
    },
    {
      field: "timestamp",
      title: "Timestamp",
      searchable: true,
    },
    {
      field: "message",
      title: "Message",
      searchable: true,
    },
  ];
  return (
    <MaterialTable
      data={logs}
      columns={columns}
      title="Logs"
      options={{
        filtering: true,
      }}
    />
  );
};

export default LogsTable;
