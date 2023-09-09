import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({ open, handleClose, activeBranch }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="title"
        aria-describedby="description"
      >
        <DialogTitle id="alert-dialog-title">{activeBranch.name}</DialogTitle>
        <DialogContent>
          <div>
            <div className="flex items-center gap-1">
              <h1 className="font-bold">Direccion: </h1>
              <h1>{activeBranch.address}</h1>
            </div>
            <div className="flex items-center gap-1">
              <h1 className="font-bold">Numero Telefonico: </h1>
              <h1>{activeBranch.phone}</h1>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            href={`https://wa.me/${activeBranch.phone}`}
            target="_blank"
          >
            Whatsapp
          </Button>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
