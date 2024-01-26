import { Box, Button, Grid, TextField } from "@mui/material";
import ModalForm from "../componentes/ModalForm";
import { useEffect, useState } from "react";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { getUser } from "../../services/localStorage";
import { CatalogosServices } from "../../services/catalogosServices";
import { Toast } from "../../helpers/Toast";
import Swal from "sweetalert2";

export const PersonalModal = ({
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
    const [Empleado, setEmpleado] = useState("");
    const [Nombre, setNombre] = useState("");
    const [Puesto, setPuesto] = useState("");
    const [RFC, setRFC] = useState("");
    const [CURP, setCURP] = useState("");
    const [CorreoElectronico, setCorreoElectronico] = useState("");
    const [Telefono, setTelefono] = useState("");
    const user: USUARIORESPONSE = JSON.parse(String(getUser()));



    const handleSend = () => {
        
          let data = {
            NUMOPERACION: tipo,
            CHID: id,
            CHUSER: user.Id,
            Empleado: Empleado,
            Nombre: Nombre,
            Puesto: Puesto,
            RFC: RFC,
            CURP: CURP,
            CorreoElectronico: CorreoElectronico,
            Telefono: Telefono,
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
        CatalogosServices.Personal_index(data).then((res) => {
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
        CatalogosServices.Personal_index(data).then((res) => {
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

      

      const compruebaCURP = (value: string) => {
        // Eliminar caracteres no alfanuméricos y convertir a mayúsculas
        const cleanedValue = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
        // Limitar la longitud a 13 caracteres
        const truncatedValue = cleanedValue.substring(0, 18);
        // Actualizar el estado con el valor limpio y truncado
        setCURP(truncatedValue);
      };

      const compruebaRfc = (value: string) => {
        // Eliminar caracteres no alfanuméricos y convertir a mayúsculas
        const cleanedValue = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
        // Limitar la longitud a 13 caracteres
        const truncatedValue = cleanedValue.substring(0, 13);
        // Actualizar el estado con el valor limpio y truncado
        setRFC(truncatedValue);
      };

      

      useEffect(() => {
        if (dt === "") {
        } else {
          setId(dt?.data?.row?.id);
          setPuesto(dt?.data?.row?.Puesto);
          setNombre(dt?.data?.row?.Nombre);
          setEmpleado(dt?.data?.row?.Empleado);
          setRFC(dt?.data?.row?.RFC);
          setCURP(dt?.data?.row?.CURP);
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
                                id="Empleado"
                                label="Empleado"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={Empleado}
                                onChange={(v) => {
                                  setEmpleado(validarNumero(v.target.value, Empleado));
                                }}
                            />

                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                margin="dense"
                                id="Nombre"
                                label="Nombre Completo"
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
                                id="Puesto"
                                label="Puesto"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={Puesto}
                                onChange={(v) => setPuesto(v.target.value)}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                margin="dense"
                                id="RFC"
                                label="RFC"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={RFC}
                                onChange={(v) => {
                                  (compruebaRfc(v.target.value));
                                }}

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
                                id="CURP"
                                label="CURP"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={CURP}
                                onChange={(v) => {
                                  (compruebaCURP(v.target.value));
                                }}
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