import MaterialTable from "@material-table/core";

const TasksTable = ({ tasks }) => {
  const columns = [
    {
      field: "header",
      title: "Header",
    },
    {
      field: "mailCount",
      title: "Emails count",
    },
    {
      field: "status",
      title: "Status",
    },
  ];
  return (
    <MaterialTable
      columns={columns}
      data={tasks}
      title="Tasks"
      options={{
        search: false,
        actionsColumnIndex: -1,
        pageSize: 5,
      }}
    />
  );
};

export default TasksTable;
