import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import HelpIcon from "@mui/icons-material/Help";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { GridColDef } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import { getToken, getUser } from "../../services/localStorage";
import { CatalogosServices } from "../../services/catalogosServices";
import { ValidaSesion } from "../../services/UserServices";
import { AuthService } from "../../services/AuthService";
import { Toast } from "../../helpers/Toast";
import MUIXDataGrid from "../MUIXDataGrid";
import SelectFrag from "../componentes/SelectFrag";
import Progress from "../Progress";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { ShareService } from "../../services/ShareService";
import SelectValues from "../../interfaces/Share";

const AdminAyudas = ({
  IdMenu,
  modo,
  handleClose,
  tipo,
  dt,
}: {
  IdMenu: string;
  modo: string;
  tipo: number;
  handleClose: Function;
  dt: any;
}) => {
  // CAMPOS DE LOS FORMULARIOS

  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [menus, setMenus] = useState<SelectValues[]>([]);
  const [idMenu, setIdMenu] = useState(IdMenu);
  const [openCarga, setOpenCarga] = useState(false);
  const [slideropen, setslideropen] = useState(false);
  const [newVideo, setNewVideo] = useState(Object);
  const [nombreArchivo, setNombreArchivo] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [pregunta, setPregunta] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [value, setValue] = useState("");
  const [valueDepartamento, setValueDepartamento] = useState("");
  const [preguntas, setPreguntas] = useState([]);

  function enCambioFile(event: any) {
    setslideropen(true);
    if (
      event?.target?.files[0] &&
      event.target.files[0].type.split("/")[0] == "video"
    ) {
      setNombreArchivo(event?.target?.value?.split("\\")[2]);
      let file = event?.target!?.files[0]!;
      setVideoPreview(URL.createObjectURL(event.target.files[0]));
      setNewVideo(file);
      setslideropen(false);
    } else if (
      event?.target?.files[0] &&
      event.target.files[0].type == "application/pdf"
    ) {
      setNombreArchivo(event?.target?.value?.split("\\")[2]);
      let file = event?.target!?.files[0]!;
      setVideoPreview(URL.createObjectURL(event.target.files[0]));
      setNewVideo(file);
      setslideropen(false);
    } else {
      Swal.fire("¡No es un archivo valido!", "", "warning");
      setslideropen(false);
    }
    setslideropen(false);
  }
  const handleSend = () => {
    setOpenCarga(true);
  };

  const loadFilter = (operacion: number) => {
    let data = { NUMOPERACION: operacion };
    ShareService.SelectIndex(data).then((res) => {
      if (operacion == 42) {
        setMenus(res.RESPONSE);
        if (value == "pregunta") {
          consulta(IdMenu ? IdMenu : idMenu == "false" ? "" : idMenu, "4");
        }
        if (value == "guia") {
          consulta(IdMenu ? IdMenu : idMenu == "false" ? "" : idMenu, "11");
        }
        if (value == "video") {
          consulta(IdMenu ? IdMenu : idMenu == "false" ? "" : idMenu, "12");
        }
      }
    });
  };

  const SaveVideo = (cerrar: boolean) => {
    ValidaSesion();
    setVideoPreview("");
    setslideropen(true);
    const formData = new FormData();
    formData.append("NUMOPERACION", value == "video" ? "1" : "2");
    formData.append("VIDEO", newVideo, nombreArchivo);
    formData.append("PREGUNTA", pregunta);
    formData.append("TIPO", valueDepartamento == "ext" ? "1" : "2");
    formData.append("CHUSER", user.Id);
    formData.append("CHID", idMenu);
    formData.append("NAME", nombreArchivo);
    formData.append("TOKEN", JSON.parse(String(getToken())));

    AuthService.AdminAyudas(formData).then((res) => {
      if (res.SUCCESS || res.RESPONSE) {
        Toast.fire({
          icon: "success",
          title: "Archivo Cargado ",
        });
        if (cerrar) {
          handleClose();
        } else {
          handleLimpiaCampos();
          if (value == "pregunta") {
            consulta(IdMenu ? IdMenu : idMenu == "false" ? "" : idMenu, "4");
          }
          if (value == "guia") {
            consulta(IdMenu ? IdMenu : idMenu == "false" ? "" : idMenu, "11");
          }
          if (value == "video") {
            consulta(IdMenu ? IdMenu : idMenu == "false" ? "" : idMenu, "12");
          }
        }

        setslideropen(false);
        setNombreArchivo("");
        setNewVideo(null);
      }
      if (!res.SUCCESS) {
        Toast.fire({
          icon: "error",
          title: "Error Carga de Archivo",
        });
        if (cerrar) {
          handleClose();
        } else {
          handleLimpiaCampos();
        }

        setslideropen(false);
      }
    });
    // handleClose();
  };

  const consulta = (idMenu: string, numOp: string) => {
    setslideropen(true);

    let data = {
      NUMOPERACION: numOp,
      CHID: idMenu == "false" ? "" : idMenu,
    };

    AuthService.AdminAyudas(data).then((res) => {
      if (res.SUCCESS || res.RESPONSE) {
        setPreguntas(res.RESPONSE);
        setslideropen(false);
      }
      if (!res.SUCCESS) {
        Toast.fire({
          icon: "error",
          title: "Error en la busqueda",
        });

        setslideropen(false);
      }
    });
    // handleClose();
  };

  const handleBorrarRegistro = (id: string) => {
    ValidaSesion();
    setslideropen(true);

    let data = {
      NUMOPERACION: 13,
      CHID: id,
      TOKEN: JSON.parse(String(getToken())),
    };

    AuthService.AdminAyudas(data).then((res) => {
      if (res.SUCCESS || res.RESPONSE) {
        if (value == "pregunta") {
          consulta(IdMenu ? IdMenu : idMenu, "4");
        }

        if (value == "video") {
          consulta(IdMenu ? IdMenu : idMenu, "12");
        }

        if (value == "guia") {
          consulta(IdMenu ? IdMenu : idMenu, "11");
        }
      }
      if (!res.SUCCESS) {
        Toast.fire({
          icon: "error",
          title: "Error en la busqueda",
        });

        setslideropen(false);
      }
    });
    // handleClose();
  };

  const SavePreguntasFrecuentes = (cerrar: boolean) => {
    setslideropen(true);

    let data = {
      NUMOPERACION: 3,
      CHUSER: user.Id,
      CHID: idMenu,
      PREGUNTA: pregunta,
      RESPUESTA: respuesta,
      TIPO: valueDepartamento == "ext" ? "1" : "2",
    };
    AuthService.AdminAyudas(data).then((res) => {
      if (res.SUCCESS || res.RESPONSE) {
        Toast.fire({
          icon: "success",
          title: "Pregunta Guardada",
        });
        if (cerrar) {
          handleClose();
        } else {
          consulta(IdMenu ? IdMenu : idMenu, "4");
          handleLimpiaCampos();
        }
        setslideropen(false);
        setNombreArchivo("");
        setNewVideo(null);
      }
      if (!res.SUCCESS) {
        Toast.fire({
          icon: "error",
          title: "Error Guardado de Pregunta",
        });
        if (cerrar) {
          handleClose();
        } else {
          handleLimpiaCampos();
        }
        setslideropen(false);
      }
    });
    // handleClose();
  };

  const columnsGuia: GridColDef[] = [
    { field: "id", hideable: false },
    {
      field: "Acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 150,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title="Eliminar Descuento">
              <IconButton onClick={() => handleBorrarRegistro(v.row.id)}>
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    { field: "Menu", headerName: "Menú", description: "Menú", width: 250 },
    {
      field: "Pregunta",
      headerName: "Pregunta",
      description: "Pregunta",
      width: 600,
    },
    {
      field: "RutaGuia",
      headerName: "Nombre Guía",
      description: "Nombre Guía",
      width: 800,
    },
    {
      field: "Departamento",
      headerName: "Departamento",
      description: "Departamento",
      width: 200,
      renderCell: (v: any) => {
        return (
          <>
            {v.row.Departamento == "1"
              ? "Externo: Municipio u Organismo"
              : "Area Interna"}
          </>
        );
      },
    },
  ];
  const columnsVideo: GridColDef[] = [
    { field: "id", hideable: false },
    {
      field: "Acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 150,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title="Eliminar Descuento">
              <IconButton onClick={() => handleBorrarRegistro(v.row.id)}>
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    { field: "Menu", headerName: "Menú", description: "Menú", width: 250 },
    {
      field: "NombreOriginalVideo",
      headerName: "Nombre Video",
      description: "Nombre Video",
      width: 600,
    },
    {
      field: "RutaVideo",
      headerName: "Ruta Video",
      description: "Ruta Video",
      width: 600,
    },
    {
      field: "Departamento",
      headerName: "Departamento",
      description: "Departamento",
      width: 200,
      renderCell: (v: any) => {
        return (
          <>
            {v.row.Departamento == "1"
              ? "Externo: Municipio Organismo"
              : "Area Interna"}
          </>
        );
      },
    },
  ];
  const columnsPreguntas: GridColDef[] = [
    { field: "id", hideable: false },
    {
      field: "Acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 150,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title="Eliminar Descuento">
              <IconButton onClick={() => handleBorrarRegistro(v.row.id)}>
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    { field: "Menu", headerName: "Menú", description: "Menú", width: 250 },
    {
      field: "Pregunta",
      headerName: "Pregunta",
      description: "Pregunta",
      width: 600,
    },
    {
      field: "Texto",
      headerName: "Respuesta",
      description: "Respuesta",
      width: 800,
    },
    {
      field: "Departamento",
      headerName: "Departamento",
      description: "Departamento",
      width: 200,
      renderCell: (v: any) => {
        return (
          <>
            {v.row.Departamento == "1"
              ? "Externo: Municipio Organismo"
              : "Area Interna"}
          </>
        );
      },
    },
  ];
  const handleFilterChange2 = (v: string) => {
    setIdMenu(v);
    if (value == "pregunta") {
      consulta(IdMenu ? IdMenu : v == "false" ? "" : v, "4");
    }
    if (value == "guia") {
      consulta(IdMenu ? IdMenu : v == "false" ? "" : v, "11");
    }
    if (value == "video") {
      consulta(IdMenu ? IdMenu : v == "false" ? "" : v, "12");
    }
  };

  const handleLimpiaCampos = () => {
    setNombreArchivo("");
    setVideoPreview("");
    setPregunta("");
    setRespuesta("");
    setNewVideo(null);
    setValueDepartamento("");
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    handleLimpiaCampos();
  };
  const handleChangeDepartamento = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setValueDepartamento(newValue);
  };

  const agregar = (data: any) => {
    AuthService.rolesindex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Registro Agregado!",
        });
      } else {
        Swal.fire(res.STRMESSAGE, "¡Error!", "info");
      }
    });
  };
  useEffect(() => {
    if (value == "pregunta") {
      consulta(IdMenu ? IdMenu : idMenu, "4");
    }

    if (value == "video") {
      consulta(IdMenu ? IdMenu : idMenu, "12");
    }

    if (value == "guia") {
      consulta(IdMenu ? IdMenu : idMenu, "11");
    }
    loadFilter(42);

    if (dt?.length == 0) {
    } else {
      setNombreArchivo(dt?.row?.nombreOriginal);
      if (modo == "Carga Videos") {
      }
    }
  }, [dt, value]);

  return (
    <Grid container paddingLeft={1} paddingRight={1}>
      <Progress open={slideropen} />
      <Grid
        container
        item
        xs={12}
        md={6}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <BottomNavigation
          showLabels
          sx={{ width: 500, borderRadius: "10px" }}
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            label="Videos de ayuda"
            value="video"
            icon={<OndemandVideoIcon />}
          />
          <BottomNavigationAction
            label="Guía Rápida"
            value="guia"
            icon={<MenuBookIcon />}
          />
          <BottomNavigationAction
            label="Preguntas Frecuentes"
            value="pregunta"
            icon={<HelpIcon />}
          />
        </BottomNavigation>
      </Grid>
      <Grid
        paddingTop={1}
        container
        item
        xs={12}
        md={6}
        justifyContent="center"
      >
        {/* <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={valueDepartamento}
          onChange={handleChangeDepartamento}
        >
          <FormControlLabel
            value="ext"
            control={<Radio />}
            label="Organismo o Municipio"
          />
          <FormControlLabel
            value="int"
            control={<Radio />}
            label="Departamentos internos"
          />
        </RadioGroup> */}
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} md={6.5} lg={8.2}>
          <Typography variant="h6">Menú</Typography>
          <SelectFrag
            value={IdMenu ? IdMenu : idMenu}
            options={menus}
            onInputChange={handleFilterChange2}
            placeholder={"Seleccione Menú"}
            disabled={!!IdMenu}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={5.5}
          lg={3.8}
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          paddingTop={3}
        >
          {value !== "pregunta" ? (
            <Button
              hidden
              disabled={modo == "Editar Nombre Video" || !value}
              component="label"
              className="cancelar"
            >
              Seleccionar {value}
              <input
                hidden
                accept={value == "video" ? "video/*" : "application/pdf"}
                onChange={(v) => {
                  enCambioFile(v);
                }}
                type="file"
              />
            </Button>
          ) : (
            ""
          )}

          {value == "video" ? (
            <>
              <Button
                disabled={
                  !idMenu ||
                  idMenu == "false" ||
                  !nombreArchivo //||
                 // !newVideo ||
                 // !valueDepartamento
                }
                className="guardar"
                onClick={() => SaveVideo(false)}
              >
                Guardar
              </Button>
              {IdMenu ? (
                <Button
                  disabled={
                    !idMenu ||
                    idMenu == "false" ||
                    !nombreArchivo ||
                    !newVideo ||
                    !valueDepartamento
                  }
                  className="guardar"
                  onClick={() => SaveVideo(true)}
                >
                  Guardar y cerrar
                </Button>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}

          {value == "guia" ? (
            <>
              <Button
                // disabled={
                //   !idMenu ||
                //   idMenu == "false" ||
                //   !nombreArchivo ||
                //   !pregunta //||
                //  // !newVideo ||
                //  // !valueDepartamento
                // }
                className="guardar"
                onClick={() => SaveVideo(false)}
              >
                Guardar
              </Button>
              {IdMenu ? (
                <Button
                  disabled={
                    !idMenu ||
                    idMenu == "false" ||
                    !nombreArchivo ||
                    !pregunta ||
                    !newVideo ||
                    !valueDepartamento
                  }
                  className="guardar"
                  onClick={() => SaveVideo(true)}
                >
                  Guardar y cerrar
                </Button>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}

          {value == "pregunta" ? (
            <>
              <Button
                disabled={
                  !idMenu ||
                  idMenu == "false" ||
                 // !valueDepartamento ||
                  !pregunta ||
                  !respuesta
                }
                className="guardar"
                onClick={() => SavePreguntasFrecuentes(false)}
              >
                Guardar
              </Button>
              {IdMenu ? (
                <Button
                  disabled={
                    !idMenu ||
                    idMenu == "false" ||
                    !valueDepartamento ||
                    !pregunta ||
                    !respuesta
                  }
                  className="guardar"
                  onClick={() => SavePreguntasFrecuentes(true)}
                >
                  Guardar y cerrar
                </Button>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </Grid>
      </Grid>

      {value == "video" || value == "guia" ? (
        <>
          <Grid container>
            <Grid>
              <Typography variant="h6">Nombre del archivo: </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="nombreEvento"
                value={nombreArchivo}
                fullWidth
                variant="outlined"
                size="small"
                onChange={(v) => setNombreArchivo(v.target.value)}
                sx={{ paddingBottom: "10px" }}
              />
            </Grid>
          </Grid>
          {value == "guia" ? (
            <Grid container>
              <Grid>
                <Typography variant="h6">
                  Pregunta / Titulo de guia:{" "}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  id="nombreEvento"
                  value={pregunta}
                  fullWidth
                  variant="outlined"
                  size="small"
                  onChange={(v) => setPregunta(v.target.value)}
                  sx={{ paddingBottom: "10px" }}
                />
              </Grid>
            </Grid>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}

      {value == "pregunta" ? (
        <>
          <Grid container>
            <Grid>
              <Typography variant="h6">Pregunta</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="nombreEvento"
                value={pregunta}
                fullWidth
                variant="outlined"
                size="small"
                onChange={(v) => setPregunta(v.target.value)}
                sx={{ paddingBottom: "10px" }}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid>
              <Typography variant="h6">Respuesta</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="nombreEvento"
                value={respuesta}
                fullWidth
                variant="outlined"
                size="small"
                onChange={(v) => setRespuesta(v.target.value)}
                sx={{ paddingBottom: "10px" }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <MUIXDataGrid columns={columnsPreguntas} rows={preguntas} />
          </Grid>
        </>
      ) : (
        ""
      )}

      {value == "video" || value == "guia" ? (
        <Grid container>
          <Grid item xs={12}>
            <MUIXDataGrid
              columns={value == "video" ? columnsVideo : columnsGuia}
              rows={preguntas}
            />
          </Grid>
          <div className="containerModalCargarVideos">
            <div className="containerPreVisualizarVideo">
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Grid className="contenedorDeReproductorVideo" item xs={12}>
                  {value == "video" ? (
                    <video
                      loop
                      autoPlay
                      width={"100%"}
                      height={"100%"}
                      hidden={
                        modo == "Editar Nombre Video" ||
                        videoPreview?.length == 0
                      }
                      src={videoPreview}
                      id="videoPlayer"
                      controls
                    />
                  ) : (
                    <object
                      className="responsive-iframe"
                      data={videoPreview}
                      type="text/html"
                    ></object>
                  )}
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
      ) : (
        ""
      )}
    </Grid>
  );
};
export default AdminAyudas;
