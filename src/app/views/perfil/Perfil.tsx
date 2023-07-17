import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { DialogCambiarImagen } from "./DialogCambiarImagen";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import React from "react";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Swal from "sweetalert2";
import { getUser, setToken } from "../../services/localStorage";
import { UserServices } from "../../services/UserServices";
import { Toast } from "../../helpers/Toast";
import { Blanco } from "../../styles/imagen";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";

export const Perfil = (
  {
    handleChangeImg,
    imgData,
    imgTipo
  }: {
    handleChangeImg: Function;
    imgData: string;
    imgTipo: string;
  }
) => {
  const user: USUARIORESPONSE = (JSON.parse(String(getUser())));
  // const [responseStorage, setResponseStorage] = useState<RESPONSESTORAGE>();

  const [openDialog, setOpenDialog] = useState(false)
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [tokenValid, setTokenValid] = useState<boolean>(false);
  const [value, setValue] = useState('general');


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setPassword("");
    setConfPassword("")
  };

  const handleCloseDialogImagen = () => {
    setOpenDialog(false);
    handleChangeImg();
    // GetImage("/PDRMYE/USUARIOS/FOTOPERFIL/", user.RutaFoto)
  };



  //PRIMER CARD FUNCIONES

  const RfToken = () => {

    UserServices.verify({}).then((res) => {
      if (res.status === 200) {
        setTokenValid(true)
        // onClickChangePassword();
      } else if (res.status === 401) {
        UserServices.refreshToken().then((resAppLogin) => {
          if (resAppLogin.status === 200) {
            setTokenValid(true);
            setToken(resAppLogin.data?.token);
            // onClickChangePassword();
          }
          else {
            setTokenValid(false);
            Toast.fire({
              icon: "error",
              title: "Sesión Demasiado Antigua",
            });
          }
        });

      }

    });
  };



  const onClickChangePassword = () => {
    if ((password !== confPassword) || (password.length < 6)) {
      Toast.fire({
        icon: "warning",
        title: "¡Verifique Los Campos!"
      });
    } else {
      Swal.fire({
        icon: "question",
        title: "Cambiar Contraseña?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
        color: 'rgb(175, 140, 85)',
      }).then((result) => {
        if (result.isConfirmed) {

          let dat = {
            IdUsuario: user.Id,
            ContrasenaNueva: password,
          };

          if (tokenValid) {
            UserServices.changepassword(dat).then((res) => {
              if (res.status === 200 && res.data.message === "Cambio de contraseña exitoso!") {
                Swal.fire("¡Cambio de Contraseña exitoso!", "", "success");
                setPassword("");
                setConfPassword("");
              } else {
                Toast.fire({
                  icon: "warning",
                  title: "¡Cambio de Contraseña Fallo!",
                });
              }
            });
          } else {
            RfToken();
          }
        }
      });
    }
  };



  useEffect(() => {
    // GetImage("/PDRMYE/USUARIOS/FOTOPERFIL/", user.RutaFoto)
    RfToken();
    // setSumaDescuentos(Number(dt.row.Descuentos) + Number(dt.row.RecAdeudos));
  }, []);


  return (
    <Grid>
      <Grid container direction="row" justifyContent="flex-end" alignItems="center" paddingTop="2%" paddingBottom={1} >
        <BottomNavigation showLabels sx={{ width: 500, borderRadius: "10px", }} value={value} onChange={handleChange}>
          <BottomNavigationAction
            label="Información General"
            value="general"
            icon={<AccountBoxIcon />}
          />
          <BottomNavigationAction
            label="Cambiar Contraseña"
            value="password"
            icon={<VpnKeyIcon />}
          />
        </BottomNavigation>
      </Grid>


      <Grid container>
        {value === "general" ?
          < Grid container sx={{ justifyContent: "center", borderRadius: "10px", }}  >
            <Grid container item xs={12} sm={12} md={10}>
              {/* Imagen y tipo de usuario */}
              <Grid item container justifyContent="center" paddingTop={3} paddingBottom={2}>
                <Box boxShadow={3}
                  onClick={() => {
                    setOpenDialog(true)
                  }}

                  sx={{ width: "7.4rem", height: "7.4rem", backgroundColor: "white", borderRadius: '50%', justifyContent: "center", cursor: "pointer", }} >
                  {imgData!=="undefined" ?

                    <img 
                    alt="Foto de Perfil"
                    style={{ objectFit: "scale-down", width: "100%", height: "100%", borderRadius: '50%' }} 
                    src={"data:" + String(imgTipo==="undefined"?Blanco.Data:imgTipo) + ";base64," +
                    String(imgData==="undefined"?Blanco.Data:imgData)} />

                    : <PersonIcon sx={{ width: "100%", height: "100%", }} />
                  }


                </Box>
                <DialogCambiarImagen open={openDialog} handleClose={handleCloseDialogImagen} imgData={imgData} imgTipo={imgTipo}></DialogCambiarImagen>
              </Grid>

              {/* ///////////////////////   datos de ususario base    */}
              <Grid item container xs={12} sm={12} boxShadow={3} border={"1px solid #b3afaf"} borderRadius={3} >
                <Grid item xs={12} sm={3.8}>
                  <Typography variant="h6" className="DatosPrincipalesPerfil">
                    Nombre:
                  </Typography>
                  <Typography variant="h6" className="DatosSecundariosPerfil" >
                    {user.Nombre}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3.8}>

                  <Typography variant="h6" className="DatosPrincipalesPerfil">
                    Apellido Paterno:

                  </Typography>
                  <Typography variant="h6" className="DatosSecundariosPerfil">
                    {user.ApellidoPaterno}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3.8}>

                  <Typography variant="h6" className="DatosPrincipalesPerfil">
                    Apellido Materno:
                  </Typography>
                  <Typography variant="h6" className="DatosSecundariosPerfil">
                    {user.ApellidoMaterno} </Typography>
                </Grid>
              </Grid>
              <Grid item container xs={12} sm={12} paddingTop={1} paddingBottom={1} >
                <Grid item xs={12} alignItems="center">
                  <Typography variant="h5" className="DatosPrincipalesPerfil">
                    Contacto y Ubicación
                  </Typography>
                </Grid>
              </Grid>

              {/* ////////////////////// datos extras */}
              <Grid item container xs={12} sm={12} boxShadow={3} border={"1px solid #b3afaf"} borderRadius={1} paddingBottom={1} paddingTop={2}>

                <Grid item xs={12} >
                  <Typography variant="h6" className="DatosPrincipalesPerfil">
                    Departamento:
                  </Typography>
                  <Typography variant="h6" className="DatosSecundariosPerfil">
                    {/* {user.DEPARTAMENTOS[0]?.Descripcion}  */}
                  </Typography>

                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" className="DatosPrincipalesPerfil">
                    Correo electrónico:

                  </Typography>
                  <Typography variant="h6" className="DatosSecundariosPerfil">
                    {user.CorreoElectronico}
                  </Typography>
                </Grid>
                <Grid item xs={12}>

                  <Typography variant="h6" className="DatosPrincipalesPerfil">
                    Teléfono:

                  </Typography>
                  <Typography variant="h6" className="DatosSecundariosPerfil">
                    {user.Telefono ? user.Telefono : "Sin Informacion"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>

                  <Typography variant="h6" className="DatosPrincipalesPerfil">
                    Extensión:
                  </Typography>
                  <Typography variant="h6" className="DatosSecundariosPerfil">
                    {user.Ext ? user.Ext : "Sin Informacion"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>

                  <Typography variant="h6" className="DatosPrincipalesPerfil">
                    Teléfono Móvil:

                  </Typography>
                  <Typography variant="h6" className="DatosSecundariosPerfil">
                    {user.Celular ? user.Celular : "Sin Informacion"}
                  </Typography>

                </Grid>
                <Grid item xs={12} paddingBottom={3}>
                  <Typography variant="h6" className="DatosPrincipalesPerfil">
                    Puesto:

                  </Typography>
                  <Typography variant="h6" className="DatosSecundariosPerfil">
                    {user.Puesto ? user.Puesto : "Sin Informacion"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          : ""
        }
        {value === "password" ?
          < Grid container paddingTop="5%" direction="column" justifyContent="center" alignItems="center" >
            <Grid item container alignItems="center" justifyContent="center"  >
              <Grid item xs={11} >
                <Typography variant="h6"> Ingrese Nueva Contraseña</Typography>
                <TextField
                  sx={{ minl: "center", borderRadius: "10px", }}
                  required
                  margin="dense"
                  value={password}
                  type="password"
                  fullWidth
                  variant="outlined"
                  onChange={(v) => setPassword(v.target.value)}
                  error={password.length < 6 ? true : false}
                  inputProps={{
                    maxLength: 100,
                    minLength: 6
                  }}
                />
                <FormHelperText id="component-helper-text">
                  <>
                    <InfoOutlinedIcon /> <label> Mínimo 6 Caracteres</label>
                  </>
                </FormHelperText>
              </Grid>

              <Grid item xs={11} >
                <Typography variant="h6"> Confirme  Contraseña</Typography>
                <TextField
                  required
                  margin="dense"
                  value={confPassword}
                  type="password"
                  fullWidth
                  variant="outlined"
                  onChange={(v) => setConfPassword(v.target.value)}
                  error={(password !== confPassword) ? true : false}
                  inputProps={{
                    maxLength: 100,
                    minLength: 6
                  }}
                />
              </Grid>
              <Grid container justifyContent="center" alignItems="center" alignContent="center">
                <Grid item paddingTop="10%" xs={6}>
                  <Button 
                  className="enviar-mensaje"
                    disabled={(password !== confPassword) || (password.length < 6)}
                    onClick={() => onClickChangePassword()}
                   fullWidth variant="contained"> <Typography color="white"> Cambiar </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid >
          </Grid>
          : ""}
      </Grid>

    </Grid>

  );
};
