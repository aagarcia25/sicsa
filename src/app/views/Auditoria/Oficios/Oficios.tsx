import AttachmentIcon from "@mui/icons-material/Attachment";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Toast } from "../../../helpers/Toast";
import { PERMISO, USUARIORESPONSE } from "../../../interfaces/UserInfo";
import { AuditoriaService } from "../../../services/AuditoriaService";
import { getPermisos, getUser } from "../../../services/localStorage";
import MUIXDataGrid from "../../MUIXDataGrid";
import Progress from "../../Progress";
import ButtonsAdd from "../../componentes/ButtonsAdd";
import ButtonsDeleted from "../../componentes/ButtonsDeleted";
import { ButtonsDetail } from "../../componentes/ButtonsDetail";
import ButtonsEdit from "../../componentes/ButtonsEdit";
import ModalForm from "../../componentes/ModalForm";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import { OficiosModal } from "./OficiosModal";
import { IconButton, ToggleButton, Tooltip, Typography } from "@mui/material";
import MUIXDataGridGeneral from "../../MUIXDataGridGeneral";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisorDocumentosOficios from "../../componentes/VisorDocumentosOficios";
import { OficiosContestacion } from "./OficiosContestacion";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Notif from "../Notificaciones/Notif";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import Acciones from "../Acciones/Acciones";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { Etapas } from "./Etapas";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { validateHeaderValue } from "http";



export const Oficios = ({
  handleFunction,
  obj,
  idauditoria,
}: {
  handleFunction: Function;
  obj: any;
  idauditoria: string;
}) => {
  const [show, setShow] = useState(false);
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const [data, setData] = useState([]);
  const [openAdjuntos, setOpenAdjuntos] = useState(false);

  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [selectionModel, setSelectionModel] = useState<any[]>([]);
  const [updatedVrows, setupdatedVrows] = useState("");
  const [entregado, setEntregado] = useState({});
  const [openContestacion, setOpenContestacion] = useState(false);
  const [openModalOrgano, setopenModalOrgano] = useState<boolean>(false);
  const [openModalAcciones, setOpenModalAcciones] = useState(false);
  const [openEtapas, setopenEtapas] = useState(false);
  const [tipoEtapas, setTipoEtapas] = useState(0);
  const [ubicacion, setUbicacion] = useState("");




  const handleVerAdjuntos = (data: any) => {
    setupdatedVrows(
      obj.row.anio + "/" + obj.row.NAUDITORIA + "/" + data.row.Oficio
    );
    setOpenAdjuntos(true);
    //setEntregado(obj.row.entregado);
    setVrows(data)
    console.log("data clip",data);
    setEntregado(data.row.entregado)
  };
  const handleClose = () => {
    setOpen(false);
    setOpenAdjuntos(false);
    consulta();
    setOpenContestacion(false);
    setopenModalOrgano(false);
    setOpenModalAcciones(false)
    setopenEtapas(false)
  };
  const CierreEtapa = () => {
    setopenEtapas(true)
    setTipoEtapas(1)
  }
  const HabilitarEtapa = () => {
    setopenEtapas(true)
    setTipoEtapas(2)
  }
  const noSelection = () => {
    if (selectionModel.length >= 1) {
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

          AuditoriaService.OficiosA_index(data).then((res) => {
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

  const handleDetalle = (data: any) => {
    setUbicacion(
      obj.row.anio + "/" +obj.row.NAUDITORIA +"-" +obj.row.NombreAudoria +  "/" + data.row.Oficio
    );
    setVrows({
      ...data,
      row: {
        ...data.row,
        NAUDITORIA: obj.row.NAUDITORIA,
        anio: obj.row.anio,
        OficioC: obj.row.Oficio,
      },
    });
    setOpenContestacion(true);
    setEntregado(obj.row.entregado);
  };

  const handleORgano = (data: any) => {
    setUbicacion(
      obj.row.anio + "/" +obj.row.NAUDITORIA +"-" +obj.row.NombreAudoria +  "/" + data.row.Oficio
    );
    //if (data.row.entregado !== "1") {
    setVrows({
      ...data,
      row: {
        ...data.row,
        NAUDITORIA: obj.row.NAUDITORIA,
        anio: obj.row.anio,
      },
    });
    console.log("vrows oficio",{
      ...data,
      row: {
        ...data.row,
        NAUDITORIA: obj.row.NAUDITORIA,
        anio: obj.row.anio,
      },
    });
    
    setopenModalOrgano(true);
    //}
  };

  const handleAcciones = (data: any) => {
    //if (data.row.entregado !== "1") {
      setUbicacion(
        obj.row.anio + "/" +obj.row.NAUDITORIA +"-" +obj.row.NombreAudoria +  "/" + data.row.Oficio
      );
    setVrows({
      ...data,
      row: {
        ...data.row,
        NAUDITORIA: obj.row.NAUDITORIA,
        anio: obj.row.anio,
        NombreAudoria:obj.row.NombreAudoria,
      },
    });
    setOpenModalAcciones(true);
    //}
  };

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

        AuditoriaService.OficiosA_index(data).then((res) => {
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
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Oficio",
      description: "Oficio",
      headerName: "Oficio",
      width: 150,
      align: "center",
      headerAlign: "center",
      cellClassName: (params) => {
        // Aquí puedes agregar la lógica para asignar la clase en función del valor
console.log("v.row.entrgado1",params);

        if (params.row.entregado === 0) {
console.log("v.row.entrgado1",params.row.entregado);

          return 'redCell';
        }console.log("v.row.entrgado1",params.row.entregado);

        return 'greenCell';

      },
    },
    {
      field: "tofDescripcion",
      description: "Tipo Oficio",
      headerName: "Tipo Oficio",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "etDescripcion",
      description: "Etapa",
      headerName: "Etapa",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "OficioRelacion",
      description: "Oficio Relacionado",
      headerName: "Oficio Relacionado",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "FechaRecibido",
      description: "Fecha Recibido",
      headerName: "Fecha Recibido ",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "FechaVencimiento",
      description: "Fecha Vencimiento",
      headerName: "Fecha Vencimiento",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Descripcion",
      description: "Descripción",
      headerName: "Descripción",
      width: 370,
      //align: "center",
      headerAlign: "center",
    },
    {
      field: "Observacion",
      description: "Observación",
      headerName: "Observación",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 250,
      align: "center",
      headerAlign: "center",
      renderCell: (v) => {
        
        return (
          <>
            {eliminar ? (v.row.entregado !== 1 ? (
              <ButtonsDeleted
                handleAccion={handleAccion}
                row={v}
                show={true}
              ></ButtonsDeleted>
            ) : (
              ""
            )
          ):(
            ""
          )}


            {/* {editar ? ( */}
            <ButtonsEdit
              handleAccion={handleEdit}
              row={v}
              show={true}
            ></ButtonsEdit>
            {/* ) : (
               ""
             )} */}

            <ButtonsDetail
              title={"Notificaciones"}
              handleFunction={handleORgano}
              show={true}
              icon={<FormatListBulletedIcon />}
              row={v}
            ></ButtonsDetail>

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
              title={"Ver Contestación"}
              handleFunction={handleDetalle}
              show={true}
              icon={<DriveFileMoveIcon />}
              row={v}
            ></ButtonsDetail>
            {v.row.NoContestacion}
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
    setVrows([v, obj]);
  };

  const consulta = () => {
    let data = {
      NUMOPERACION: 4,
      P_IDAUDITORIA: obj.row.id,
    };
    AuditoriaService.OficiosA_index(data).then((res) => {
      if (res.SUCCESS) {
        setData(res.RESPONSE);
        setShow(false);
      } else {
        setShow(false);
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

  useEffect(() => {
    console.log("obj oficios",obj);
    console.log("obj.row.entregado",obj.row.entregado);
    
    
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
      }
    });

    consulta();
  }, [obj]);

  return (
    <div>
      <ModalForm
        title={"Administración de Oficios"}
        handleClose={handleFunction}
      >
        {open ? (
          <OficiosModal
            tipo={tipoOperacion}
            handleClose={handleClose}
            dt={vrows}
            idauditoria={idauditoria}
            datosOficio={obj}
          />
        ) : (
          ""
        )}
        <Progress open={show}></Progress>
        <Typography variant="h6">
          {obj.row.anio + "/" +obj.row.NAUDITORIA + "-" + obj.row.NombreAudoria}
        </Typography>

        {agregar && obj.row.entregado !== "1" ? (
          <ButtonsAdd handleOpen={handleOpen} agregar={true} />
        ) : (
          ""
        )}

        {eliminar && obj.row.entregado !== "1" ? (
          <Tooltip title={"Eliminar Registros Seleccionados"}>
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
          </Tooltip>
        ) : (
          ""
        )}

          <Tooltip title={"Cierre de etapa"}>
            <ToggleButton
              value="check"
              className="guardar"
              size="small"
              onChange={() => CierreEtapa()}
            >
              <IconButton color="inherit" component="label" size="small">
                <FactCheckIcon />
              </IconButton>
            </ToggleButton>
          </Tooltip>

          <Tooltip title={"Habilitar etapa"}>
            <ToggleButton
              value="check"
              className="guardar"
              size="small"
              onChange={() => HabilitarEtapa()}
            >
              <IconButton color="inherit" component="label" size="small">
                <EditNoteIcon/>
              </IconButton>
            </ToggleButton>
          </Tooltip>

        <MUIXDataGridGeneral
          columns={columns}
          rows={data}
          setRowSelected={setSelectionModel}
          multiselect={true}
        />
        {openAdjuntos ? (
          <VisorDocumentosOficios
            handleFunction={handleClose}
            obj={updatedVrows}
            tipo={3}
            Entregado={entregado}
          />
        ) : (
          ""
        )}
      </ModalForm>
      {openContestacion ? (
        <OficiosContestacion
          handleFunction={handleClose} obj={vrows}
          Entregado={obj?.row?.entregado}
          Ubicacion={ubicacion}
        />
      ) : (
        ""
      )}

      {openModalOrgano ? (
        <Notif handleFunction={handleClose} Ubicacion={ubicacion} obj={vrows} idauditoria={obj?.id}/>
      ) : (
        ""
      )}

      {openModalAcciones ? (
        <Acciones handleFunction={handleClose} Ubicacion={ubicacion} obj={vrows} idauditoria={obj?.id}/>
      ) : (
        ""
      )}

      {openEtapas ? (
        <Etapas
          open={openEtapas}
          handleFunction={handleClose}
          obj={vrows}
          tipo={tipoEtapas}
        ></Etapas>
      ) : (
        ""
      )}


      {/* {openAdjuntos ? ( */}
      {/* <VisorDocumentosOficios
          handleFunction={handleClose}
          obj={updatedVrows}
          tipo={3}
          Entregado={entregado}
        /> */}
      {/* ) : (
        ""
      )} */}
    </div>
  );
};
