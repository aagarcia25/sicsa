import AttachmentIcon from "@mui/icons-material/Attachment";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Toast } from "../../../helpers/Toast";
import { PERMISO, USUARIORESPONSE } from "../../../interfaces/UserInfo";
import { AuditoriaService } from "../../../services/AuditoriaService";
import { getPermisos, getUser } from "../../../services/localStorage";
import Progress from "../../Progress";
import ButtonsAdd from "../../componentes/ButtonsAdd";
import ButtonsDeleted from "../../componentes/ButtonsDeleted";
import { ButtonsDetail } from "../../componentes/ButtonsDetail";
import ButtonsEdit from "../../componentes/ButtonsEdit";
import ModalForm from "../../componentes/ModalForm";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton, ToggleButton, Tooltip, Typography } from "@mui/material";
import MUIXDataGridGeneral from "../../MUIXDataGridGeneral";
import VisorDocumentosOficios from "../../componentes/VisorDocumentosOficios";
import { Contestacion } from "./Contestacion";
import { NotifModal } from "./NotifModal";
const Notif = ({
  handleFunction,
  obj,
}: {
  handleFunction: Function;
  obj: any;
}) => {
  const [openContestacion, setOpenContestacion] = useState(false);
  const [openAdjuntos, setOpenAdjuntos] = useState(false);
  const [show, setShow] = useState(false);
  const [vrows, setVrows] = useState({});
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [selectionModel, setSelectionModel] = useState<any[]>([]);
  const [updatedVrows, setupdatedVrows] = useState("");
  const [entregado, setEntregado] = useState({});

  const consulta = (data: any) => {
    AuditoriaService.Notificacionindex(data).then((res) => {
      if (res.SUCCESS) {
        setData(res.RESPONSE);
        setShow(false);
      } else {
        setShow(false);
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
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
          CHID: v.data.row.id,
          CHUSER: user.Id,
        };

        AuditoriaService.Notificacionindex(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "¡Registro Eliminado!",
            });
            consulta({ NUMOPERACION: 4, P_IDAUDITORIA: obj.id });
          } else {
            Swal.fire("¡Error!", res.STRMESSAGE, "error");
          }
        });
      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }
    });
  };

  const handleDetalle = (data: any) => {
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

  const handleVerAdjuntos = (data: any) => {
    setupdatedVrows(
      obj.row.anio + "/" + obj.row.NAUDITORIA + "/" + data.row.Oficio
    );
    setOpenAdjuntos(true);
    setEntregado(obj.row.entregado);
  };

  const handleClose = () => {
    setOpenContestacion(false);
    setOpenAdjuntos(false);
    setOpenModal(false);
    consulta({ NUMOPERACION: 4, P_IDAUDITORIA: obj.id });
  };

  const handleEdit = (data: any) => {
    setOpenModal(true);
    setTipoOperacion(2);
    setVrows([data.data, obj]);
  };

  const handleOpen = () => {
    setupdatedVrows(obj.row.anio + "/" + obj.row.NAUDITORIA + "/");
    setOpenModal(true);
    setTipoOperacion(1);
    setVrows({});
  };
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

          AuditoriaService.Notificacionindex(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "¡Registros Eliminados!",
              });
              consulta({ NUMOPERACION: 4, P_IDAUDITORIA: obj.id });
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

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      width: 150,
    },
    {
      field: "ciDescripcion",
      description: "Entrega",
      headerName: "Entrega",
      width: 150,
    },
    {
      field: "Oficio",
      description: "Oficio",
      headerName: "Oficio",
      width: 150,
    },
    {
      field: "unidad",
      description: "Unidad Responsable",
      headerName: "Unidad Responsable",
      width: 300,
    },

    {
      field: "secretaria",
      description: "Secretaría",
      headerName: "Secretaría",
      width: 300,
    },

    {
      field: "FOficio",
      description: "Fecha de Oficio",
      headerName: "Fecha de Oficio",
      width: 150,
    },
    {
      field: "FRecibido",
      description: "Fecha de Recibido",
      headerName: "Fecha de Recibido",
      width: 150,
    },
    {
      field: "FVencimiento",
      description: "Fecha de Vencimiento",
      headerName: "Fecha de Vencimiento",
      width: 150,
    },
    {
      field: "Prorroga",
      description: "Fecha de Prorroga",
      headerName: "Fecha de Prorroga",
      width: 150,
    },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <>
            {eliminar && obj.row.entregado !== "1" ? (
              <ButtonsDeleted
                handleAccion={handleAccion}
                row={v}
                show={eliminar}
              ></ButtonsDeleted>
            ) : (
              ""
            )}
            <ButtonsEdit
              handleAccion={handleEdit}
              row={v}
              show={true}
            ></ButtonsEdit>

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

  useEffect(() => {
    console.log("obj notif", obj);

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
    consulta({ NUMOPERACION: 4, P_IDAUDITORIA: obj.id });
  }, []);

  return (
    <div>
      <ModalForm title={"Notificaciones de Áreas"} handleClose={handleFunction}>
        <Progress open={show}></Progress>
        <Typography variant="h6">
          {obj.row.NAUDITORIA + " " + obj.row.NombreAudoria}
        </Typography>
        {agregar && obj.row.entregado !== "1" ? (
          <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
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
            tipo={4}
            Entregado={entregado}
          />
        ) : (
          ""
        )}
      </ModalForm>
      {openContestacion ? (
        <Contestacion
          handleFunction={handleClose}
          obj={vrows}
          Entregado={entregado}
        />
      ) : (
        ""
      )}
      {openModal ? (
        <NotifModal
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
          user={user}
          idAuditoria={obj.row.id}
          destino={updatedVrows}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Notif;
