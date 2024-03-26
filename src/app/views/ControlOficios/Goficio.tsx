import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormEvent, useState } from "react";
import { AuditoriaService } from "../../services/AuditoriaService";
import { base64ToArrayBuffer } from "../../helpers/Files";
import Swal from "sweetalert2";

const opcionesPlantilla = ["ADMINISTRATIVO", "SALIDA", "SOLICITUD"];

export default function Goficio({
  open,
  handleFunction,
  obj,
}: {
  open: boolean;
  handleFunction: Function;
  obj: any;
}) {
  const [tipo, setTipo] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setTipo(event.target.value as string);
  };

  const handleSubmit = () => {
    const plantilla = tipo;
    console.log(plantilla);

    let data = {
      NUMOPERACION: 5,
      TIPO: plantilla,
      CHID: obj.id,
    };

    AuditoriaService.informes(data).then((res) => {
      if (res.SUCCESS) {
        var bufferArray = base64ToArrayBuffer(String(res.RESPONSE.FILE));
        var blobStore = new Blob([bufferArray], {
          type: res.RESPONSE.TIPO,
        });
        var data = window.URL.createObjectURL(blobStore);
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.href = data;
        link.download = plantilla;
        link.click();
        window.URL.revokeObjectURL(data);
        link.remove();
      } else {
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

  return (
    <Dialog
      open={open}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>
        Seleccione el Tipo de plantilla que desea descargar
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth style={{ margin: 10 }}>
          <InputLabel id="demo-simple-select-label">Plantilla</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tipo}
            label="Plantilla"
            onChange={handleChange}
          >
            {opcionesPlantilla.map((opcion) => (
              <MenuItem key={opcion} value={opcion}>
                {opcion}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleFunction()}>Cancelar</Button>
        <Button type="submit">Generar</Button>
      </DialogActions>
    </Dialog>
  );
}
