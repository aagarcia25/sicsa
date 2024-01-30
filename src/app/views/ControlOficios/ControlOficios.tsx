import AttachmentIcon from "@mui/icons-material/Attachment";
import ClearIcon from "@mui/icons-material/Clear";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import InsertPageBreakIcon from "@mui/icons-material/InsertPageBreak";
import {
  Button,
  Collapse,
  Grid,
  IconButton,
  TextField,
  ToggleButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Toast } from "../../helpers/Toast";
import { PERMISO, USUARIORESPONSE } from "../../interfaces/UserInfo";
import { AuditoriaService } from "../../services/AuditoriaService";
import { getPermisos, getUser } from "../../services/localStorage";
import MUIXDataGrid from "../MUIXDataGrid";
import ButtonsAdd from "../componentes/ButtonsAdd";
import ButtonsDeleted from "../componentes/ButtonsDeleted";
import { ButtonsDetail } from "../componentes/ButtonsDetail";
import ButtonsEdit from "../componentes/ButtonsEdit";
import { TooltipPersonalizado } from "../componentes/CustomizedTooltips";
import TitleComponent from "../componentes/TitleComponent";
import { ControlOficiosModal } from "./ControlOficiosModal";
import VisorDocumentosOficios from "../componentes/VisorDocumentosOficios";
import ButtonsShare from "../componentes/ButtonsShare";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import SelectFrag from "../componentes/SelectFrag";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import SendIcon from "@mui/icons-material/Send";
import SelectValues from "../../interfaces/Share";
import { ShareService } from "../../services/ShareService";
import axios from "axios";

export const ControlOficios = () => {
  const [openAdjuntos, setOpenAdjuntos] = useState(false);
  const [openSlider, setOpenSlider] = useState(true);
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const [bancos, setBancos] = useState([]);
  const [anio, setanio] = useState("");
  const [ListAnio, setListAnio] = useState<SelectValues[]>([]);

  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  const [showfilter, setshowfilter] = useState<boolean>(false);

  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(true);
  const [editar, setEditar] = useState<boolean>(true);
  const [eliminar, setEliminar] = useState<boolean>(true);

  const handleAccion = (v: any) => {
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
          NUMOPERACION: 3,
          CHID: v.data.id,
          CHUSER: user.Id,
        };

        AuditoriaService.Foliosindex(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "¡Registro Eliminado!",
            });
            consulta({ NUMOPERACION: 4 });
          } else {
            Swal.fire("¡Error!", res.STRMESSAGE, "error");
          }
        });
      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }
    });
  };

  const CancelarFolio = (v: any) => {
    console.log("v",v);
    if (v.row.Cancelado == 'CANCELADO') {
      Swal.fire({
        icon: "info",
        title: "¿Deseas activar este Oficio?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            NUMOPERACION: 6,
            CHID: v.row.id,
            CHUSER: user.Id,
          };
  
          AuditoriaService.Foliosindex(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "¡Oficio Cancelado!",
              });
              consulta({ NUMOPERACION: 4 });
            } else {
              Swal.fire("¡Error!", res.STRMESSAGE, "error");
            }
          });
        } else if (result.isDenied) {
          Swal.fire("No se realizaron cambios", "", "info");
        }
      });
    } else{
      Swal.fire({
      icon: "info",
      title: "¿Estás seguro de cancelar este Oficio?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          NUMOPERACION: 6,
          CHID: v.row.id,
          CHUSER: user.Id,
        };

        AuditoriaService.Foliosindex(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "¡Oficio Cancelado!",
            });
            consulta({ NUMOPERACION: 4 });
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
  const generarBS = (v: any) => {
    console.log("v",v);
    
    Swal.fire({
      icon: "info",
      title: "¿Desear generar un BS de este Oficio?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          NUMOPERACION: 7,
          Oficio: v.row.Oficio,
          CHUSER: user.Id,
        };

        AuditoriaService.Foliosindex(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "¡Oficio Cancelado!",
            });
            consulta({ NUMOPERACION: 4 });
          } else {
            Swal.fire("¡Error!", res.STRMESSAGE, "error");
          }
        });
      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }
    });
  };

  const agregarfolio = (data: any) => {
    AuditoriaService.Foliosindex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Registro Agregado!",
        });
        //handleClose();
      } else {
        Swal.fire(res.STRMESSAGE, "¡Error!", "info");
      }
    });
  };

  const registrardatos = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenSlider(true);
    let encontrados: any[] = [];
    let counfiles = event?.target?.files?.length;
    let peticiones: any[] = [];

    let succesFiles: any[] = [];
    let failFiles: any[] = [];

    //Recorremos los registros de la busqueda
    for (let i = 0; i < Number(counfiles); i++) {
      let file = event?.target?.files?.[i] || "";
      let namefile = event?.target?.files?.[i].name || "";
      encontrados.push({ Archivo: file, NOMBRE: namefile });
    }

    encontrados.map((item: any) => {
      const formData = new FormData();
      formData.append("file", item.Archivo, item.NOMBRE);
      let p = axios.post(
        "http://10.200.4.105:99/ETL/extraer-informacion",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );
      peticiones.push(p);
    });

    try {
      axios.all(peticiones).then((resposeArr) => {
        resposeArr.map((item, index) => {
          let currentFile = encontrados[index].Archivo;
          if (item.data.SUCCESS) {
            succesFiles.push({
              Archivo: currentFile,
              Name: currentFile.name,
              Asunto: item.data.RESPONSE[0].Asunto,
              fecha: item.data.RESPONSE[0].Fecha,
              Oficio: item.data.RESPONSE[0].Oficio,
            });

            const formData = new FormData();
            formData.append("NUMOPERACION", "5");
            formData.append("CHUSER", user.Id);
            formData.append("Archivo", currentFile, currentFile.name);
            formData.append("Name", currentFile.name);
            formData.append("Asunto", item.data.RESPONSE[0].Asunto);
            formData.append("dia", item.data.RESPONSE[0].Fecha.dia);
            formData.append("mes", item.data.RESPONSE[0].Fecha.mes);
            formData.append("anio", item.data.RESPONSE[0].Fecha.anio);
            formData.append(
              "Oficio",
              item.data.RESPONSE[0].Oficio.replace(" ", "").replace("/", "-")
            );
            agregarfolio(formData);
          } else {
            failFiles.push({
              Archivo: currentFile.name,
            });
          }
        });
      });
      console.log(succesFiles);
      consulta({ NUMOPERACION: 4 });
      setOpenSlider(false);
    } catch (error) {
      setOpenSlider(false);
      console.error("Error al realizar las peticiones:", error);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      width: 150,
    },
    { field: "Oficio", headerName: "Oficio", width: 150 },
    { field: "dfTitular", headerName: "Destinatario", width: 150 },
    { field: "dfCargo", headerName: "Cargo", width: 150 },
    { field: "Asunto", headerName: "Asunto", width: 200 },
    { field: "Tema", headerName: "Tema", width: 350 },
    { field: "Nauditoria", headerName: "N° de Auditoría", width: 100 },
    { field: "cpNombre", headerName: "Solicitante", width: 150 },

    { field: "Fecha", headerName: "Fecha", width: 150 },
    { field: "FechaEntrega", headerName: "Fecha de Entregado", width: 150 },
    { field: "FechaRecibido", headerName: "Fecha de Recibido", width: 200 },
    { field: "tipoau", headerName: "Tipo", width: 350 },
    { field: "Observaciones", headerName: "Observaciones", width: 350 },
    { field: "Cancelado", headerName: "Cancelado", width: 350 },

    {
      field: "acciones",
      disableExport: true,
      headerName: eliminar || editar ? "Acciones" : "",
      description: eliminar || editar ? "Campo de Acciones" : "",
      sortable: false,
      //width: 200,
      width: eliminar || editar ? 200 : 0,

      renderCell: (v) => {
        return (
          <>
            <ButtonsDetail
              title={"Documentos del Oficio"}
              handleFunction={handleVer}
              show={true}
              icon={<AttachmentIcon />}
              row={v}
            ></ButtonsDetail>
            {editar ? (
              <ButtonsEdit
                handleAccion={handleEdit}
                row={v}
                show={true}
              ></ButtonsEdit>
            ) : (
              ""
            )}
            {eliminar ? (
              <ButtonsDeleted
                handleAccion={handleAccion}
                row={v}
                show={true}
              ></ButtonsDeleted>
            ) : (
              ""
            )}

            <ButtonsDetail
              title={v.row.Cancelado == 'CANCELADO'? "Activar Folio" :'Cancelar Folio'}
              handleFunction={CancelarFolio}
              show={true}
              icon={<ClearIcon />}
              row={v}
            ></ButtonsDetail>

            <ButtonsDetail
              title={"Generar BS"}
              handleFunction={generarBS}
              show={true}
              icon={<InsertPageBreakIcon />}
              row={v}
            ></ButtonsDetail>
          </>
        );
      },
    },
  ];

  const handleClose = () => {
    setOpenAdjuntos(false);
    setOpen(false);
    consulta({ NUMOPERACION: 4 });
  };

  const handleVer = (v: any) => {
    setVrows(v);
    setOpenAdjuntos(true);
  };

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setOpen(true);
    setVrows("");
  };

  const handleEdit = (v: any) => {
    setTipoOperacion(2);
    setOpen(true);
    setVrows(v);
  };

  // const verfiltros = () => {
  //   if (showfilter) {
  //     setshowfilter(false);
  //   } else {
  //     setshowfilter(true);
  //   }
  // };
  const handleFilterChange1 = (v: string) => {
    setanio(v);
  };
  const clearFilter = () => {
    setanio("");
    consulta({ NUMOPERACION: 4 });
  };

  const consulta = (data: any) => {
    AuditoriaService.Foliosindex(data).then((res) => {
      if (res.SUCCESS) {
        setBancos(res.RESPONSE);
        setOpenSlider(false);
      } else {
        setOpenSlider(false);
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

  const loadFilter = (operacion: number, id?: string) => {
    let data = { NUMOPERACION: operacion, P_ID: id };
    ShareService.SelectIndex(data).then((res) => {
      if (operacion === 5) {
        //  setCatInforme(res.RESPONSE);
      } else if (operacion === 1) {
        setListAnio(res.RESPONSE);
      }
    });
  };

  useEffect(() => {
    loadFilter(1);

    permisos.map((item: PERMISO) => {
      if (String(item.menu) === "CFOLIOS") {
        if (String(item.ControlInterno) === "AGREG") {
          setAgregar(true);
        }
        if (String(item.ControlInterno) === "ELIM") {
          setEliminar(true);
        }
        if (String(item.ControlInterno) === "EDIT") {
          setEditar(true);
        }
      }
    });
    consulta({ NUMOPERACION: 4 });
  }, []);

  return (
    <div style={{ height: 600, width: "100%", padding: "1%" }}>
      {open ? (
        <ControlOficiosModal
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
        />
      ) : (
        ""
      )}

      <TitleComponent title={"Control de Oficios"} show={openSlider} />
      {/* <Collapse in={showfilter} timeout="auto" unmountOnExit> */}
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
        sx={{ padding: "1%" }}
      >
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography sx={{ fontFamily: "sans-serif" }}>
            Año Cuenta Pública:
          </Typography>
          <SelectFrag
            value={anio}
            options={ListAnio}
            onInputChange={handleFilterChange1}
            placeholder={"Seleccione.."}
            disabled={false}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{ justifyContent: "center", display: "flex" }}
        >
          <Tooltip title="Buscar">
            <Button
              onClick={() => {
                consulta({ Anio: anio, NUMOPERACION: 4 });
              }}
              variant="contained"
              color="secondary"
              endIcon={<SendIcon sx={{ color: "white" }} />}
            >
              <Typography sx={{ color: "white" }}> Buscar </Typography>
            </Button>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Tooltip title="Limpiar Filtros">
            <Button
              onClick={clearFilter}
              variant="contained"
              color="secondary"
              endIcon={<CleaningServicesIcon sx={{ color: "white" }} />}
            >
              <Typography sx={{ color: "white" }}>Limpiar Filtros</Typography>
            </Button>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
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
        sx={{ padding: "1%" }}
      >
        <Grid item xs={12} sm={6} md={4} lg={2}></Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}></Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}></Grid>
        <Grid item xs={12} sm={6} md={4} lg={6}></Grid>
      </Grid>
      {/* </Collapse> */}
      {agregar ? <ButtonsAdd handleOpen={handleOpen} agregar={true} /> : ""}
      {agregar ? (
        <TooltipPersonalizado
          title={
            <React.Fragment>
              <Typography color="inherit">Cargar Documentos</Typography>
              {"Permite la carga de Documentos de Forma Masiva "}
            </React.Fragment>
          }
        >
          <ToggleButton value="check" className="guardar" size="small">
            <IconButton
              color="inherit"
              aria-label="upload documento"
              component="label"
              size="small"
            >
              <input
                multiple
                hidden
                accept=".pdf"
                type="file"
                value=""
                onChange={(v) => registrardatos(v)}
              />
              <FileUploadIcon />
            </IconButton>
          </ToggleButton>
        </TooltipPersonalizado>
      ) : (
        ""
      )}

      <MUIXDataGrid columns={columns} rows={bancos} />

      {openAdjuntos ? (
        <VisorDocumentosOficios handleFunction={handleClose} obj={vrows} />
      ) : (
        ""
      )}
    </div>
  );
};
