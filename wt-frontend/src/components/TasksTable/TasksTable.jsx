import MaterialTable from "@material-table/core";
import NotStartedIcon from "@mui/icons-material/NotStarted";
import { useNavigate } from "react-router";
import { startTask } from "../../api/Api";

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

  const onStartClick = (id) => {
    startTask(id)
      .then(() => {
        window.location.reload();
      })
      .catch(() => alert("Failed to start the task"));
  };
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
      actions={[
        {
          icon: NotStartedIcon,
          tooltip: "Start sending emails",
          onClick: (event, rowData) => onStartClick(rowData.id),
        },
      ]}
      onRowClick={onRowClick}
    />
  );
};

export default TasksTable;
