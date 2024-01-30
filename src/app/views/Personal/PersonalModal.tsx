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
  Nombre: IError;
  CorreoElectronico: IError;
  CURP: IError;
  RFC: IError;
  Telefono: IError;
}

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
    const [Telefono, setTelefono] = useState(0);
    const user: USUARIORESPONSE = JSON.parse(String(getUser()));

     //------------------------Errores---------------------------------------------
  const [errores, setErrores] = useState<IObjectError>({
    Nombre: {
      valid: false,
      text: "Ingresa nombre ",
    },
    CorreoElectronico: {
      valid: false,
      text: "Ingresa correo electrónico válido",
    },
    CURP: {
      valid: false,
      text: "Ingresa CURP",
    },
    RFC: {
      valid: false,
      text: "Ingresa RFC",
    },
    Telefono: {
      valid: false,
      text: "Ingresa teléfono",
    },
    
  });
  //-------------------------------validaciones de campos-------------------------------------------------------------
  function validarCadena(nombre: string): boolean {
    // Expresión regular para validar el nombre
    const patron = /^(?!.*\s{2})[a-zA-ZáÁéÉíÍóÓúÚñÑ0-9\s']*$/;

    // Comprobamos si el nombre cumple con el patrón
    return patron.test(nombre);
  }

  //-------------------------------END validaciones de campos----------------------------------------------------------




    const handleSend = () => {
        if(!Empleado || !Nombre || !Puesto || !CURP || !RFC || errores.RFC.valid || errores.CURP.valid || errores.Telefono.valid || !isValidEmail(CorreoElectronico)){
          Swal.fire("Favor de Completar los Campos", "¡Error!", "info");
        }else{
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
  
      

      const compruebaCurp = (value: string) => {
        var format = /[ ¬°`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (!format.test(value)) {
          setCURP(value.toUpperCase());
        }
      };

      const compruebaRfc = (value: string) => {
        var format = /[ ¬°`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (!format.test(value)) {
          setRFC(value.toUpperCase());
        }
      };

      function isValidEmail(email:string) {
        if(email===""){
          return(true)
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
      }

     
      

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
                                required
                                error={errores.RFC.valid}
                                helperText={errores.RFC.valid ? errores.RFC.text : ""}
                                inputProps={{ maxLength: 13, minLength: 12 }}
                                onChange={(v) => {
                                  //(compruebaRfc(v.target.value));
                                  if (validarCadena(v.target.value)) {
                                    compruebaRfc(v.target.value);
                                    if (v.target.value.length <12){ 
                                      setErrores({
                                        ...errores,
                                        RFC: {
                                          valid: true,
                                          text: "Ingresa RFC válido",
                                        },
                                      });
                                    }else{
                                      setErrores({
                                        ...errores,
                                        RFC: {
                                          valid: false,
                                          text: "",
                                        },
                                      });
                                    }
                                      
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
                                id="CURP"
                                label="CURP"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={CURP}
                                required
                                error={errores.CURP.valid}
                                helperText={errores.CURP.valid ? errores.CURP.text : ""}
                                inputProps={{ maxLength: 18, minLength: 18 }}
                                onChange={(v) => {
                                  if (validarCadena(v.target.value)) {
                                    compruebaCurp(v.target.value);
                                    if (v.target.value.length <18){
                                      setErrores({
                                        ...errores,
                                        CURP: {
                                          valid: true,
                                          text: "Ingresa CURP válido",
                                        },
                                      });
                                    }else{
                                      setErrores({
                                        ...errores,
                                        CURP: {
                                          valid: false,
                                          text: "",
                                        },
                                      });
                                    }
                                  }
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
                                error={errores.CorreoElectronico.valid}
                                helperText={errores.CorreoElectronico.valid ? errores.CorreoElectronico.text : ""}
                                required
                                inputProps={{ maxLength: 100 }}
                                onChange={(v) => {const inputValue = v.target.value;
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
                                }
                                
                                }
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