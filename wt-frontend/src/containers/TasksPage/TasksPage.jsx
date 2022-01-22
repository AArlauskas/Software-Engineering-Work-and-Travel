import { Button, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { deleteTask, getCurrentTask, getPersonalTasks } from "../../api/Api";
import TasksTable from "../../components/TasksTable/TasksTable";
import URI from "../../constants/URI";
const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getPersonalTasks()
      .then((response) => {
        setTasks(response.data);
      })
      .catch(() => {
        window.localStorage.clear();
        window.location.reload();
      });

    setInterval(() => fetchCurrentTask(), 3000);
  }, []);

  const fetchCurrentTask = () => {
    getCurrentTask()
      .then((response) => {
        console.log(response.data);
        setCurrentTask(response.data);
      })
      .catch(() => setCurrentTask(null));
  };

  const onTaskDelete = (id) => {
    deleteTask(id)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch(() => alert("Error while deleting the task"));
  };
  return (
    <Grid
      className="grow-container"
      container
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      <Grid item xs={12}>
        <Button variant="contained" onClick={() => navigate(URI.CREATE_TASK)}>
          Create new task
        </Button>
      </Grid>
      {currentTask && (
        <Grid item xs={12}>
          <Typography align="center" variant="subtitle1">
            In Progress: {currentTask.sentEmailsCount} /{" "}
            {currentTask.companies.length}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <TasksTable tasks={tasks} onTaskDelete={onTaskDelete} />
      </Grid>
    </Grid>
  );
};

export default TasksPage;
