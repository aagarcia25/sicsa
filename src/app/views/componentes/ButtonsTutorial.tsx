import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import HelpIcon from "@mui/icons-material/Help";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import UploadIcon from "@mui/icons-material/Upload";
import {
  Button,
  Collapse,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ITEMS,
  RESPONSEGUIARAPIDA,
  RESPONSEPREGUNTASFRECUENTES,
  RESPONSEVIDEOS,
} from "../../interfaces/UserInfo";
import { menus } from "../../interfaces/menu";
import { getMenus, getToken } from "../../services/localStorage";
import { AuthService } from "../../services/AuthService";
import { ValidaSesion } from "../../services/UserServices";
import { TooltipPersonalizado } from "./CustomizedTooltips";
import { VisualizadorAyudas } from "./VisualizadorAyudas";
import AdminAyudasModal from "../AdminVideosTutoriales/AdminAyudasModal";
import { CatalogosServices } from "../../services/catalogosServices";
import Swal from "sweetalert2";
import Progress from "../Progress";

const ButtonsTutorial = ({
  route,
  handleCloseMenuVideos,
}: {
  route: string;
  handleCloseMenuVideos: Function;
}) => {
  const [open, setOpen] = React.useState(false);
  const [openCarga, setOpenCarga] = React.useState(false);
  const [dataVideos, setDataVideos] = useState<Array<RESPONSEVIDEOS>>([]);
  const [dataPreguntasFrecuentes, setDataPreguntasFrecuentes] = useState<
    Array<RESPONSEPREGUNTASFRECUENTES>
  >([]);
  const [dataGuiaRapida, setDataGuiaRapida] = useState<
    Array<RESPONSEGUIARAPIDA>
  >([]);
  const [idMenu, setIdMenu] = useState<string>("");
  const list: menus[] = JSON.parse(String(getMenus()));
  const [slideropen, setslideropen] = useState(false);
  const [openMenu, setOpenMenu] = useState(-1);
  const [URLVideo, setURLVideo] = useState<string>("");
  const [modo, setModo] = useState<string>("");

  const handleClickOpen = (URLVideo: string, modo: string) => {
    setModo(modo);
    setURLVideo(URLVideo);
    setOpen(true);
  };

  const handleObtenerVideos = (idmenu: string) => {
    let data = {
      CHID: idmenu,
      NUMOPERACION:
        JSON.parse(String(getcontrolInternoEntidad())) == "DTI" ? 12 : 9,
      TIPO:
        JSON.parse(String(getcontrolInternoEntidad())) == "ORG" ||
        JSON.parse(String(getcontrolInternoEntidad())) == "MUN"
          ? 1
          : 2,
    };
    AuthService.AdminAyudas(data).then((res) => {
      if (res.SUCCESS) {
        console.log("resultado de obtener guias");
        console.log(res.SUCCESS);
        setDataVideos(res.RESPONSE);
      } else {
      }
    });
  };

  const handleObtenerPreguntasFrecuentes = (
    idmenu: string,
    numOperacion: number
  ) => {
    let data = {
      CHID: idmenu,
      NUMOPERACION: numOperacion,
      TIPO:
        JSON.parse(String(getcontrolInternoEntidad())) == "ORG" ||
        JSON.parse(String(getcontrolInternoEntidad())) == "MUN"
          ? 1
          : 2,
    };
    AuthService.AdminAyudas(data).then((res) => {
      if (res.SUCCESS) {
        if (numOperacion == 7 || numOperacion == 10) {
          setDataPreguntasFrecuentes(res.RESPONSE);
        } else if (numOperacion == 8 || numOperacion == 11) {
          setDataGuiaRapida(res.RESPONSE);
        }
      } else {
      }
    });
  };
  const handleClick = (x: number) => {
    openMenu == x ? setOpenMenu(-1) : setOpenMenu(x);
  };

  const handleClickOpenCarga = () => {
    setOpenCarga(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenCarga(false);
    handleObtenerVideos(idMenu);
    handleObtenerPreguntasFrecuentes(
      idMenu,
      JSON.parse(String(getcontrolInternoEntidad())) == "DTI" ? 10 : 7
    );
    handleObtenerPreguntasFrecuentes(
      idMenu,
      JSON.parse(String(getcontrolInternoEntidad())) == "DTI" ? 11 : 8
    );
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    ValidaSesion();
    // list.map((item: any) => {
    //   item.item.map((itemsMenu: ITEMS) => {
    //     if (
    //       String(itemsMenu.Path) ==
    //       window.location.href
    //         .slice(window.location.href.indexOf("#") + 1)
    //         .replace(/%20/g, " ")
    //     ) {
    //       setIdMenu(itemsMenu.Id);
    //       handleObtenerVideos(itemsMenu.Id);
    //       handleObtenerPreguntasFrecuentes(
    //         itemsMenu.Id,
    //         JSON.parse(String(getcontrolInternoEntidad())) == "DTI" ? 10 : 7
    //       );
    //       handleObtenerPreguntasFrecuentes(
    //         itemsMenu.Id,
    //         JSON.parse(String(getcontrolInternoEntidad())) == "DTI" ? 11 : 8
    //       );
    //     }
    //   });
    // });
  }, [window.location.href]);

  return (
    <div>
      <Progress open={slideropen}></Progress>

      <Grid
        className="containerBotonesControladoresVideos"
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {dataVideos.length == 0 ? (
          ""
        ) : (
          <Grid item xs={5}>
            <TooltipPersonalizado
              placement="left"
              title={
                <React.Fragment>
                  <div className="containerBotonesVideos">
                    <Typography variant="h5" className="TooltipPersonalizado">
                      Videos de ayuda
                    </Typography>
                    <Grid container className="containerVideosLista">
                      {dataVideos.length == 0
                        ? ""
                        : dataVideos.map((datos) => {
                            return (
                              <Grid
                                key={Math.random()}
                                container
                                direction="row"
                                justifyContent="space-around"
                                alignItems="center"
                              >
                                <Grid key={Math.random()} item xs={9.5}>
                                  <div
                                    key={Math.random()}
                                    className="div-BotonesVideos"
                                  >
                                    <IconButton
                                      key={Math.random()}
                                      className="VerVideos"
                                      onClick={() =>
                                        handleClickOpen(
                                          String(datos?.RutaVideo),
                                          "video"
                                        )
                                      }
                                    >
                                      <OndemandVideoIcon />
                                      <Typography
                                        variant="h6"
                                        className="FuenteDeBotonesTooltip"
                                      >
                                        {datos?.NombreOriginalVideo + " "}
                                      </Typography>
                                    </IconButton>
                                  </div>
                                </Grid>

                                <Grid key={Math.random()} item xs={2}>
                                  <div
                                    key={Math.random()}
                                    className="div-BotonesVideos"
                                  >
                                    <IconButton
                                      key={Math.random()}
                                      className="VerVideos"
                                      onClick={() =>
                                        handleClickDelet(
                                          datos?.RutaVideo,
                                          route
                                        )
                                      }
                                    >
                                      <DeleteForeverIcon />
                                    </IconButton>
                                  </div>
                                </Grid>
                              </Grid>
                            );
                          })}
                    </Grid>
                  </div>
                </React.Fragment>
              }
            >
              <IconButton
                className="ControlVideosHeader"
                onClick={() =>
                  handleClickOpen(
                    dataVideos.length == 1 ? dataVideos[0]?.RutaVideo : "",
                    "video"
                  )
                }
              >
                <OndemandVideoIcon className="IconoDentroBoton" />
              </IconButton>
            </TooltipPersonalizado>
          </Grid>
        )}

        <Grid item xs={5}>
          <Tooltip title="Cargar Video Tutorial">
            <IconButton
              className="ControlVideosHeader"
              onClick={handleClickOpenCarga}
            >
              <UploadIcon className="IconoDentroBoton" />
            </IconButton>
          </Tooltip>
        </Grid>

        {dataGuiaRapida.length == 0 ? (
          ""
        ) : (
          <>
            <Grid
              container
              item
              xs={12}
              direction="row"
              justifyContent="flex-start"
            >
              <TooltipPersonalizado
                placement="left"
                title={
                  <React.Fragment>
                    <div className="containerBotonesVideos">
                      <Typography variant="h5" className="TooltipPersonalizado">
                        {" "}
                        Guía Rapida
                      </Typography>
                      <Grid container className="containerVideosLista">
                        {dataGuiaRapida.length == 0
                          ? ""
                          : dataGuiaRapida.map((datos) => {
                              return (
                                <Grid
                                  key={Math.random()}
                                  container
                                  direction="row"
                                  justifyContent="space-around"
                                  alignItems="center"
                                >
                                  <Grid
                                    key={Math.random()}
                                    item
                                    xs={12}
                                    padding={0.5}
                                  >
                                    <div
                                      key={Math.random()}
                                      className="div-BotonesVideosTexto"
                                    >
                                      <Grid key={Math.random()} item>
                                        <Button
                                          className="ButtonGuiaRapida"
                                          onClick={() =>
                                            handleClickOpen(
                                              String(datos?.RutaGuia),
                                              "guia"
                                            )
                                          }
                                        >
                                          {datos?.Pregunta + " "}
                                        </Button>
                                      </Grid>
                                    </div>
                                  </Grid>
                                </Grid>
                              );
                            })}
                      </Grid>
                    </div>
                  </React.Fragment>
                }
              >
                <IconButton
                  className="ControlMenuHeaderButton"
                  // onClick={onOpenHelp}
                >
                  <MenuBookIcon className="IconoDentroBoton" />
                  <Typography variant="h6" className="TextoMenuHeader">
                    {" "}
                    Guía Rapida
                  </Typography>
                </IconButton>
              </TooltipPersonalizado>
            </Grid>
          </>
        )}
        {dataPreguntasFrecuentes.length == 0 ? (
          ""
        ) : (
          <>
            <Grid container item xs={12} justifyContent="flex-start">
              <TooltipPersonalizado
                placement="left"
                title={
                  <React.Fragment>
                    <div className="containerBotonesVideos">
                      <Typography variant="h5" className="TooltipPersonalizado">
                        {" "}
                        Preguntas frecuentes
                      </Typography>
                      <Grid container className="containerVideosLista">
                        {dataPreguntasFrecuentes.length == 0
                          ? ""
                          : dataPreguntasFrecuentes.map((datos, indexx) => {
                              return (
                                <Grid
                                  key={Math.random()}
                                  container
                                  direction="row"
                                  justifyContent="space-around"
                                  alignItems="center"
                                >
                                  <Grid container item xs={12}>
                                    <ListItemButton
                                      sx={{
                                        bgcolor:
                                          openMenu == indexx
                                            ? "rgba(195, 165, 117)"
                                            : "rgba(255, 255, 255, 0.291)",
                                      }}
                                      key={indexx}
                                      onClick={() => handleClick(indexx)}
                                    >
                                      <ListItemText
                                        key={indexx}
                                        primary={
                                          <Typography
                                            variant="caption"
                                            sx={{
                                              fontFamily: "sans-serif",
                                              fontWeight: "800",
                                            }}
                                            gutterBottom
                                          >
                                            {datos?.Pregunta}
                                          </Typography>
                                        }
                                      />
                                      {/* {openMenu == indexx ? <ExpandLess /> : <ExpandMore />} */}
                                    </ListItemButton>
                                  </Grid>
                                  <Grid container item xs={12} paddingLeft={2}>
                                    <Collapse
                                      key={indexx}
                                      in={openMenu == indexx}
                                      timeout="auto"
                                      unmountOnExit
                                    >
                                      <List
                                        sx={{ borderRadius: "1" }}
                                        key={indexx}
                                        component="div"
                                        disablePadding
                                      >
                                        <Divider />
                                        <ListItemText
                                          key={indexx}
                                          primary={
                                            <>
                                              <Typography
                                                variant="h5"
                                                className="menu-Typography"
                                                gutterBottom
                                              >
                                                {datos.Texto}
                                              </Typography>
                                            </>
                                          }
                                        />
                                        <Divider />
                                      </List>
                                    </Collapse>
                                  </Grid>
                                </Grid>
                              );
                            })}
                      </Grid>
                    </div>
                  </React.Fragment>
                }
              >
                <IconButton
                  className="ControlMenuHeaderButton"
                  // onClick={onOpenHelp}
                >
                  <HelpIcon className="IconoDentroBoton" />
                  <Typography variant="h6" className="TextoMenuHeader">
                    {" "}
                    Preguntas Frecuentes
                  </Typography>
                </IconButton>
              </TooltipPersonalizado>
            </Grid>
          </>
        )}
      </Grid>

      {open ? (
        <VisualizadorAyudas
          URLVideo={URLVideo}
          modo={modo}
          handleclose={handleCloseModal}
        />
      ) : (
        ""
      )}

      {openCarga ? (
        <AdminAyudasModal
          IdMenu={idMenu}
          modo={"Administrar ayudas"}
          tipo={0}
          handleClose={handleClose}
          dt={{}}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ButtonsTutorial;

export const handleClickDelet = (URLVideo: string, route: string) => {
  let data = {
    TOKEN: JSON.parse(String(getToken())),
    RUTA: route,
    NOMBRE: URLVideo,
  };

  if (URLVideo !== "") {
    ValidaSesion();
    CatalogosServices.deleteVideoTutorial(data).then((res) => {
      if (res.SUCCESS) {
        Swal.fire("¡Video eliminado!", "¡Error!", "success");
      } else {
        Swal.fire("¡ups!. Algo Fallo", "¡Error!", "success");
      }
    });
  }
};
function getcontrolInternoEntidad(): any {
  throw new Error("Function not implemented.");
}
