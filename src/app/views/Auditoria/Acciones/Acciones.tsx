import AttachmentIcon from "@mui/icons-material/Attachment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
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
import { ButtonsImport } from "../../componentes/ButtonsImport";
import { CatalogosServices } from "../../../services/catalogosServices";
import { MigraData, resultmigracion } from "../../../interfaces/Share";
import { AccionesModal } from "./AccionesModal";
import VisorDocumentos from "../../componentes/VisorDocumentos";

const Acciones = ({
  handleFunction,
  obj,
}: {
  handleFunction: Function;
  obj: any;
}) => {
  const [openSlider, setOpenSlider] = useState(false);
  const [openAccionesModal, setOpenAccionesModal] = useState(false);
  const [openContestacion, setOpenContestacion] = useState(false);
  const [openAdjuntos, setOpenAdjuntos] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [show, setShow] = useState(false);
  const [vrows, setVrows] = useState({});
  const [NoAuditoria, setNoAuditoria] = useState(0);
  const [data, setData] = useState([]);
  const [tipoOperacion, setTipoOperacion] = useState(0);

  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [agregar, setAgregar] = useState<boolean>(true);
  const [editar, setEditar] = useState<boolean>(true);
  const [eliminar, setEliminar] = useState<boolean>(true);

  const handleDeleted = (v: any) => {
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

        AuditoriaService.Acciones_index(data).then((res) => {
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

  const consulta = (data: any) => {
    AuditoriaService.Acciones_index(data).then((res) => {
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
    setTipoOperacion(2);
    setOpenAccionesModal(true);
    setVrows(v.data.row);
    console.log("v", v.data.row);
  };

  const handleDetalle = (data: any) => {
    setVrows(data);
    setOpenContestacion(true);
  };

  const handleVerAdjuntos = (data: any) => {
    setVrows(data);
    setOpenAdjuntos(true);
  };

  const handleClose = () => {
    setOpenAccionesModal(false);
    setOpenContestacion(false);
    setOpenAdjuntos(false);
    consulta({ NUMOPERACION: 4, P_IDAUDITORIA: obj.id });
  };

  const handleUpload = (data: any) => {
    setShow(true);
    let file = data?.target?.files?.[0] || "";
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlxs");
    formData.append("CHUSER", user.Id);
    formData.append("tipo", "migraAcciones");
    CatalogosServices.migraData(formData).then((res) => {
      if (res.SUCCESS) {
        setShow(false);
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        consulta({ NUMOPERACION: 4, P_IDAUDITORIA: obj.id });
      } else {
        setShow(false);
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setOpenAccionesModal(true);
    setVrows("");
    setNoAuditoria(obj?.row?.NAUDITORIA);
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
              handleAccion={handleAccion}
              row={v}
              show={editar}
            ></ButtonsEdit>
            <ButtonsDeleted
              handleAccion={handleDeleted}
              row={v}
              show={eliminar}
            ></ButtonsDeleted>
            <ButtonsDetail
              title={"Ver Adjuntos"}
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
    { field: "creado", headerName: "Creado Por", width: 200 },
    { field: "modi", headerName: "Modificado Por", width: 200 },
    { field: "NAUDITORIA", headerName: "No. de Auditoría", width: 80 },
    {
      field: "DescripcionTipoDeAccion",
      headerName: "Tipo de Acción",
      width: 100,
    },
    {
      field: "DescripcionEstatusAccion",
      headerName: "Estatus de las Acciones",
      width: 150,
    },
    { field: "ClaveAccion", headerName: "Clave de Acción", width: 200 },
    { field: "idAuditoria", headerName: "idAuditoria", width: 150 },
    {
      field: "accionSuperviviente",
      headerName: "Acción Superveniente",
      width: 200,
    },
    { field: "TextoAccion", headerName: "Texto Acción", width: 900 },
    { field: "Valor", headerName: "Valor", width: 150 },
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
    consulta({ NUMOPERACION: 4, P_IDAUDITORIA: obj.id });
  }, []);

  return (
    <div>
      <ModalForm
        title={"Administración de Acciones"}
        handleClose={handleFunction}
      >
        {openAccionesModal ? (
          <AccionesModal
            dt={vrows}
            handleClose={handleClose}
            tipo={tipoOperacion}
            nAuditoria={NoAuditoria}
            idAuditoria={obj.id}
          />
        ) : (
          ""
        )}

        {openAdjuntos ? (
          <VisorDocumentos handleFunction={handleClose} obj={vrows} tipo={5} />
        ) : (
          ""
        )}

        <Progress open={show}></Progress>
        <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
        <ButtonsImport handleOpen={handleUpload} agregar={agregar} />
        <MUIXDataGrid columns={columns} rows={data} />
      </ModalForm>
    </div>
  );
};

export default Acciones;
