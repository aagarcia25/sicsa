import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import DownloadingIcon from "@mui/icons-material/Downloading";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  Box,
  Breadcrumbs,
  Grid,
  IconButton,
  ToggleButton,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { base64ToArrayBuffer } from "../../helpers/Files";
import { Toast } from "../../helpers/Toast";
import { PERMISO, USUARIORESPONSE } from "../../interfaces/UserInfo";
import { AuditoriaService } from "../../services/AuditoriaService";
import { getPermisos, getToken, getUser } from "../../services/localStorage";
import MUIXDataGrid from "../MUIXDataGrid";
import Progress from "../Progress";
import ButtonsDeleted from "./ButtonsDeleted";
import { ButtonsDetail } from "./ButtonsDetail";
import FormDialog from "./CFolder";
import { TooltipPersonalizado } from "./CustomizedTooltips";
import ModalForm from "./ModalForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import ButtonsDeletedFolder from "./ButtonsDeletedFolder";

const VisorDocumentosOficios = ({
  handleFunction,
  obj,
  tipo,
  Entregado,
}: {
  handleFunction: Function;
  obj: any;
  tipo?: number;
  Entregado?: any;
}) => {
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [openSlider, setOpenSlider] = useState(false);
  const [open, setOpen] = useState(false);
  const [opendialog, setopendialog] = useState(false);
  const [verarchivo, setverarchivo] = useState(false);
  const [openAdjuntos, setOpenAdjuntos] = useState(false);
  const [vrows, setVrows] = useState({});
  const [data, setData] = useState([]);
  const [URLruta, setURLRuta] = useState<string>("");
  const [adjuntar, setAdjuntar] = useState<boolean>(false);
  const [eliminarDocumentos, setEliminarDocumentos] = useState<boolean>(false);
  const [verificar, setVerificar] = useState<boolean>(false);
  const [breadcrumbs, setBreadcrumbs] = useState([""]);
  const [explorerRoute, setexplorerRoute] = useState<string>("");
  const iframeRef = useRef(null);
  //const [Entregado, setEntregado] = useState(obj?.row?.entregado)

  const consulta = () => {
    if (explorerRoute !== "") {
      setOpenSlider(true);

      let data = {
        NUMOPERACION: 10,
        FOLIO: explorerRoute,
        TOKEN: JSON.parse(String(getToken())),
      };

      AuditoriaService.FoliosFilesindex(data).then((res) => {
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "¡Consulta Exitosa!",
          });
          setData(res.RESPONSE);
          setOpenSlider(false);
        } else {
          setOpenSlider(false);
          Swal.fire("¡Error!", res.STRMESSAGE, "error");
        }
      });
    }
  };

  const ProcesaSPeis = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenSlider(true);
    let count = 0;
    let encontrados: any[] = [];
    let counfiles = event?.target?.files?.length;
    let peticiones: any[] = [];

    //Recorremos los registros de la busqueda
    for (let i = 0; i < Number(counfiles); i++) {
      let file = event?.target?.files?.[i] || "";
      let namefile = event?.target?.files?.[i].name || "";
      encontrados.push({ Archivo: file, NOMBRE: namefile });
    }

    encontrados.map((item: any) => {
      const formData = new FormData();
      formData.append("NUMOPERACION", "1");
      formData.append("ID", obj.id);
      formData.append("FOLIO", explorerRoute || obj.row.NAUDITORIA);
      formData.append("CHUSER", user.Id);
      formData.append("TOKEN", JSON.parse(String(getToken())));
      formData.append("FILE", item.Archivo, item.NOMBRE);

      let p = axios.post(
        process.env.REACT_APP_APPLICATION_BASE_URL + "FoliosFilesindex",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      peticiones.push(p);
    });

    axios.all(peticiones).then((resposeArr) => {
      resposeArr.map((item) => {
        if (item.data.SUCCESS) {
          count++;
        } else {
          count--;
        }
      });

      if (count == 0 || count == -1) {
        Swal.fire("¡Error!", "No se Realizo la Operación", "error");
        setOpenSlider(false);
      } else {
        Swal.fire({
          icon: "success",
          title: "Información",
          text: "Archivos Subidos " + count,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            setOpenSlider(false);
            consulta();
          }
        });
      }
    });
  };

  const handleDescargarFile = (v: any) => {
    setOpenSlider(true);
    let data = {
      NUMOPERACION: 5,
      P_ROUTE: v.row.RUTA,
      TOKEN: JSON.parse(String(getToken())),
    };

    AuditoriaService.FoliosFilesindex(data).then((res) => {
      if (res.SUCCESS) {
        var bufferArray = base64ToArrayBuffer(String(res.RESPONSE.FILE));
        var blobStore = new Blob([bufferArray], { type: res.RESPONSE.TIPO });
        var data = window.URL.createObjectURL(blobStore);
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.href = data;
        link.download = v.row.NOMBRE;
        link.click();
        window.URL.revokeObjectURL(data);
        link.remove();
        setOpenSlider(false);
      } else {
        setOpenSlider(false);
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

  const createFolder = (v: any) => {
    if (v !== undefined && v != "") {
      let peticiones: any[] = [];
      const formData = new FormData();
      formData.append("NUMOPERACION", "9");
      formData.append("ID", obj.id);
      formData.append("CHUSER", user.Id);
      formData.append("FOLIO", explorerRoute || obj.row.NAUDITORIA);
      formData.append("TOKEN", JSON.parse(String(getToken())));
      formData.append("ROUTE", v);

      axios
        .post(
          process.env.REACT_APP_APPLICATION_BASE_URL + "FoliosFilesindex",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "X-Requested-With": "XMLHttpRequest",
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((response) => {
          if (response.data.SUCCESS) {
            consulta();
            setopendialog(false);
          } else {
            setopendialog(false);
            // Manejar caso de error si es necesario
            console.error("Error en la petición:", response.data);
          }
        })
        .catch((error) => {
          // Manejar errores de red u otros
          console.error("Error en la petición:", error);
          setopendialog(false);
        });
    } else {
      setopendialog(false);
    }
  };

  const handleVer = (v: any) => {
    setOpenSlider(true);
    let data = {
      NUMOPERACION: 5,
      P_ROUTE: v.row.RUTA,
      TOKEN: JSON.parse(String(getToken())),
    };

    AuditoriaService.FoliosFilesindex(data).then((res) => {
      if (res.SUCCESS) {
        var bufferArray = base64ToArrayBuffer(String(res.RESPONSE.FILE));
        var blobStore = new Blob([bufferArray], { type: res.RESPONSE.TIPO }); //type:"application/pdf"
        var data = window.URL.createObjectURL(blobStore);
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.download = "Documento.pdf";
        link.href = data;
        setURLRuta(link.href);
        setOpenSlider(false);
        setverarchivo(true);
        console.log("TIPO", data);
      } else {
        setOpenSlider(false);
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
      console.log("TIPO 1", res);
    });
  };

  const handleAccion = (v: any) => {
    if (v.tipo == 2) {
      Swal.fire({
        icon: "info",
        title: "¿Estás seguro de eliminar este registro?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            NUMOPERACION: 12,
            CHID: v.data.row.id,
            CHUSER: user.Id,
            FOLIO: v.data.row.RUTA,
            TOKEN: JSON.parse(String(getToken())),
          };

          AuditoriaService.FoliosFilesindex(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "¡Registro Eliminado!",
              });
              consulta();
            } else {
              Swal.fire("¡Error!", res.STRMESSAGE, "error");
            }
          });
        } else if (result.isDenied) {
          Swal.fire("No se realizaron cambios", "", "info");
        }
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "¿Estás seguro de eliminar este Directorio?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            NUMOPERACION: 13,
            CHID: v.data.row.id,
            CHUSER: user.Id,
            FOLIO: v.data.row.RUTA,
            TOKEN: JSON.parse(String(getToken())),
          };

          AuditoriaService.FoliosFilesindex(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "¡Registro Eliminado!",
              });
              consulta();
            } else {
              Swal.fire("¡Error!", res.STRMESSAGE, "error");
            }
          });
        } else if (result.isDenied) {
          Swal.fire("No se realizaron cambios", "", "info");
        }
      });
    }
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      width: 150,
    },

    {
      field: "RUTA",
      headerName: "RUTA",
      width: 150,
    },
    {
      field: "NOMBRE",
      description: "NOMBRE",
      headerName: "Nombre",
      width: 250,
    },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 250,
      renderCell: (v) => {
        return (
          <>
            {!v.row.ESCARPETA ? (
              <>
                <ButtonsDetail
                  title={"Ver"}
                  handleFunction={handleVer} //este tenia solo handleVer
                  show={true}
                  icon={<RemoveRedEyeIcon />}
                  row={v}
                ></ButtonsDetail>
                <ButtonsDetail
                  title={"Descargar"}
                  handleFunction={handleDescargarFile}
                  show={true}
                  icon={<DownloadingIcon />}
                  row={v}
                ></ButtonsDetail>

                {Entregado !== "1" && eliminarDocumentos ? (
                  <ButtonsDeleted
                    handleAccion={handleAccion}
                    row={v}
                    show={true}
                  ></ButtonsDeleted>
                ) : (
                  ""
                )}
              </>
            ) : (
              <>
                <ButtonsDetail
                  title={"Ver Carpeta"}
                  handleFunction={handleVerSub}
                  show={true}
                  icon={<DriveFolderUploadIcon />}
                  row={v}
                ></ButtonsDetail>
                {Entregado !== "1" && eliminarDocumentos ? (
                  <ButtonsDeletedFolder
                    handleAccion={handleAccion}
                    row={v}
                    show={true}
                  ></ButtonsDeletedFolder>
                ) : (
                  ""
                )}
              </>
            )}
          </>
        );
      },
    },
    { field: "FechaCreacion", headerName: "Fecha de Creación", width: 150 },
    {
      field: "UltimaActualizacion",
      headerName: "Última Actualización",
      width: 150,
    },
    {
      field: "creado",
      description: "Creado Por",
      headerName: "Creado Por",
      width: 150,
    },
    {
      field: "modi",
      description: "Modificado Por",
      headerName: "Modificado Por",
      width: 150,
    },
  ];

  const handleVerSub = (v: any) => {
    const existeOficio = breadcrumbs.some((breadcrumb) => {
      // Verificar si el nombre del breadcrumb es "Oficio"
      return breadcrumb === "/" + v.row.NOMBRE;
    });

    if (existeOficio) {
    } else {
      const nuevoElemento = "/" + v.row.NOMBRE;
      setBreadcrumbs((prevBreadcrumbs) => [...prevBreadcrumbs, nuevoElemento]);
    }
  };

  useEffect(() => {
    if (tipo === 1) {
      setBreadcrumbs([obj.row.Anio + "/" + obj.row.Oficio]);
      setexplorerRoute([obj.row.Anio + "/" + obj.row.Oficio].join(""));
    } else if (tipo === 2) {
      setBreadcrumbs([obj.row.anio + "/" + obj.row.NAUDITORIA]);
      setexplorerRoute([obj.row.anio + "/" + obj.row.NAUDITORIA].join(""));
    } else if (tipo === 3) {
      setBreadcrumbs([obj]);
      setexplorerRoute([obj].join(""));
    } else if (tipo === 4) {
      setBreadcrumbs([obj]);
      setexplorerRoute([obj].join(""));
    } else if (tipo === 5) {
      setBreadcrumbs([obj]);
      setexplorerRoute([obj].join(""));
    } else if (tipo === 6) {
      setBreadcrumbs([obj]);
      setexplorerRoute([obj].join(""));
    } else if (tipo === 7) {
      setBreadcrumbs([obj]);
      setexplorerRoute([obj].join(""));
    } else if (tipo === 8) {
      setBreadcrumbs([obj]);
      setexplorerRoute([obj].join(""));
    }
  }, []);

  useEffect(() => {
    if (explorerRoute !== "") {
      setOpenSlider(true);
      permisos.map((item: PERMISO) => {
        if (String(item.menu) === "AUDITOR") {
          if (String(item.ControlInterno) === "ADJUNTAR") {
            setAdjuntar(true);
          }
          if (String(item.ControlInterno) === "ELIMADJUN") {
            setEliminarDocumentos(true);
          }
          if (String(item.ControlInterno) === "VERIFICARDOC") {
            setVerificar(true);
          }
        }
      });
      consulta();
    }
  }, [explorerRoute]);

  useEffect(() => {
    if (breadcrumbs.length === 0) {
      handleFunction();
    }
    setexplorerRoute(breadcrumbs.join(""));
  }, [breadcrumbs]);
  return (
    <div>
      <ModalForm title={"Documentos del Oficio"} handleClose={handleFunction}>
        <Progress open={openSlider}></Progress>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {breadcrumbs}
        </Box>

        <Grid container>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            {true ? (
              <>
                {(explorerRoute.match(/\//g) || []).length > 1 ? (
                  <TooltipPersonalizado
                    title={
                      <React.Fragment>
                        <Typography color="inherit">
                          Regresar al Directorio Anterior
                        </Typography>
                      </React.Fragment>
                    }
                  >
                    <ToggleButton value="check">
                      <IconButton
                        color="primary"
                        aria-label="upload documento"
                        component="label"
                        size="small"
                        onClick={() => {
                          setBreadcrumbs(breadcrumbs.slice(0, -1));
                        }}
                      >
                        <ArrowBackIcon />
                      </IconButton>
                    </ToggleButton>
                  </TooltipPersonalizado>
                ) : (
                  ""
                )}

                {Entregado !== "1" && adjuntar ? (
                  <TooltipPersonalizado
                    title={
                      <React.Fragment>
                        <Typography color="inherit">
                          Cargar Documentos
                        </Typography>
                        {"Permite la carga de Documentos de Forma Masiva "}
                      </React.Fragment>
                    }
                  >
                    <ToggleButton value="check">
                      <IconButton
                        color="primary"
                        aria-label="upload documento"
                        component="label"
                        size="small"
                      >
                        <input
                          multiple
                          hidden
                          accept=".*"
                          type="file"
                          value=""
                          onChange={(v) => ProcesaSPeis(v)}
                        />
                        <FileUploadIcon />
                      </IconButton>
                    </ToggleButton>
                  </TooltipPersonalizado>
                ) : (
                  ""
                )}

                {Entregado !== "1" && adjuntar ? (
                  <TooltipPersonalizado
                    title={
                      <React.Fragment>
                        <Typography color="inherit">
                          Crear Directorio
                        </Typography>
                        {"Permite la creación de un Directorio"}
                      </React.Fragment>
                    }
                  >
                    <ToggleButton value="check">
                      <IconButton
                        color="primary"
                        aria-label="upload documento"
                        component="label"
                        size="small"
                        onClick={() => {
                          setopendialog(true);
                        }}
                      >
                        <CreateNewFolderIcon />
                      </IconButton>
                    </ToggleButton>
                  </TooltipPersonalizado>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}

            <MUIXDataGrid columns={columns} rows={data} />
          </Grid>
          <Grid item xs={12} sm={8} md={8} lg={8}>
            {verarchivo ? (
              <div className="ContainerVisualizacionSPEI">
                <iframe width="100%" height="100%" src={URLruta} />
              </div>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </ModalForm>

      {opendialog ? <FormDialog handleClose={createFolder}></FormDialog> : ""}
    </div>
  );
};

export default VisorDocumentosOficios;
