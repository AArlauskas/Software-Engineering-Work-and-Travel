import { useState, useEffect, useRef } from "react";
import { Grid } from "@mui/material";
import LogsTable from "../../components/LogsTable/LogsTable";
import { getLogs, getLogTypes } from "../../api/AdminApi";

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [types, setTypes] = useState([]);
  const interval = useRef();

  useEffect(() => {
    getLogTypes().then((response) => {
      const typesObj = {};
      response.data.forEach((type) => (typesObj[type] = type));
      setTypes(typesObj);
    });
    interval.current = setInterval(() => onLogsFetch(), 3000);
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  const onLogsFetch = () =>
    getLogs().then((response) => setLogs(response.data));

  return (
    <Grid className="grow-container" container spacing={2}>
      <Grid item xs={12}>
        <LogsTable logs={logs} types={types} />
      </Grid>
    </Grid>
  );
};

export default LogsPage;
