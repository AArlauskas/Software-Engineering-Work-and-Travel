import { Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getPersonalTasks } from "../../api/Api";
import TasksTable from "../../components/TasksTable/TasksTable";
import URI from "../../constants/URI";
const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
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
  }, []);
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
      <Grid item xs={12}>
        <TasksTable tasks={tasks} />
      </Grid>
    </Grid>
  );
};

export default TasksPage;
