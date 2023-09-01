import { Box, Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Toast } from "../../helpers/Toast";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { CatalogosServices } from "../../services/catalogosServices";
import { getUser } from "../../services/localStorage";
import ModalForm from "../componentes/ModalForm";

export const AniosModal = ({
  open,
  handleClose,
  tipo,
  dt,
}: {
  open: boolean;
  tipo: number;
  handleClose: Function;
  dt: any;
}) => {
  // CAMPOS DE LOS FORMULARIOS
  const [id, setId] = useState("");
  const [anio, setAnio] = useState("");
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  const handleSend = () => {
    if (!anio) {
      Swal.fire("Favor de Completar los Campos", "¡Error!", "info");
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.Id,
        ANIO: anio,
      };

      if (tipo === 1) {
        //AGREGAR
        agregar(data);
      } else if (tipo === 2) {
        //EDITAR

        editar(data);
      }
    }
  };

  const agregar = (data: any) => {
    CatalogosServices.aniosindex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Registro Agregado!",
        });
        handleClose();

      } else {
        Swal.fire(res.STRMESSAGE, "¡Error!", "info");
      }
    });
  };

  const editar = (data: any) => {
    CatalogosServices.aniosindex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Registro Editado!",
        });
        handleClose();

      } else {
        Swal.fire(res.STRMESSAGE, "¡Error!", "info");
      }
    });
  };

  useEffect(() => {
    if (dt === "") {
    } else {
      console.log("dt", dt);
      setId(dt?.row?.id);
      setAnio(dt?.row?.anio);
    }
  }, [dt]);

  

//     Verificar si el valor ingresado son 4 dígitos numéricos
 const validarNumeroAnio = (dato: string) => {
     if (/^\d{0,4}$/.test(dato)) {
    setAnio(dato);
    } else if (dato.length === 0) {
      setAnio("");
     }
   };


  return (
    <>
      <ModalForm
        title={tipo === 1 ? "Agregar Registro" : "Editar Registro"}
        handleClose={handleClose}
      >
        <Box boxShadow={3}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ padding: "2%" }}
          >
            <Grid
              item
              alignItems="center"
              justifyContent="center"
              xs={4}
            ></Grid>
            <Grid item alignItems="center" justifyContent="center" xs={4}>
              <TextField
                required
                margin="dense"
                id="Año"
                label="Año"
                value={anio}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => validarNumeroAnio(v.target.value)}
                error={anio === "" ? true : false}
              />
            </Grid>
            <Grid
              item
              alignItems="center"
              justifyContent="center"
              xs={4}
            ></Grid>
            <Grid
              item
              alignItems="center"
              justifyContent="center"
              xs={12}
              height={40}
            ></Grid>
            <Grid
              item
              alignItems="center"
              justifyContent="center"
              xs={5}
            ></Grid>
            <Grid item alignItems="center" justifyContent="center" xs={2}>
              <Button
                disabled={anio === ""}
                className={tipo === 1 ? "guardar" : "actualizar"}
                onClick={() => handleSend()}
              >
                {tipo === 1 ? "Agregar" : "Editar"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </ModalForm>
    </>
  );
};
