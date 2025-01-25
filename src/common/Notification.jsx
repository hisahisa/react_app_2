import {Alert, Snackbar} from "@mui/material";
import React, {useContext} from "react";
import CartContext from "../pages/CartContext";

export default function Notification() {
    const { alert, onSetAlert } = useContext(CartContext);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        onSetAlert({...alert, open: false});
    };
    return (
        <Snackbar
            open={alert.open}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center"}}
        >
            <Alert
                onClose={handleClose}
                severity={alert.severity}
                sx={{ width: "100%", whiteSpace: "pre-line" }}
                variant="filled"
                elevation={6}
            >
                {alert.message}
            </Alert>
        </Snackbar>
    );
}
