import { Box, Button, Grid, TextField } from "@mui/material";
import ModalForm from "../componentes/ModalForm";
import { useEffect, useState } from "react";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { getUser } from "../../services/localStorage";
import Swal from "sweetalert2";
import { CatalogosServices } from "../../services/catalogosServices";
import { Toast } from "../../helpers/Toast";

export const DependenciasModal = ({
    open,
    handleClose,
    tipo,
    dt,
}:{
    open: boolean;
    tipo: number;
    handleClose: Function;
    dt: any;
})=>{
  const [descripcion, setDescripcion] = useState("");
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [id, setId] = useState("");
  const [siglas, setSiglas] = useState("");


  const handleSend = () => {
    if (!descripcion) {
      Swal.fire("Favor de Completar los Campos", "¡Error!", "info");
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.Id,
        Siglas: siglas,
        DESCRIPCION: descripcion,
      };

      handleRequest(data);
    }
  };

  const handleRequest = (data: any) => {
    if (tipo === 1) {
      //AGREGAR
      agregar(data);
    } else if (tipo === 2) {
      //EDITAR

      editar(data);
    }
  };

  const agregar = (data: any) => {
    CatalogosServices.Dependencia_index(data).then((res) => {
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
    CatalogosServices.Dependencia_index(data).then((res) => {
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
      setId(dt?.row?.id);
      //setNombre(dt?.row?.Nombre);
      setDescripcion(dt?.row?.Descripcion);
    }
  }, [dt]);


    return(
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
                id="Descripcion"
                label="Descripción"
                value={descripcion}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setDescripcion(v.target.value)}
                error={descripcion === "" ? true : false}
                InputProps={{}}
              />

              <TextField
                required
                margin="dense"
                id="Siglas"
                label="Siglas"
                value={siglas}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setSiglas(v.target.value)}
                error={siglas === "" ? true : false}
                InputProps={
                  {
                    //readOnly: tipo === 1 ? false : true,
                  }
                }
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
                disabled={descripcion === "" || siglas === ""}
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

}