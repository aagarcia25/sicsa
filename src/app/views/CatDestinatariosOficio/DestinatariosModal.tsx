import { Box, Button, Grid, TextField } from "@mui/material";
import ModalForm from "../componentes/ModalForm";
import { useEffect, useState } from "react";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { getUser } from "../../services/localStorage";
import { CatalogosServices } from "../../services/catalogosServices";
import { Toast } from "../../helpers/Toast";
import Swal from "sweetalert2";

export const DestinatariosModal = ({
    open,
    tipo,
    dt,
    handleClose
}: {
    open: boolean;
    tipo: number;
    handleClose: Function;
    dt: any;
}) => {
    const [id, setId] = useState("");
    const [Titular, setTitular] = useState("");
    const [Cargo, setCargo] = useState("");
    const [Area, setArea] = useState("");
    const [Extension, setExtension] = useState("");
    const [CorreoElectronico, setCorreoElectronico] = useState("");
    const [Telefono, setTelefono] = useState("");
    const user: USUARIORESPONSE = JSON.parse(String(getUser()));



    const handleSend = () => {
        
          let data = {
            NUMOPERACION: tipo,
            CHID: id,
            CHUSER: user.Id,
            Titular: Titular,
            Cargo: Cargo,
            Area: Area,
            CorreoElectronico: CorreoElectronico,
            Telefono: Telefono,
            Extension: Extension,
          };
    
          if (tipo === 1) {
            //AGREGAR
            agregar(data);
          } else if (tipo === 2) {
            //EDITAR
            editar(data);
          }
        
      };

      const agregar = (data: any) => {
        CatalogosServices.Destinatarios_index(data).then((res) => {
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
        CatalogosServices.Destinatarios_index(data).then((res) => {
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

      const validarNumero = (dato: string, state: any) => {
        if (/^\d+(\.\d*)?$/.test(dato)) {
          return dato;
        } else if (dato.length === 0) {
          return "";
        }
        return state;
      };
      const compruebaTelefono = (value: string) => {
        // Eliminar caracteres no alfanuméricos y convertir a mayúsculas
        const cleanedValue = value.replace(/[^0-9]/g, '').toUpperCase();
        // Limitar la longitud a 13 caracteres
        const truncatedValue = cleanedValue.substring(0, 10);
        // Actualizar el estado con el valor limpio y truncado
        setTelefono(truncatedValue);
      };

      useEffect(() => {
        if (dt === "") {
        } else {
          setId(dt?.data?.row?.id);
          setTitular(dt?.data?.row?.Titular);
          setCargo(dt?.data?.row?.Cargo);
          setArea(dt?.data?.row?.Area);
          setExtension(dt?.data?.row?.Extension);
          setCorreoElectronico(dt?.data?.row?.CorreoElectronico);
          setTelefono(dt?.data?.row?.Telefono);
        }
      }, [dt]);

    return (
        <>
            <ModalForm handleClose={handleClose} title={tipo === 1 ? "Agregar Registro" : "Editar Registro"}>
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
                                id="Titular"
                                label="Titular"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={Titular}
                                onChange={(v) => setTitular(v.target.value)}
                            />

                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                margin="dense"
                                id="Cargo"
                                label="Cargo"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={Cargo}
                                onChange={(v) => setCargo(v.target.value)}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                margin="dense"
                                id="Area"
                                label="Area"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={Area}
                                onChange={(v) => setArea(v.target.value)}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                                margin="dense"
                                id="CorreoElectronico"
                                label="Correo Electrónico"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={CorreoElectronico}
                                onChange={(v) => setCorreoElectronico(v.target.value)}
                            />
                        </Grid>
                    </Grid>
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
                                id="Telefono"
                                label="Teléfono"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={Telefono}
                                onChange={(v) => {
                                  (compruebaTelefono(v.target.value));
                                }}
                            />

                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                                margin="dense"
                                id="Extension"
                                label="Extension"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={Extension}
                                onChange={(v) => {
                                  setExtension(validarNumero(v.target.value, Extension));
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>

                        </Grid>
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
                </Box>
            </ModalForm>
        </>
    )

}