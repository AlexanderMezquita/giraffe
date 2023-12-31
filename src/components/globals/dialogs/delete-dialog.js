import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export default function DeleteDialog({ onConfirm, loading, open, setOpen }) {
  return (
    <Dialog
      open={open}
      maxWidth={"sm"}
      fullWidth={true}
      PaperProps={{
        style: { borderRadius: 15, padding: "10px" },
      }}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>
        <p className=" text-xl font-sans text-neutral-800">Eliminar</p>
      </DialogTitle>
      <DialogContent>
        <p className=" text-lg font-sans  text-neutral-700">
          ¿Está seguro de que deseas eliminar esta entidad de forma permanente?
        </p>
      </DialogContent>
      <DialogActions>
        <div className="flex space-x-3 justify-end w-full">
          <Button
            color="info"
            className=" border-gray-300"
            variant="outlined"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <LoadingButton
            onClick={() => onConfirm()}
            loading={loading}
            variant="outlined"
            color="error"
            // variant="contained"
          >
            <span>Eliminar</span>
          </LoadingButton>
        </div>
      </DialogActions>
    </Dialog>
  );
}
