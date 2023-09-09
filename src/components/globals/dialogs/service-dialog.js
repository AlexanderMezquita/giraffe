import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ServiceDialog({
  open,
  handleClose,
  service,
  onConfirm,
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="first-time"
        maxWidth={"sm"}
        aria-describedby="frist time dialog"
      >
        <DialogTitle id="first-time-dialog">{service.name}</DialogTitle>
        <DialogContent>
          <p>{service.description}</p>
        </DialogContent>
        <DialogActions>
          <Button
            color="info"
            className=" border-gray-300"
            variant="outlined"
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button onClick={() => onConfirm()}>De acuerdo</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
