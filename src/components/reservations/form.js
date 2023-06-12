import { TextField } from "@mui/material";

export default function Form() {
  return (
    <section>
      <TextField id="name" label="Nombre" />
      <TextField id="phone" label="Telefono" />
      <TextField id="email" label="Correo (Opcional)" />
      <TextField id="comment" label="Comentario (Opcional)" />
    </section>
  );
}
