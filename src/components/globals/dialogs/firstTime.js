import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FirstTimeDialog({ open, handleClose }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="first-time"
        aria-describedby="frist time dialog"
      >
        <DialogTitle id="first-time-dialog">Importante</DialogTitle>
        <DialogContent>
          <p>
            Para asegurar su cita, las cancelaciones pueden estar sujetas a
            cargos, y si se presenta sin previo aviso, podría requerirse pago
            anticipado para futuras reservas. Para realizar cambios, comuníquese
            exclusivamente por WhatsApp o Instagram. En citas grupales, pedimos
            aviso anticipado. ¡Gracias por su comprensión y preferencia!
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>De acuerdo</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
