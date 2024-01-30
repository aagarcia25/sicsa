import { Box, Button, Grid, TextField } from "@mui/material";
import ModalForm from "../componentes/ModalForm";
import { useEffect, useState } from "react";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { getUser } from "../../services/localStorage";
import { CatalogosServices } from "../../services/catalogosServices";
import { Toast } from "../../helpers/Toast";
import Swal from "sweetalert2";

interface IError {
  valid: boolean;
  text: string;
}

interface IObjectError {
  CorreoElectronico: IError;
  Telefono: IError;
  Extension: IError;
}

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
    const [Extension, setExtension] = useState(0);
    const [CorreoElectronico, setCorreoElectronico] = useState("");
    const [Telefono, setTelefono] = useState(0);
    const user: USUARIORESPONSE = JSON.parse(String(getUser()));

//------------------------Errores---------------------------------------------
const [errores, setErrores] = useState<IObjectError>({
  
  CorreoElectronico: {
    valid: false,
    text: "Ingresa correo electrónico válido",
  },
  Telefono: {
    valid: false,
    text: "Ingresa teléfono",
  },
  Extension: {
    valid: false,
    text: "Ingresa extensión",
  },
});

    const handleSend = () => {
        if(!Titular || !Cargo || !Area || !isValidEmail(CorreoElectronico || "") || errores.Telefono.valid){
          console.log(!Titular);
          console.log(!Cargo);
          console.log(!Area);
          console.log(!isValidEmail(CorreoElectronico|| ""));
          console.log(!errores.Telefono.valid);

          



          
          Swal.fire("Favor de Completar los Campos", "¡Error!", "info");
        }else{
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

     

      function isValidEmail(email:string) {
        
        if(email===""){
          
          return(true)
          
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        return emailRegex.test(email);
      }

      const validarNumero = (dato: string, state: any) => {
        if (/^[0-9]+$/.test(dato)) {
          return dato;
        } else if (dato.length === 0) {
          return "";
        }
        return state;
      };

      // const compruebaTelefono = (value: number) => {
      //   if (value <= 9999999999) {
      //     setTelefono(value);
      //     setErrores({
      //       ...errores,
      //       Telefono: {
      //         valid: false,
      //         text: "Ingresa teléfono válido",
      //       },
      //     });
      //   } else if (value.toString() === "NaN") {
      //     setTelefono(0);
      //   }
      // };

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
                                label="Área"
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
                                error={errores.CorreoElectronico.valid}
                                helperText={errores.CorreoElectronico.valid ? errores.CorreoElectronico.text : ""}
                                required
                                inputProps={{ maxLength: 100 }}
                                onChange={(v) => {
                                  const inputValue = v.target.value;
                                  setCorreoElectronico(inputValue);
                                
                                  if (inputValue === "") {
                                    // Si el campo está vacío, no mostramos ningún error
                                    setErrores({
                                      ...errores,
                                      CorreoElectronico: {
                                        valid: false,
                                        text: "",
                                      },
                                    });
                                  } else if (!isValidEmail(inputValue)) {
                                    // Si no está vacío pero no es un correo electrónico válido, mostramos el error
                                    setErrores({
                                      ...errores,
                                      CorreoElectronico: {
                                        valid: true,
                                        text: "Ingresa correo electrónico válido",
                                      },
                                    });
                                  } else {
                                    // Si es un correo electrónico válido, no mostramos ningún error
                                    setErrores({
                                      ...errores,
                                      CorreoElectronico: {
                                        valid: false,
                                        text: "",
                                      },
                                    });
                                  }
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
                                id="Telefono"
                                label="Teléfono"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={Telefono}
                                inputProps={{ maxLength: 10 }}
                                error={errores.Telefono.valid}
                                helperText={errores.Telefono.valid ? errores.Telefono.text : ""}
                                onChange={(v) => {
                                  setTelefono(validarNumero(v.target.value,setTelefono));
                                  if(v.target.value.length<10 && v.target.value.length>1){
                                    setErrores({
                                    ...errores,
                                    Telefono: {
                                      valid: true,
                                      text: "Ingresa teléfono válido",
                                    },
                                  });
                                  } else{
                                    setErrores({
                                      ...errores,
                                        Telefono: {
                                        valid: false,
                                        text: "",
                                      },
                                    });
                                  }
                                }}
                            />

                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                                margin="dense"
                                id="Extension"
                                label="Extensión"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={Extension}
                                inputProps={{ maxLength: 10 }}
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