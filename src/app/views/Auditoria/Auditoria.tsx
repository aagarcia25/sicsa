import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Toast } from "../../helpers/Toast";
import { PERMISO, USUARIORESPONSE } from "../../interfaces/UserInfo";
import { AuditoriaService } from "../../services/AuditoriaService";
import { getPermisos, getUser } from "../../services/localStorage";
import MUIXDataGrid from "../MUIXDataGrid";
import ButtonsAdd from "../componentes/ButtonsAdd";
import ButtonsDeleted from "../componentes/ButtonsDeleted";
import ButtonsEdit from "../componentes/ButtonsEdit";
import TitleComponent from "../componentes/TitleComponent";
import { AuditoriaModal } from "./AuditoriaModal";
import ChatIcon from "@mui/icons-material/Chat";
import { ButtonsDetail } from "../componentes/ButtonsDetail";
import Notif from "./Notificaciones/Notif";
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
import VisorDocumentos from "../componentes/VisorDocumentos";
import AttachmentIcon from "@mui/icons-material/Attachment";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import Acciones from "./Acciones/Acciones";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Oficios } from "./Oficios/Oficios";
import { Gantt } from "gantt-task-react";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import GanttModal from "../componentes/GanttModal";
import SelectFrag from "../componentes/SelectFrag";
import SelectValues from "../../interfaces/Share";
import { ShareService } from "../../services/ShareService";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import ButtonsShare from "../componentes/ButtonsShare";
import SendIcon from "@mui/icons-material/Send";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import BusinessIcon from "@mui/icons-material/Business";

import FactCheckIcon from "@mui/icons-material/FactCheck";
import OrganoC from "./Organo/OrganoC";
import { render } from "@testing-library/react";
import LinkIcon from "@mui/icons-material/Link";
import axios from "axios";
import { log } from "console";
import { ok } from "assert";
import row from "antd/es/row";
import { CatalogosServices } from "../../services/catalogosServices";
import { ButtonsImport } from "../componentes/ButtonsImport";
import Progress from "../Progress";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MUIXDataGridGeneral from "../MUIXDataGridGeneral";
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';

export const Auditoria = () => {
  const [openSlider, setOpenSlider] = useState(true);
  const [modo, setModo] = useState("");
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const [bancos, setBancos] = useState([]);
  const [openAdjuntos, setOpenAdjuntos] = useState(false);
  const [openModalAcciones, setOpenModalAcciones] = useState(false);
  const [openModalOficios, setOpenModalOficios] = useState(false);
  const [openModalgant, setOpenModalgant] = useState(false);
  const [openModalNotificacion, setOpenModalDetalle] = useState<boolean>(false);
  const [openModalOrgano, setopenModalOrgano] = useState<boolean>(false);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [entrega, setEntrega] = useState<boolean>(false);
  const [hablitarEntrega, sethablitarEntrega] = useState<boolean>(false);

  const [showfilter, setshowfilter] = useState<boolean>(true);
  const [FolioSIGA, setFolioSIGA] = useState("");
  const [NAUDITORIA, setNAUDITORIA] = useState("");
  const [idEstatus, setidEstatus] = useState("");
  const [idTipo, setidTipo] = useState("");
  const [idOrigenAuditoria, setidOrigenAuditoria] = useState("");
  const [idEntidadFiscalizada, setidEntidadFiscalizada] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [idInicioauditoria, setidInicioauditoria] = useState("");
  const [anio, setanio] = useState("");
  const [ListIdEstatus, setListIdEstatus] = useState<SelectValues[]>([]);
  const [ListIdOrigenAuditoria, setListIdOrigenAuditoria] = useState<SelectValues[]>([]);
  const [ListIOdEntidadFiscalizada, setListIOdEntidadFiscalizada] = useState<SelectValues[]>([]);
  const [ListIdTipo, setListIdTipo] = useState<SelectValues[]>([]);
  const [Listinicio, setListInicio] = useState<SelectValues[]>([]);
  const [ListAnio, setListAnio] = useState<SelectValues[]>([]);
  const [modalidad, setmodalidad] = useState("");
  const [ListModalidad, setListModalidad] = useState<SelectValues[]>([]);
  const [ListMunicipio, setListMunicipio] = useState<SelectValues[]>([]);
  const [show, setShow] = useState(false);
  const [selectionModel, setSelectionModel] = useState<any[]>([]);

  const handleUpload = (data: any) => {
    setShow(true);
    let file = data?.target?.files?.[0] || "";
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlxs");
    formData.append("CHUSER", user.Id);
    formData.append("tipo", "migraAuditorias");
    CatalogosServices.migraData(formData).then((res) => {
      if (res.SUCCESS) {
        setShow(false);
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        consulta();
      } else {
        setShow(false);
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

  const handleVerAdjuntos = (data: any) => {
    if (data.row.entregado !== "1") {
      setVrows(data);
      setOpenAdjuntos(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenModalDetalle(false);
    setOpenAdjuntos(false);
    setOpenModalAcciones(false);
    setOpenModalOficios(false);
    consulta();
    setOpenModalgant(false);
    setopenModalOrgano(false);
  };

  const handleAcciones = (data: any) => {
    if (data.row.entregado !== "1") {
      setVrows(data);
      setOpenModalAcciones(true);
    }
  };

  const handleOficios = (data: any) => {
    if (data.row.entregado !== "1") {
      setId(data.id);
      setVrows(data);
      setOpenModalOficios(true);
    }
  };

  const handlePlan = (data: any) => {
    if (data.row.entregado !== "1") {
      setId(data.id);
      setVrows(data);
      setOpenModalgant(true);
    }
  };

  const MostrarLink = (data: any) => {
    window.open(
      "https://informe.asf.gob.mx/Documentos/Auditorias/" +
        data.row.anio +
        "_" +
        data.row.NAUDITORIA +
        "_a.pdf",
      "_blank"
    );
  };

  const handleFilterChangeMunicipio = (v: string) => {
    setMunicipio(v);
  };

  const handleFilterChangeEntidadFiscalizada = (v: string) => {
    setidEntidadFiscalizada(v);
  };

  const handleDetalle = (data: any) => {
    if (data.row.entregado !== "1") {
      setVrows(data);
      setOpenModalDetalle(true);
    }
  };

  const handleORgano = (data: any) => {
    if (data.row.entregado !== "1") {
      setVrows(data);
      setopenModalOrgano(true);
    }
  };

  const handleFilterChangemodalidad = (v: string) => {
    setmodalidad(v);
  };

  const handleFilterChange1 = (v: string) => {
    setanio(v);
  };

  const handleFilterChangeinicio = (v: string) => {
    setidInicioauditoria(v);
  };

  const handleFilterChangeOrigen = (v: string) => {
    setidOrigenAuditoria(v);
  };

  const handleFilterChangeestatus = (v: string) => {
    setidEstatus(v);
  };

  const handleFilterChangeClasificacionAuditoria = (v: string) => {
    setidTipo(v);
      loadFilter(21, v);
  };

  const noSelection = () => {
    if (selectionModel.length >= 1) {
      console.log("seleccionaste registros");
      Swal.fire({
        icon: "info",
        title: "Se eliminarán los registros seleccionados",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            NUMOPERACION: 9,
            CHIDs: selectionModel,
            CHUSER: user.Id,
          };

          AuditoriaService.Auditoriaindex(data).then((res) => {
            console.log("Respuesta:", res);

            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "¡Registros Eliminados!",
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
        title: "Favor de Seleccionar Registros",
        icon: "warning",
      });
    }
  };

  const handleAccion = (v: any) => {
    if (v.tipo == 1) {
      setTipoOperacion(2);
      setModo("Editar Registro");
      setOpen(true);
      setVrows(v.data);
    } else if (v.tipo === 2) {
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
            CHID: v.data.row.id,
            CHUSER: user.Id,
          };

          AuditoriaService.Auditoriaindex(data).then((res) => {
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

  const handleEntregar = (v: any) => {
    if (v.row.entregado == 1) {
      Toast.fire({
        icon: "success",
        title: "¡La auditoría ya ha sido entregada anteriormente!",
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "¿Desea entregar esta auditoría?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            NUMOPERACION: 5,
            CHID: v.row.id,
            CHUSER: user.Id,
          };

          AuditoriaService.Auditoriaindex(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "Auditoría Entregada",
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

  const handleHabilitarAuditoriaEntregada = (v: any) => {
    if (v.row.entregado == 0) {
      Toast.fire({
        icon: "success",
        title: "¡La auditoría no se ha entregado!",
      });
    } else{
      Swal.fire({
        icon: "info",
        title: "¿Desea habilitar la auditoría entregada?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            NUMOPERACION: 5,
            CHID: v.row.id,
            CHUSER: user.Id,
          };
          AuditoriaService.Auditoriaindex(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "Auditoría Habilitada",
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
      field: "ciid",
      headerName: "Identificador",
      width: 150,
    },
    {
      field: "ctaid",
      headerName: "Identificador",
      width: 150,
    },
    {
      field: "cefid",
      headerName: "Identificador",
      width: 150,
    },
    {
      field: "cgfid",
      headerName: "Identificador",
      width: 150,
    },
    {
      field: "csid",
      headerName: "Identificador",
      width: 150,
    },
    {
      field: "anio",
      description: "Año Cuenta Pública",
      headerName: "Año Cuenta Pública",
      width: 123,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "NAUDITORIA",
      description: "Número de Auditoría",
      headerName: "No. de Auditoría",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "NombreAudoria",
      description: "Nombre",
      headerName: "Nombre",
      width: 325,
    },
    {
      field: "cmoDescripcion",
      description: "Modalidad",
      headerName: "Modalidad",
      width: 200,
    },
    {
      field: "ActaInicio",
      description: "Acta de Inicio",
      headerName: "Acta de Inicio",
      width: 185,
    },
    {
      field: "ceaDescripcion",
      description: "Estatus",
      headerName: "Estatus",
      width: 170,
    },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 400,
      renderCell: (v) => {
        return (
          <>
            {eliminar ? (
              String(v.row.entregado) !== "1" ? (
                <ButtonsDeleted
                  handleAccion={handleAccion}
                  row={v}
                  show={true}
                ></ButtonsDeleted>
              ) : (
                ""
              )
            ) : (
              ""
            )}

            <ButtonsEdit
              handleAccion={handleAccion}
              row={v}
              show={true}
            ></ButtonsEdit>

            <ButtonsDetail
              title={"Ver Oficios"}
              handleFunction={handleOficios}
              show={true}
              icon={<AssignmentIcon />}
              row={v}
            ></ButtonsDetail>

            <ButtonsDetail
              title={"Notificación Área"}
              handleFunction={handleDetalle}
              show={true}
              icon={<ChatIcon />}
              row={v}
            ></ButtonsDetail>

            <ButtonsDetail
              title={"Contestación a Organo Auditor"}
              handleFunction={handleORgano}
              show={true}
              icon={<BusinessIcon />}
              row={v}
            ></ButtonsDetail>

            {entrega ? (
              <ButtonsDetail
                title={"Cambiar Entrega"}
                handleFunction={handleEntregar}
                show={true}
                icon={<FactCheckIcon />}
                row={v}
              ></ButtonsDetail>
            ) : (
              ""
            )}

            {hablitarEntrega ? (
              <ButtonsDetail
                title={"Habilitar Auditoría Entregada"}
                handleFunction={handleHabilitarAuditoriaEntregada}
                show={true}
                icon={<AssignmentReturnIcon />}
                row={v}
              ></ButtonsDetail>
            ) : (
              ""
            )}  

            <ButtonsDetail
              title={"Resultado de la Auditoria"}
              handleFunction={handleAcciones}
              show={true}
              icon={<Diversity3Icon />}
              row={v}
            ></ButtonsDetail>
            <ButtonsDetail
              title={"Ver Adjuntos"}
              handleFunction={handleVerAdjuntos}
              show={true}
              icon={<AttachmentIcon />}
              row={v}
            ></ButtonsDetail>
            <ButtonsDetail
              title={"Ver Plan de Trabajo"}
              handleFunction={handlePlan}
              show={true}
              icon={<AlignHorizontalLeftIcon />}
              row={v}
            ></ButtonsDetail>

            <ButtonsDetail
              title={"Auditoría individual"}
              handleFunction={MostrarLink}
              show={true}
              icon={<LinkIcon />}
              row={v}
            ></ButtonsDetail>
          </>
        );
      },
    },
  ];

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
    setVrows("");
  };

  const handleEdit = (v: any) => {
    setTipoOperacion(2);
    setModo("Módificar Registro");
    setOpen(true);
    setVrows(v);
  };

  const verfiltros = () => {
    if (showfilter) {
      setshowfilter(false);
    } else {
      setshowfilter(true);
    }
  };

  const clearFilter = () => {
    setFolioSIGA("");
    setNAUDITORIA("");
    setidEstatus("");
    setidTipo("");
    setMunicipio("");
    setidInicioauditoria("");
    setanio("");
    setmodalidad("");
    setidOrigenAuditoria("");
    setidEntidadFiscalizada("");

  };
  const consulta = () => {
    let data = {
      NUMOPERACION: 4,
      FolioSIGA: FolioSIGA === "false" ? "" : FolioSIGA,
      NAUDITORIA: NAUDITORIA === "false" ? "" : NAUDITORIA,
      idEstatus: idEstatus === "false" ? "" : idEstatus,
      //idmunicipio: municipio === "false" ? "" : municipio,
      //idInicioauditoria: idInicioauditoria === "false" ? "" : idInicioauditoria,
      anio: anio === "false" ? "" : anio,
      idModalidad: modalidad === "false" ? "" : modalidad,
      tipo: idTipo === "false" ? "" : idTipo,
      ente: idOrigenAuditoria === "false" ? "" : idOrigenAuditoria,
      idCatEntidadFiscalizada: idEntidadFiscalizada === "false" ? "" : idEntidadFiscalizada,

    };
    AuditoriaService.Auditoriaindex(data).then((res) => {
      if (res.SUCCESS) {
        // Toast.fire({
        //   icon: "success",
        //   title: "¡Consulta Exitosa!",
        // });
        setBancos(res.RESPONSE);
        setOpenSlider(false);
      } else {
        setOpenSlider(false);
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };
  /*
  useEffect(() => {
    if (
      FolioSIGA === "" &&
      NAUDITORIA === "" &&
      idEstatus === "" &&
      idTipo === "" &&
      municipio === "" &&
      idInicioauditoria === "" &&
      idOrigenAuditoria === "" &&
      anio === ""
      idEntidadFiscalizada === "" &&
    ) {
      consulta();
    }
  }, [FolioSIGA, NAUDITORIA, idEstatus, idTipo,idOrigenAuditoria, idEntidadFiscalizada, municipio, idInicioauditoria, anio]);*/

  const loadFilter = (operacion: number, id?: string) => {
    let data = { NUMOPERACION: operacion, P_ID: id };
    ShareService.SelectIndex(data).then((res) => {
      if (operacion === 5) {
        //  setCatInforme(res.RESPONSE);
      } else if (operacion === 1) {
        setListAnio(res.RESPONSE);
      } else if (operacion === 12) {
        setListModalidad(res.RESPONSE);
      } else if (operacion === 16) {
        setListInicio(res.RESPONSE);
      } else if (operacion === 18) {
        setListIdEstatus(res.RESPONSE);
      } else if (operacion === 2) {
        setListIOdEntidadFiscalizada(res.RESPONSE);
      } else if (operacion === 14) {
        setListIdTipo(res.RESPONSE);
      } else if (operacion === 21) {
        setListIdOrigenAuditoria(res.RESPONSE);
      }
    });
  };

  useEffect(() => {
    loadFilter(1);
    loadFilter(12);
    loadFilter(16);
    loadFilter(18);
    loadFilter(2);
    loadFilter(14);
    loadFilter(21);
    permisos.map((item: PERMISO) => {
      if (String(item.menu) === "AUDITOR") {
        if (String(item.ControlInterno) === "AGREG") {
          setAgregar(true);
        }
        if (String(item.ControlInterno) === "ELIM") {
          setEliminar(true);
        }
        if (String(item.ControlInterno) === "EDIT") {
          setEditar(true);
        }
        if (String(item.ControlInterno) === "ENTREGA") {
          setEntrega(true);
        }if (String(item.ControlInterno) === "HABILENTREGA") {
          sethablitarEntrega(true);
        }
      }
    });
    setOpenSlider(false);
    //consulta();
  }, []);

  return (
    <div>
      <Grid container spacing={1} padding={0}>
        <div style={{ height: 600, width: "100%", padding: "1%" }}>
          {open ? (
            <AuditoriaModal
              tipo={tipoOperacion}
              handleClose={handleClose}
              dt={vrows}
            />
          ) : (
            ""
          )}

          <TitleComponent
            title={"Administración de Auditorías"}
            show={openSlider}
          />

          <Collapse in={showfilter} timeout="auto" unmountOnExit>
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
                  Clasificación Auditoría:
                </Typography>
                <SelectFrag
                  value={idTipo}
                  options={ListIdTipo}
                  onInputChange={handleFilterChangeClasificacionAuditoria}
                  placeholder={"Seleccione.."}
                  disabled={false}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography sx={{ fontFamily: "sans-serif" }}>
                  Origen Auditoría:
                </Typography>
                <SelectFrag
                  value={idOrigenAuditoria}
                  options={ListIdOrigenAuditoria}
                  onInputChange={handleFilterChangeOrigen}
                  placeholder={"Seleccione.."}
                  disabled={false}
                />
              </Grid>
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
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography sx={{ fontFamily: "sans-serif" }}>
                  Estatus:
                </Typography>
                <SelectFrag
                  value={idEstatus}
                  options={ListIdEstatus}
                  onInputChange={handleFilterChangeestatus}
                  placeholder={"Seleccione.."}
                  disabled={false}
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
              sx={{ padding: "1%" }}
            >
              <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                  Entidad Fiscalizada:
                </Typography>
                <SelectFrag
                  value={idEntidadFiscalizada}
                  options={ListIOdEntidadFiscalizada}
                  onInputChange={handleFilterChangeEntidadFiscalizada}
                  placeholder={"Seleccione.."}
                  disabled={false}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                  margin="dense"
                  id="FolioSIGA"
                  label="Folio SIGA"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={FolioSIGA}
                  onChange={(v) => setFolioSIGA(v.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                  margin="dense"
                  id="NAUDITORIA"
                  label="N° de Auditoría"
                  value={NAUDITORIA}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setNAUDITORIA(v.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography sx={{ fontFamily: "sans-serif" }}>
                  Modalidad:
                </Typography>
                <SelectFrag
                  value={modalidad}
                  options={ListModalidad}
                  onInputChange={handleFilterChangemodalidad}
                  placeholder={"Seleccione ..."}
                  disabled={false}
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
              sx={{ padding: "1%" }}
            >
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <Tooltip title="Buscar">
                  <Button
                    onClick={consulta}
                    variant="contained"
                    color="secondary"
                    endIcon={<SendIcon sx={{ color: "white" }} />}
                  >
                    <Typography sx={{ color: "white" }}> Buscar </Typography>
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <Tooltip title="Limpiar Filtros">
                  <Button
                    onClick={clearFilter}
                    variant="contained"
                    color="secondary"
                    endIcon={<CleaningServicesIcon sx={{ color: "white" }} />}
                  >
                    <Typography sx={{ color: "white" }}>
                      Limpiar Filtros
                    </Typography>
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2}></Grid>
              <Grid item xs={12} sm={6} md={4} lg={6}></Grid>
            </Grid>
          </Collapse>

          {agregar ? <ButtonsAdd handleOpen={handleOpen} agregar={true} /> : ""}
          <Progress open={show}></Progress>

          {agregar ? (
            <ButtonsImport handleOpen={handleUpload} agregar={agregar} />
          ) : (
            ""
          )}

          <ButtonsShare
            title={showfilter ? "Ocultar Filtros" : "Ver Filtros"}
            handleFunction={verfiltros}
            show={true}
            icon={showfilter ? <FilterAltOffIcon /> : <FilterAltIcon />}
            row={undefined}
          />

{eliminar ? (<Tooltip title={"Eliminar Registros Seleccionados"}>
          <ToggleButton
            value="check"
            className="guardar"
            size="small"
            onChange={() => noSelection()}
          >
            <IconButton color="inherit" component="label" size="small">
              <DeleteForeverIcon />
            </IconButton>
          </ToggleButton>
        </Tooltip>):("") }
          <MUIXDataGridGeneral columns={columns} rows={bancos} setRowSelected={setSelectionModel}
          multiselect={true}/>
        </div>
      </Grid>

      {openModalOrgano ? (
        <OrganoC handleFunction={handleClose} obj={vrows} />
      ) : (
        ""
      )}

      {openModalNotificacion ? (
        <Notif handleFunction={handleClose} obj={vrows} />
      ) : (
        ""
      )}
      {openAdjuntos ? (
        <VisorDocumentos handleFunction={handleClose} obj={vrows} tipo={1} />
      ) : (
        ""
      )}
      {openModalAcciones ? (
        <Acciones handleFunction={handleClose} obj={vrows} />
      ) : (
        ""
      )}
      {openModalOficios ? (
        <Oficios handleFunction={handleClose} obj={vrows} idauditoria={id} />
      ) : (
        ""
      )}
      {openModalgant ? (
        <GanttModal handleFunction={handleClose} obj={vrows} />
      ) : (
        ""
      )}
    </div>
  );
};
