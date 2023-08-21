import React, { useEffect, useState } from "react";
import TitleComponent from "../../componentes/TitleComponent";
import ModalForm from "../../componentes/ModalForm";
import ButtonsAdd from "../../componentes/ButtonsAdd";
import MUIXDataGrid from "../../MUIXDataGrid";
import Progress from "../../Progress";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { GridColDef } from "@mui/x-data-grid";
import ButtonsDeleted from "../../componentes/ButtonsDeleted";
import { ButtonsDetail } from "../../componentes/ButtonsDetail";
import ButtonsEdit from "../../componentes/ButtonsEdit";
import { AuditoriaService } from "../../../services/AuditoriaService";
import { Toast } from "../../../helpers/Toast";
import Swal from "sweetalert2";
import { PERMISO, USUARIORESPONSE } from "../../../interfaces/UserInfo";
import { getPermisos, getUser } from "../../../services/localStorage";
import AttachmentIcon from "@mui/icons-material/Attachment";
import VisorDocumentos from "../../componentes/VisorDocumentos";
import { ContestacionModal } from "./ContestacionModal";

export const Contestacion = ({
  handleFunction,
  obj,
}: {
  handleFunction: Function;
  obj: any;
}) => {
  const [openSlider, setOpenSlider] = useState(true);
  const [open, setOpen] = useState(false);
  const [openModalDetalle, setOpenModalDetalle] = useState(false);
  const [vrows, setVrows] = useState({});
  const [data, setData] = useState([]);
  const [openAdjuntos, setOpenAdjuntos] = useState(false);
  const [show, setShow] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(true);
  const [editar, setEditar] = useState<boolean>(true);
  const [eliminar, setEliminar] = useState<boolean>(true);

  const handleVerAdjuntos = (data: any) => {
    setVrows(data);
    setOpenAdjuntos(true);
  };

  const consulta = (data: any) => {
    AuditoriaService.Contestacionindex(data).then((res) => {
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
        //setOpenSlider(false);
        let data = {
          NUMOPERACION: 3,
          CHID: v.data.row.id,
          CHUSER: user.Id,
        };

        AuditoriaService.Contestacionindex(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "¡Registro Eliminado!",
            });
            //consulta({ NUMOPERACION: 4 });
            consulta({ NUMOPERACION: 4, P_IDNOTIFICACION: obj.id });
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
    setVrows(data);
    setOpenModalDetalle(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenAdjuntos(false);
    setOpenModal(false);
    consulta({ NUMOPERACION: 4, P_IDNOTIFICACION: obj.id });
  };

  const handleEdit = (data: any) => {
    setOpenModal(true);
    setTipoOperacion(2);
    setVrows(data.data);
  };

  const handleOpen = (v: any) => {
    setOpenModal(true);
    setTipoOperacion(1);
    setVrows("");
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
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
            <ButtonsEdit
              handleAccion={handleEdit}
              row={v}
              show={editar}
            ></ButtonsEdit>
            <ButtonsDeleted
              handleAccion={handleAccion}
              row={v}
              show={eliminar}
            ></ButtonsDeleted>
            <ButtonsDetail
              title={"Ver adjuntos"}
              handleFunction={handleVerAdjuntos}
              show={true}
              icon={<AttachmentIcon />}
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
    { field: "creado", headerName: "Creado Por", width: 150 },
    { field: "modi", headerName: "Modificado Por", width: 150 },
    { field: "Dependencia", headerName: "Dependencia", width: 100 },
    { field: "Prorroga", headerName: "Prorroga", width: 100 },
    { field: "Oficio", headerName: "Oficio", width: 150 },
    { field: "SIGAOficio", headerName: "Folio SIGA", width: 150 },
    { field: "FOficio", headerName: "Fecha de Oficio", width: 150 },
  ];

  useEffect(() => {
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
    consulta({ NUMOPERACION: 4, P_IDNOTIFICACION: obj.id });
  }, []);

  return (
    <div>
      <ModalForm
        title={"Contestación a Notificación"}
        handleClose={handleFunction}
      >
        <Progress open={openSlider}></Progress>
        <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
        <MUIXDataGrid columns={columns} rows={data} />
      </ModalForm>
      {openModal ? (
        <ContestacionModal
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
          user={user}
          idNotificacion={obj.id}
        />
      ) : (
        ""
      )}
      {openModal ? (
        <ContestacionModal
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
          user={user}
          idNotificacion={obj.id}
        />
      ) : (
        ""
      )}

      {openAdjuntos ? (
        <VisorDocumentos handleFunction={handleClose} obj={vrows} tipo={3} />
      ) : (
        ""
      )}
    </div>
  );
};

export default ContestacionModal;
