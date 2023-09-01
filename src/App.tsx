import jwt_decode from "jwt-decode";
import { useLayoutEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { HashRouter } from "react-router-dom";
import Swal from "sweetalert2";
import "./Fonts.css";
import "./Globals.css";
import { AppRouter } from "./app/router/AppRouter";
import { AuthService } from "./app/services/AuthService";
import { UserServices } from "./app/services/UserServices";
import {
  getIdApp,
  getRfToken,
  getToken,
  getUser,
  setDepartamento,
  setIdApp,
  setMenus,
  setPerfilFoto,
  setPermisos,
  setRfToken,
  setRoles,
  setToken,
  setUser,
  validaLocalStorage,
} from "./app/services/localStorage";
import { BloqueoSesion } from "./app/views/BloqueoSesion";
import Slider from "./app/views/Progress";
import Validacion from "./app/views/Validacion";
import { USUARIORESPONSE, UserLogin } from "./app/interfaces/UserInfo";

function App() {
  //cambiar a 5 minutos
  const timeout = 960000;
  const urlParams = window.location.search;
  const query = new URLSearchParams(urlParams);
  const jwt = query.get("jwt");
  const refjwt = query.get("rf");
  const idapp = query.get("IdApp");

  const [openSlider, setOpenSlider] = useState(true);
  const [bloqueoStatus, setBloqueoStatus] = useState<boolean>();
  const [login, setlogin] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>();
  const [acceso, setAcceso] = useState(false);
  const [contrseñaValida, setContraseñaValida] = useState(true);

  const mensaje = (icon: string, title: string, text: string) => {
    setlogin(false);
    setAcceso(false);
    Swal.fire({
      icon: icon === "info" ? "info" : "warning",
      title: title,
      text: text,
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        var ventana = window.self;
        ventana.location.replace(
          String(process.env.REACT_APP_APPLICATION_BASE_URL_LOGIN)
        );
      }
    });
  };

  const GetImage = (tipo: string, nameImagen: string) => {
    AuthService.GetImagenProfile(tipo, nameImagen).then((res) => {
      if (res.SUCCESS) {
        setPerfilFoto(res.RESPONSE.RESPONSE);
      }
    });
  };

  const buscaUsuario = (id: string) => {
    let data = {
      IdUsuario: id,
      IdApp: JSON.parse(String(getIdApp())),
    };

    UserServices.userAppDetail(data).then((res) => {
      console.log(res);
      if (res?.status === 200) {
        console.log(res.data.data);
        setUser(res.data.data);
        setRoles(res.data.roles[0]);
        setMenus(res.data.menus[0]);
        setPermisos(
          res.data.permisos[0] == undefined ? [] : res.data.permisos[0]
        );
        setUserName(res.data.data.NombreUsuario);

        setBloqueoStatus(false);
        setOpenSlider(false);
        setAcceso(true);
        setlogin(true);
      } else if (res.status === 401) {
        setOpenSlider(false);
        setlogin(false);
        setAcceso(false);
      }
    });

    // AuthService.adminUser(data).then((res2) => {
    //   const us: UserInfo = res2;
    //   setUser(us.RESPONSE);

    //   if (String(us.RESPONSE) === "PrimerInicio") {
    //     Swal.fire({
    //       icon: "info",
    //       title: 'Bienvenid@',
    //       text: 'Su cuenta Se Confirmo Correctamente',
    //       showDenyButton: false,
    //       showCancelButton: false,
    //       confirmButtonText: "Aceptar",
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         var ventana = window.self;
    //         ventana.location.reload();
    //       }
    //     });

    //   }
    //   else if (us.SUCCESS && String(us.RESPONSE) !== "PrimerInicio") {
    //     setRoles(us.RESPONSE.ROLES);
    //     setPermisos(us.RESPONSE.PERMISOS);
    //     setMenus(us.RESPONSE.MENUS);
    //     setPerfiles(us.RESPONSE.PERFILES);
    //     setDepartamento(us.RESPONSE.DEPARTAMENTOS);
    //     setOpenSlider(false);
    //     setlogin(true);
    //     setAcceso(true);
    //     setBloqueoStatus(false);
    //     GetImage("/FOTOPERFIL/", us?.RESPONSE?.RutaFoto);

    //   }
    //   else if (us.SUCCESS) {
    //     mensaje('', 'Información', us.STRMESSAGE==="Exito"?"":us.STRMESSAGE + " Contactar Al Departamento Correspondiente");
    //   }
    //   else if (us.SUCCESS === false && !us.RESPONSE) {
    //     Swal.fire({
    //       icon: "info",
    //       title: 'Bienvenid@',
    //       text: us.STRMESSAGE,
    //       showDenyButton: false,
    //       showCancelButton: false,
    //       confirmButtonText: "Aceptar",
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         var ventana = window.self;
    //         ventana.location.replace(String(process.env.REACT_APP_APPLICATION_BASE_URL_LOGIN))

    //       }
    //     });
    //   }
    //   else if (us.SUCCESS === false && us.RESPONSE) {
    //     Swal.fire({
    //       icon: "info",
    //       title: us.RESPONSE,
    //       showDenyButton: false,
    //       showCancelButton: false,
    //       confirmButtonText: "Aceptar",
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         var ventana = window.self;
    //         ventana.location.replace(String(process.env.REACT_APP_APPLICATION_BASE_URL_LOGIN));

    //       }
    //     });
    //   }
    // });
  };

  const verificatoken = (primerInicio: boolean) => {
    UserServices.verify({}).then((res) => {
      // console.log(res);
      if (res?.status === 200) {
        setUserName(res.data.data.NombreUsuario);
        buscaUsuario(res.data.data.IdUsuario);
        setBloqueoStatus(false);
        setOpenSlider(false);
        if (!primerInicio) {
          var ventana = window.self;
          ventana.location.reload();
        }
      } else if (res.status === 401) {
        setOpenSlider(false);
        setlogin(false);
        setAcceso(false);
      }
    });
  };

  const handleOnActive = (password: string, user: string) => {
    const decoded: UserLogin = jwt_decode(String(getToken()));
    const userInfo: USUARIORESPONSE = JSON.parse(String(getUser()));
    let data = {
      NombreUsuario: decoded.NombreUsuario
        ? decoded.NombreUsuario
        : userInfo.NombreUsuario,
      Contrasena: password,
    };
    setOpenSlider(true);
    UserServices.login(data).then((res) => {
      if (res.status === 200) {
        setContraseñaValida(true);
        setToken(res.data.token);
        setRfToken(res.data.refreshToken);
        var ventana = window.self;
        ventana.location.reload();

        if (!getUser() || getUser() === undefined) {
          verificatoken(false);
        }
      } else if (res.status === 401) {
        setContraseñaValida(false);
        Swal.fire({
          title: res.data.msg,
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            setAcceso(false);
            localStorage.clear();
            var ventana = window.self;
            ventana.location.replace(
              String(process.env.REACT_APP_APPLICATION_BASE_URL_LOGIN)
            );
          }
        });
      }
    });
  };

  const handleOnIdle = () => {
    setBloqueoStatus(true);
    setAcceso(false);
  };

  const {} = useIdleTimer({
    timeout,
    onIdle: handleOnIdle,
  });

  useLayoutEffect(() => {
    if (jwt && refjwt && getToken() && getRfToken()) {
      localStorage.clear();
    }

    if (
      !getToken() &&
      !getRfToken() &&
      jwt !== null &&
      refjwt !== null &&
      !acceso &&
      bloqueoStatus === undefined
    ) {
      const decoded: UserLogin = jwt_decode(String(jwt));
      if ((decoded.exp - Date.now() / 1000) / 60 > 1) {
        setToken(jwt);
        setRfToken(refjwt);
        setIdApp(idapp);
        var ventana = window.self;
        ventana.location.replace("/");
      } else {
        Swal.fire({
          title: "Token no valido",
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.clear();
            var ventana = window.self;
            ventana.location.replace(
              String(process.env.REACT_APP_APPLICATION_BASE_URL_LOGIN)
            );
          }
        });
      }
    }

    if (
      !jwt &&
      !refjwt &&
      bloqueoStatus === undefined &&
      !acceso &&
      !login &&
      getToken() &&
      getRfToken()
    ) {
      const decoded: UserLogin = jwt_decode(String(getToken()));
      if ((decoded.exp - Date.now() / 1000) / 60 > 44.5) {
        verificatoken(true);
      } else {
        handleOnIdle();
      }
    } else {
      setOpenSlider(false);
    }
  }, [bloqueoStatus]);

  return (
    <div>
      <Slider open={openSlider}></Slider>
      {bloqueoStatus ? (
        <BloqueoSesion handlePassword={handleOnActive} />
      ) : acceso ? (
        <>
          <HashRouter basename={"/"}>
            <AppRouter login={login} />
          </HashRouter>
        </>
      ) : !contrseñaValida ? (
        <Validacion />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
