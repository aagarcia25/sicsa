import { useEffect, useState } from "react";
import { getUser } from "../../services/localStorage";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import Swal from "sweetalert2";
import { CatalogosServices } from "../../services/catalogosServices";
import { Toast } from "../../helpers/Toast";
import ModalForm from "../componentes/ModalForm";
import { Box, Button, Grid, TextField } from "@mui/material";

export const MunicipioModal = ({
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
    const [Nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const user: USUARIORESPONSE = JSON.parse(String(getUser()));
    const [ClaveEstado, setClaveEstado] = useState("");
    const [ClaveINEGI, setClaveINEGI] = useState("");
    
    
  
    const handleSend = () => {
      // if (!Nombre || !ClaveEstado || !ClaveINEGI) {
      //   Swal.fire("Favor de Completar los Campos", "¡Error!", "info");
      // } else {
        let data = {
          NUMOPERACION: tipo,
          CHID: id,
          CHUSER: user.Id,
          NOMBRE: Nombre,
          ClaveEstado: ClaveEstado,
          ClaveINEGI: ClaveINEGI,


          

        };
  
        handleRequest(data);
      //}
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
      CatalogosServices.Municipios_index(data).then((res) => {
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
      CatalogosServices.Municipios_index(data).then((res) => {
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
        setNombre(dt?.row?.Nombre);
        setClaveEstado(dt?.row?.ClaveEstado);
        setClaveINEGI(dt?.row?.ClaveINEGI);
        //setDescripcion(dt?.row?.Descripcion);
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
            item
            spacing={1}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ padding: "2%" }}
          >
              <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                margin="dense"
                id="Nombre"
                label="Nombre"
                type="text"
                fullWidth
                variant="standard"
                value={Nombre}
                onChange={(v) => setNombre(v.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
                margin="dense"
                id="ClaveEstado"
                label="Clave Estado"
                type="text"
                fullWidth
                variant="standard"
                value={ClaveEstado}
                onChange={(v) => setClaveEstado(v.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
                margin="dense"
                id="ClaveINEGI"
                label="Clave INEGI"
                type="text"
                fullWidth
                variant="standard"
                value={ClaveINEGI}
                onChange={(v) => setClaveINEGI(v.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              
            </Grid>
              
              
            <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{ padding: "2%" }}
            >
            <Grid item alignItems="center" justifyContent="center" xs={2}>
            <Button
                //disabled={Nombre === "" || ClaveEstado === "" || ClaveINEGI === ""}
                className={tipo === 1 ? "guardar" : "actualizar"}
                onClick={() => handleSend()}
              >
                {tipo === 1 ? "Agregar" : "Editar"}
              </Button>
            </Grid>
          </Grid>
              
            </Grid>
          </Box>
        </ModalForm>
      </>
    );
  };
  
         