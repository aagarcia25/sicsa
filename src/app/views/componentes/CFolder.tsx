import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";

export default function FormDialog({ handleClose }: { handleClose: Function }) {
  // Estado para almacenar el valor del TextField
  const [folderName, setFolderName] = useState("");

  // Función para actualizar el estado cuando el valor del TextField cambia
  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFolderName(event.target.value);
  };

  // Función para cerrar el diálogo y pasar el valor del TextField
  const handleGenerate = () => {
    handleClose(folderName);
  };

  return (
    <>
      <Dialog open={true} onClose={() => handleClose()}>
        <DialogTitle>Carpeta Nueva</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="folder"
            name="folder"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleTextFieldChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancelar</Button>
          <Button type="submit" onClick={handleGenerate}>
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
