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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
            similique nobis laudantium cumque est ipsam provident eos recusandae
            totam asperiores suscipit tenetur quasi accusantium, nihil accusamus
            delectus placeat possimus? Facere, optio quisquam. Iusto nam, ad
            facere consequatur atque officiis sapiente. Fuga ex facere quibusdam
            beatae.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>De acuerdo</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
