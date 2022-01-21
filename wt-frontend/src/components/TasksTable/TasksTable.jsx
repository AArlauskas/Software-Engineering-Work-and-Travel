import MaterialTable from "@material-table/core";
import { useNavigate } from "react-router";

const TasksTable = ({ tasks, onTaskDelete }) => {
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
      title: "Companies selected",
      render: (rowData) => rowData.companies.length,
    },
    {
      field: "sentEmailsCount",
      title: "Emails sent",
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
      editable={{
        isDeletable: (rowData) => rowData.status === "CREATED",
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              onTaskDelete(oldData.id);
              resolve();
            }, 1000);
          }),
      }}
      onRowClick={onRowClick}
    />
  );
};

export default TasksTable;
