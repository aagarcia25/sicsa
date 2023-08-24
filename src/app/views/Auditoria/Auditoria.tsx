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
import { Collapse, Grid, Typography } from "@mui/material";
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
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [showfilter, setshowfilter] = useState<boolean>(false);

  const [idEstatus, setidEstatus] = useState("");
  const [ListIdEstatus, setListIdEstatus] = useState<SelectValues[]>([]);
  const [inicio, setInicio] = useState("");
  const [Listinicio, setListInicio] = useState<SelectValues[]>([]);
  const [anio, setanio] = useState("");
  const [ListAnio, setListAnio] = useState<SelectValues[]>([]);
  const [modalidad, setmodalidad] = useState("");
  const [ListModalidad, setListModalidad] = useState<SelectValues[]>([]);

  const handleVerAdjuntos = (data: any) => {
    setVrows(data);
    setOpenAdjuntos(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenModalDetalle(false);
    setOpenAdjuntos(false);
    setOpenModalAcciones(false);
    setOpenModalOficios(false);
    consulta({ NUMOPERACION: 4 });
    setOpenModalgant(false);
  };

  const handleAcciones = (data: any) => {
    setVrows(data);
    setOpenModalAcciones(true);
  };

  const handleOficios = (data: any) => {
    setId(data.id);
    setVrows(data);
    setOpenModalOficios(true);
  };

  const handlePlan = (data: any) => {
    setId(data.id);
    setVrows(data);
    setOpenModalgant(true);
  };

  const handleDetalle = (data: any) => {
    setVrows(data);
    setOpenModalDetalle(true);
  };

  const handleFilterChangemodalidad = (v: string) => {
    setmodalidad(v);
  };

  const handleFilterChange1 = (v: string) => {
    setanio(v);
  };

  const handleFilterChangeinicio = (v: string) => {
    setInicio(v);
  };

  const handleFilterChangeestatus = (v: string) => {
    setidEstatus(v);
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
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 300,
      renderCell: (v) => {
        return (
          <>
            <ButtonsDeleted
              handleAccion={handleAccion}
              row={v}
              show={true}
            ></ButtonsDeleted>
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
              title={"Acciones"}
              handleFunction={handleAcciones}
              show={true}
              icon={<Diversity3Icon />}
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
    { field: "creado", headerName: "Creado Por", width: 100 },
    { field: "modi", headerName: "Modificado Por", width: 100 },
    { field: "anio", headerName: "Año Cuenta Pública", width: 100 },
    { field: "NAUDITORIA", headerName: "No. De Auditoría", width: 100 },
    { field: "FolioSIGA", headerName: "Folio SIGA", width: 100 },
    { field: "Modalidad", headerName: "Modalidad", width: 100 },
    { field: "Consecutivo", headerName: "Consecutivo", width: 100 },
    { field: "ActaInicio", headerName: "Acta de Inicio", width: 100 },
    { field: "NombreAudoria", headerName: "Nombre", width: 300 },
    {
      field: "Encargado",
      headerName: "Personal Encargado De La Auditoría",
      width: 200,
    },
    { field: "PersonalEncargado", headerName: "Personal", width: 300 },
    { field: "ctid", headerName: "ctid", width: 300 },
    { field: "ctDescripcion", headerName: "Clasificación", width: 300 },
    { field: "coaid", headerName: "coaid", width: 300 },
    { field: "coaDescripcion", headerName: "Origen Auditoría", width: 300 },
    { field: "cgfid", headerName: "cgfid", width: 300 },
    { field: "cgfDescripcion", headerName: "Grupo Funcional", width: 300 },
    { field: "csid", headerName: "csid", width: 300 },
    { field: "csDescripcion", headerName: "Sector", width: 300 },
    { field: "cefid", headerName: "cefid", width: 300 },
    { field: "cefDescripcion", headerName: "Entidad Fiscalizada", width: 300 },
    { field: "ctaid", headerName: "ctaid", width: 300 },
    { field: "ctaDescripcion", headerName: "Tipo de Auditoría", width: 300 },
    { field: "ciid", headerName: "ciid", width: 300 },
    { field: "ciDescripcion", headerName: "Informe", width: 300 },
    { field: "cuaaid", headerName: "cuaaid", width: 300 },
    { field: "cuaaDescripcion", headerName: "UAA", width: 300 },
    { field: "caaid", headerName: "caaid", width: 300 },
    { field: "caaDescripcion", headerName: "Área Auditoría", width: 300 },
    { field: "crid", headerName: "crid", width: 300 },
    { field: "crDescripcion", headerName: "Ramo", width: 300 },
    {
      field: "universopesos",
      headerName: "Universo Miles de Pesos",
      width: 300,
    },
    { field: "muestrapesos", headerName: "Muestra Miles de Pesos", width: 300 },
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

  const consulta = (data: any) => {
    AuditoriaService.Auditoriaindex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
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
      } else if (operacion === 12) {
        setListModalidad(res.RESPONSE);
      } else if (operacion === 16) {
        setListInicio(res.RESPONSE);
      } else if (operacion === 18) {
        setListIdEstatus(res.RESPONSE);
      }
    });
  };

  useEffect(() => {
    loadFilter(1);
    loadFilter(12);
    loadFilter(16);
    loadFilter(18);
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "AUDITOR") {
        if (String(item.Referencia) === "AGREG") {
          setAgregar(true);
        }
        if (String(item.Referencia) === "ELIM") {
          setEliminar(true);
        }
        if (String(item.Referencia) === "EDIT") {
          setEditar(true);
        }
      }
    });
    consulta({ NUMOPERACION: 4 });
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
              sx={{ padding: "2%" }}
            >
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
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography sx={{ fontFamily: "sans-serif" }}>
                  Origen Áuditoria:
                </Typography>
                <SelectFrag
                  value={inicio}
                  options={Listinicio}
                  onInputChange={handleFilterChangeinicio}
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
          </Collapse>

          <ButtonsAdd handleOpen={handleOpen} agregar={true} />
          <ButtonsShare
            title={showfilter ? "Ver Filtros" : "Ocultar Filtros"}
            handleFunction={verfiltros}
            show={true}
            icon={showfilter ? <FilterAltOffIcon /> : <FilterAltIcon />}
            row={undefined}
          />
          <MUIXDataGrid columns={columns} rows={bancos} />
        </div>
      </Grid>
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
