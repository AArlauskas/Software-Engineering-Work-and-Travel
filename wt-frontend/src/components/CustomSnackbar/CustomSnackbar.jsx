import React from "react";
import { Snackbar, Alert as MuiAlert } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar = ({
  topCenter,
  message,
  severity,
  onClose,
  duration,
}) => (
  <Snackbar
    open
    anchorOrigin={
      topCenter
        ? { vertical: "top", horizontal: "center" }
        : { vertical: "bottom", horizontal: "left" }
    }
    autoHideDuration={duration || 3000}
    onClose={onClose}
  >
    <Alert severity={severity || "success"}>
      {message || "Message with no provided text"}
    </Alert>
  </Snackbar>
);

export default CustomSnackbar;
