import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonIcon from "@mui/icons-material/Person";
import { Backdrop, Button, Fade, Hidden, SpeedDialAction } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper, { PopperPlacementType } from "@mui/material/Popper";
import SpeedDial from "@mui/material/SpeedDial";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import logoNL from "../assets/img/logo1.svg";
import { getToken, getUser } from "../services/localStorage";
import { Blanco } from "../styles/imagen";

import NotesIcon from "@mui/icons-material/Notes";
import { base64ToArrayBuffer } from "../helpers/Files";
import { USUARIORESPONSE } from "../interfaces/UserInfo";
import { AuthService } from "../services/AuthService";
import ButtonsTutorial from "./componentes/ButtonsTutorial";

interface HeaderProps {
  onDrawerToggle: () => void;
  name: string;
  id: any;
  imgData: string;
  imgTipo: string;
  //idMenu:any;
}

export default function Header(props: HeaderProps) {
  const btnPerson = "120%";
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const navigate = useNavigate();
  const [cnotif, setCnotif] = React.useState(0);
  const { onDrawerToggle } = props;
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [placement, setPlacement] = React.useState<PopperPlacementType>();

  const handleToggle =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setPlacement(newPlacement);
      setOpen((prevOpen) => !prevOpen);
    };
  const onOpenCalendar = () => {
    setOpen((prevOpen) => !prevOpen);
    navigate("/Calendario");
  };

  const onOpenHelp = () => {
    setOpen((prevOpen) => !prevOpen);
    let guia = window.location.hash.replace("#", "");
    guia = guia.replace(/[^a-zA-Z0-9 ]/g, "");

    let data = {
      NOMBRE: guia,
      TOKEN: JSON.parse(String(getToken())),
    };

    AuthService.obtenerguias(data).then((res) => {
      var bufferArray = base64ToArrayBuffer(String(res.RESPONSE.RESPONSE.FILE));
      var blobStore = new Blob([bufferArray], { type: "application/pdf" });

      var data = window.URL.createObjectURL(blobStore);
      var link = document.createElement("a");
      document.body.appendChild(link);
      link.href = data;
      window.open(link.href, "_blank");
    });
  };

  const onNotification = () => {
    setOpen((prevOpen) => !prevOpen);
    navigate("/Notification");
  };
  const onConfigProfile = () => {
    navigate("/perfil");
    setOpen((prevOpen) => !prevOpen);
  };

  const handleCloseMenuVideos = () => {
    setOpen((prevOpen) => !prevOpen);
    setOpen(false);
  };

  const onLogOut = () => {
    localStorage.clear();
    var ventana = window.self;
    ventana.location.replace(
      String(process.env.REACT_APP_APPLICATION_BASE_URL_LOGIN)
    );
  };

  const [openDial, setOpenDial] = React.useState(false);
  const handleOpenDial = () => setOpenDial(true);
  const handleCloseDial = () => setOpenDial(false);
  const actions = [
    {
      icon: (
        <>
          <Tooltip title=" Configuración de perfil">
            <IconButton
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={onConfigProfile}
              color="inherit"
              sx={{
                width: "2.9rem",
                height: "2.9rem",
                fontSize: btnPerson,
                p: 0.1,
                backgroundColor:
                  user?.RutaFoto !== null ? "#FFFFFF" : "#051c2c",
                "&:hover": { backgroundColor: "#CCCCCC" },
              }}
            >
              {user.RutaFoto !== null || props.imgData !== "undefined" ? (
                <img
                  style={{
                    objectFit: "scale-down",
                    width: "100%",
                    height: "100%",
                  }}
                  src={
                    "data:" +
                    String(
                      props.imgTipo === "undefined"
                        ? Blanco.Tipo
                        : props.imgTipo
                    ) +
                    ";base64," +
                    String(
                      props.imgData === "undefined"
                        ? Blanco.Data
                        : props.imgData
                    )
                  }
                />
              ) : (
                <PersonIcon className="IconoDentroBoton" />
              )}
            </IconButton>
          </Tooltip>
        </>
      ),
      name: " Configuración",
    },

    {
      icon: (
        <>
          <Tooltip title="Guía Rapida">
            <IconButton className="ButtonColorGenerico" onClick={onOpenHelp}>
              <HelpIcon className="IconoDentroBoton" />
            </IconButton>
          </Tooltip>{" "}
        </>
      ),
      name: "Guía",
    },
    {
      icon: (
        <>
          <Tooltip title=" Cerrar sesión">
            <IconButton className="ButtonColorGenerico" onClick={onLogOut}>
              <LogoutIcon className="IconoDentroBoton" />
            </IconButton>
          </Tooltip>{" "}
        </>
      ),
      name: "Salir",
    },
  ];

  const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: "fixed",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {},
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {},
  }));

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  let data = {
    NUMOPERACION: 5,
    CHUSER: user?.Id ? user?.Id : "",
  };

  React.useEffect(() => {
    /* CatalogosServices.Notificaciones(data).then((res) => {
      let result = res.RESPONSE;
      setCnotif(result[0].count);

    });*/
  }, [props.imgTipo]);

  return (
    <React.Fragment>
      <AppBar
        style={{
          color: "#FFFFFF",
          backgroundColor: "#FFFFFF",
          paddingBottom: "1%",
          margin: "0",
        }}
        position="sticky"
        elevation={0}
        sx={{ width: "99%" }}
      >
        <Grid
          container
          item
          xs={12}
          md={12}
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{ padding: "0", margin: "0" }}
        >
          <Grid
            container
            item
            xs={6}
            sm={1}
            justifyContent="center"
            alignItems="center"
            alignContent="center"
          >
            <Tooltip title="Menú">
              <div className="Grid-MenuButton-Header">
                <Button
                  className="buttonMenuBurger"
                  onClick={() => onDrawerToggle()}
                >
                  <NotesIcon sx={{ width: "100%", height: "100%" }} />
                </Button>
              </div>
            </Tooltip>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={11}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Grid item container xs={12} sm={12}>
              <Hidden smUp>
                <Backdrop open={openDial} />
                <Grid item xs={12}>
                  <StyledSpeedDial
                    className="ButtonColorGenericoHeaderProfileMovil"
                    ariaLabel="SpeedDial tooltip example"
                    sx={{ top: "1%", bottom: 1, right: "10%" }}
                    icon={
                      <>
                        {/* <div className="containerHeaderPerfilVistaMovil"> */}
                        <Button
                          className="ButtonColorGenericoHeaderProfileMovil"
                          ref={anchorRef}
                          aria-controls={open ? "composition-menu" : undefined}
                          aria-expanded={open ? "true" : undefined}
                          aria-haspopup="true"
                          onClick={handleToggle("left-start")}
                          sx={{
                            width: "3.9rem",
                            height: "3.9rem",
                            fontSize: btnPerson,
                            p: 0.1,
                          }}
                        >
                          <img
                            className="LogoMenu"
                            style={{
                              objectFit: "scale-down",
                              width: "60%",
                              height: "1000%",
                            }}
                            src={logoNL}
                          />
                        </Button>

                        {/* </div> */}
                      </>
                    }
                    onClose={handleCloseDial}
                    onOpen={handleOpenDial}
                    open={openDial}
                    direction={"down"}
                  >
                    {actions.map((action) => (
                      <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={handleClose}
                      />
                    ))}
                  </StyledSpeedDial>
                </Grid>
              </Hidden>
            </Grid>

            <Hidden smDown>
              <Grid
                container
                item
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                xs={12}
                sm={10}
                md={8}
                xl={8}
              >
                <Grid item paddingRight={2}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <Grid
                      container
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <Typography variant="h6" className="TextoHeader">
                        {props.name}
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <Typography variant="h6" className="TextoHeader">
                        {user.Puesto}
                      </Typography>
                    </Grid>

                    <Grid
                      container
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <Typography variant="h6" className="TextoHeader">
                        {user.Entidad}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <div className="containerBotonesHeaderPerfil">
                    <Tooltip title="Haz click para ver más">
                      <Button
                        className="ButtonColorGenericoHeaderProfile"
                        ref={anchorRef}
                        id="composition-button"
                        aria-controls={open ? "composition-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle("left")}
                        color="inherit"
                      >
                        {props.imgData !== "undefined" ? (
                          <>
                            <img
                              className="imgDentroDeHeaderInicio"
                              src={
                                "data:" +
                                String(
                                  props.imgData === "undefined"
                                    ? Blanco.Tipo
                                    : props.imgTipo
                                ) +
                                ";base64," +
                                String(
                                  props.imgData === "undefined"
                                    ? Blanco.Data
                                    : props.imgData
                                )
                              }
                            />
                          </>
                        ) : (
                          <PersonIcon
                            sx={{
                              width: "60%",
                              height: "60%",
                            }}
                            className="IconoDentroBotonPerfil"
                          />
                        )}
                      </Button>
                    </Tooltip>
                  </div>
                </Grid>
                <Popper
                  open={open}
                  role={undefined}
                  placement={placement}
                  anchorEl={anchorEl}
                  transition
                  disablePortal
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem onClick={onConfigProfile}>
                              <IconButton onClick={onConfigProfile}>
                                <ManageAccountsIcon className="IconoDentroBoton" />
                              </IconButton>{" "}
                              Configuración de perfil
                            </MenuItem>

                            <Hidden mdDown>
                              <Grid className="containerMenuItemBotones">
                                <ButtonsTutorial
                                  route={"/VIDEOS/TUTORIALES/"}
                                  handleCloseMenuVideos={handleCloseMenuVideos}
                                />
                              </Grid>
                            </Hidden>

                            <MenuItem onClick={onLogOut}>
                              <IconButton onClick={onLogOut}>
                                <LogoutIcon className="IconoDentroBoton" />
                              </IconButton>{" "}
                              Cerrar sesión
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
      </AppBar>
    </React.Fragment>
  );
}
