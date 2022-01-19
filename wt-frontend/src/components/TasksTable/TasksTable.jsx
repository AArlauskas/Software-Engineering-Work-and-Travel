import MaterialTable from "@material-table/core";
import { useNavigate } from "react-router";

const TasksTable = ({ tasks }) => {
  const navigation = useNavigate();

  const onRowClick = (event, rowData) => {
    const { id, status } = rowData;
    if (status === "CREATED") {
      navigation(`/update-task/${id}`);
    }
    console.log(rowData);
  };
  const columns = [
    {
      field: "header",
      title: "Header",
    },
    {
      field: "companies",
      title: "Emails count",
      render: (rowData) => rowData.companies.length,
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
      onRowClick={onRowClick}
    />
  );
};

export default TasksTable;
