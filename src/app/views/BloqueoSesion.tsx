import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Fingerprint } from "@mui/icons-material";
import { USUARIORESPONSE, UserLogin } from "../interfaces/UserInfo";
import { getToken, getUser } from "../services/localStorage";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";



export function BloqueoSesion({
  handlePassword,
}: {
  handlePassword: Function;
}) {


  const [password, setPassword] = useState("");
  const [apellPat, setApellPat] = useState("");
  const [apellMat, setApellMat] = useState("");
  const [name, setName] = useState("");


  useEffect(() => {
 const decoded: UserLogin = jwt_decode(String(getToken()));
    if (getUser() === null  || getUser() === "undefined") {

      setApellMat("");
      setApellPat("");
      setName(decoded.NombreUsuario);

    } else {
      const user: USUARIORESPONSE = JSON.parse(String(getUser() === "undefined" || getUser() === undefined ? null : getUser()));
      setApellMat(user?.ApellidoMaterno);
      setApellPat(user?.ApellidoPaterno);
      setName(user?.Nombre);
    }

  }, [])


  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "50%",
          height: "30%",
          blackgroundColor: '#FFFFFF',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "3vw" }}>{name + ' ' + apellPat + ' ' + apellMat}</Typography>
          <TextField
            sx={{
              width: "50vw",
              height: "5vh",
            }}
            type="password"
            onChange={(v) => setPassword(v.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Contraseña"
          ></TextField>

          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton aria-label="fingerprint" color="secondary" onClick={() => handlePassword(password,name )}>
              <Fingerprint />
            </IconButton>
          </Box>



          <Typography sx={{ mt: 3, fontSize: "2vw" }}>
            Sesión pausada por inactividad o Recargar la Página, Ingrese contraseña por Seguridad
          </Typography>
          <Typography sx={{ mt: 5, fontSize: "1.8vw" }}>
            ¿Esa persona no es usted?{" "}
          </Typography>
          <Box>
            <Typography sx={{ mt: 1, fontSize: "1.8vw" }}>
              Haz click{" "}
              <Button
                onClick={() => {
                  localStorage.clear();
                  var ventana = window.self;
                  ventana.location.replace(String(process.env.REACT_APP_APPLICATION_BASE_URL_LOGIN));
                }}

                sx={{ mt: 1, fontSize: "1.6vw" }}
              >
                aquí
              </Button>
              para iniciar sesión con un Usuario diferente.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}


