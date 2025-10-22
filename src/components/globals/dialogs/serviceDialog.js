import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { formatCurrency } from "@/utils/methods";

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
        fullWidth={true}
        aria-describedby="frist time dialog"
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{
            position: "absolute",
            right: 10,
            top: 12,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle id="first-time-dialog">{service.name}</DialogTitle>
        <DialogContent dividers>
          <article className="flex flex-wrap lg:flex-nowrap w-full md:gap-9 gap-3 px-5 overflow-y-auto">
            <img
              alt={service.name}
              src={service.img ?? "/brand.png"}
              className=" w-full  object-cover lg:w-6/12 rounded-lg border-4 border-secondary"
            />
            <div>
              <p>{service.description}</p>
              <ul className=" mt-4 space-y-2 text-sm">
                <li>
                  Precio:{" "}
                  <span className="font-bold">
                    {formatCurrency(service.price)}
                  </span>
                </li>
                <li>
                  Tiempo estimado:{" "}
                  <span className="font-bold">{service.estimatedTime}</span>
                </li>
              </ul>
            </div>
          </article>
        </DialogContent>
        <DialogActions>
          {/* <Button
            color="info"
            className=" border-gray-300"
            variant="outlined"
            onClick={handleClose}
          >
            Cancelar
          </Button> */}
          <Button onClick={() => onConfirm()}>Reservar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
