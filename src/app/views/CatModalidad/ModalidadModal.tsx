import { Box, Button, Grid, TextField } from "@mui/material";
import ModalForm from "../componentes/ModalForm";
import { CatalogosServices } from "../../services/catalogosServices";
import { Toast } from "../../helpers/Toast";
import { useEffect, useState } from "react";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import Swal from "sweetalert2";
import { getUser } from "../../services/localStorage";


export const ModalidadModal = ({
  tipo,
  handleClose,
  dt,
  open,
}:{
  tipo: number;
  handleClose: Function,
  dt: any,
  open:boolean;
}

) => {
  const [Descripcion, setDescripcion] = useState("");
  const [id, setId] = useState("");
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));


  const handleSend = () => {
    if (!Descripcion) {
      Swal.fire("Favor de Completar los Campos", "¡Error!", "info");
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.Id,
        Descripcion: Descripcion,
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
    CatalogosServices.Modalidad_index(data).then((res) => {
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
    CatalogosServices.Modalidad_index(data).then((res) => {
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
      setDescripcion(dt?.row?.Descripcion);
    }
  }, [dt]);
    
        
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
                    id="Descripcion"
                    label="Descripción"
                    value={Descripcion}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(v) => setDescripcion(v.target.value)}
                    error={Descripcion === "" ? true : false}
                    InputProps={{}}
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
                    disabled={Descripcion === ""}
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