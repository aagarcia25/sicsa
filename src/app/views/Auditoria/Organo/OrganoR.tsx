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
import VisorDocumentos from "../../componentes/VisorDocumentos";
import { OrganoRModal } from "./OrganoRModal";

export const OrganoR = ({
  handleFunction,
  obj,
}: {
  handleFunction: Function;
  obj: any;
}) => {
  const [openSlider, setOpenSlider] = useState(true);
  const [vrows, setVrows] = useState({});
  const [data, setData] = useState([]);
  const [openAdjuntos, setOpenAdjuntos] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);

  const handleVerAdjuntos = (data: any) => {
    setVrows(data);
    setOpenAdjuntos(true);
  };

  const consulta = (data: any) => {
    AuditoriaService.OrganoRindex(data).then((res) => {
      if (res.SUCCESS) {
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
        let data = {
          NUMOPERACION: 3,
          CHID: v.data.row.id,
          CHUSER: user.Id,
        };

        AuditoriaService.OrganoRindex(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "¡Registro Eliminado!",
            });
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

  const handleClose = () => {
    setOpenAdjuntos(false);
    setOpenModal(false);
    consulta({ NUMOPERACION: 4, P_IDNOTIFICACION: obj.id });
  };

  const handleEdit = (data: any) => {
    setOpenModal(true);
    setTipoOperacion(2);
    setVrows(data.data);
  };

  const handleOpen = () => {
    setOpenModal(true);
    setTipoOperacion(1);
    setVrows({});
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      width: 150,
    },
    
    { field: "FechaCreacion", headerName: "Fecha de Creación", width: 150 },
    {
      field: "UltimaActualizacion",
      headerName: "Última Actualización",
      width: 150,
    },
    { field: "creado", headerName: "Creado Por", width: 150 },
    { field: "modi", headerName: "Modificado Por", width: 150 },
    { field: "descripcionorigen", headerName: "Organo Origen", width: 300 },
    { field: "descripciodestino", headerName: "Organo Destino", width: 300 },
    { field: "Oficio", headerName: "Oficio", width: 150 },
    { field: "SIGAOficio", headerName: "Folio SIGA", width: 150 },
    { field: "FOficio", headerName: "Fecha de Oficio", width: 150 },
    { field: "FRecibido", headerName: "Fecha de Recibido", width: 150 },
    { field: "FVencimiento", headerName: "Fecha de Vencimiento", width: 150 },
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
          {editar ? (<ButtonsEdit
              handleAccion={handleEdit}
              row={v}
              show={editar}
            ></ButtonsEdit>):("")}
            {eliminar ? (<ButtonsDeleted
              handleAccion={handleAccion}
              row={v}
              show={eliminar}
            ></ButtonsDeleted>):("")}
            
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
  ];

  useEffect(() => {
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
    consulta({ NUMOPERACION: 4, P_IDNOTIFICACION: obj.id });
  }, []);

  return (
    <div>
      <ModalForm
        title={"Contestación a Organo Áuditor"}
        handleClose={handleFunction}
      >
        <Progress open={openSlider}></Progress>
        {agregar ? (<ButtonsAdd handleOpen={handleOpen} agregar={agregar} />):("")}
        
        <MUIXDataGrid columns={columns} rows={data} />
      </ModalForm>
      {openModal ? (
        <OrganoRModal
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
        <VisorDocumentos handleFunction={handleClose} obj={vrows} tipo={7} cat="OrganoR"/>
      ) : (
        ""
      )}
    </div>
  );
};
