import { Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { getPersonalTasks } from "../../api/Api";
import TasksTable from "../../components/TasksTable/TasksTable";
const TasksPage = () => {
  const [tasks, setTasks] = useState([]);

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
        <Button variant="contained">Create new task</Button>
      </Grid>
      <Grid item xs={12}>
        <TasksTable tasks={tasks} />
      </Grid>
    </Grid>
  );
};

export default TasksPage;
