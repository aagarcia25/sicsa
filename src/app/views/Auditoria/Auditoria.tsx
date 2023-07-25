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
import ChatIcon from '@mui/icons-material/Chat';
import { ButtonsDetail } from "../componentes/ButtonsDetail";
import Notif from "./Notificaciones/Notif";
import { Grid } from "@mui/material";
import VisorDocumentos from "../componentes/VisorDocumentos";
import AttachmentIcon from '@mui/icons-material/Attachment';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Acciones from "./Acciones/Acciones";
export const Auditoria = () => {
  const [openSlider, setOpenSlider] = useState(true);
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const [bancos, setBancos] = useState([]);
  const [openAdjuntos, setOpenAdjuntos] = useState(false);
  const [openModalAcciones, setOpenModalAcciones] = useState(false);
  
  const [openModalNotificacion, setOpenModalDetalle] = useState<boolean>(false);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));


  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);


  const handleVerAdjuntos = (data: any) => {
    setVrows(data);
    setOpenAdjuntos(true);
 };

  const handleClose = () => {
    setOpen(false);
    setOpenModalDetalle(false);
    setOpenAdjuntos(false);
    setOpenModalAcciones(false)
  };

  const handleAcciones = (data: any) => {
    setVrows(data);
    setOpenModalAcciones(true);
  };

  const handleDetalle = (data: any) => {
    setVrows(data);
    setOpenModalDetalle(true);
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
              Swal.fire( "¡Error!", res.STRMESSAGE,  "error");
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
      field: "acciones",  disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 250,
      renderCell: (v) => {
        return (
          <>
           <ButtonsDeleted handleAccion={handleAccion} row={v} show={true}></ButtonsDeleted>
           <ButtonsEdit handleAccion={handleAccion} row={v} show={true}></ButtonsEdit>
           <ButtonsDetail title={"Acciones"} handleFunction={handleAcciones} show={true} icon={<Diversity3Icon/>} row={v}></ButtonsDetail>
           <ButtonsDetail title={"Notificación Area"} handleFunction={handleDetalle} show={true} icon={<ChatIcon/>} row={v}></ButtonsDetail>
           <ButtonsDetail title={"Ver Adjuntos"} handleFunction={handleVerAdjuntos} show={true} icon={<AttachmentIcon/>} row={v}></ButtonsDetail>
          </>
         
        );
      },
    },
    { field: "FechaCreacion", headerName: "Fecha de Creación", width: 150 },
    { field: "UltimaActualizacion", headerName: "Ultima Actualización", width: 150 },
    { field: "creado", headerName: "Creado Por", width: 100 },
    { field: "modi", headerName: "Modificado Por", width: 100 },
    { field: "Consecutivo", headerName: "Consecutivo", width: 100 },
    { field: "NAUDITORIA", headerName: "No. De Auditoria", width: 100 },
    { field: "FolioSIGA", headerName: "Folio SIGA", width: 100 },
    { field: "Encargado", headerName: "Personal Encargado De La Auditoría", width: 200 },
    { field: "PersonalEncargado", headerName: "Personal", width: 300 },
    { field: "NombreAudoria", headerName: "Nombre", width: 300 },
    { field: "ActaInicio", headerName: "Acta De Inicio", width: 150 },
    { field: "OFinicio", headerName: "Oficio De Inicio", width: 150 },
    { field: "Fecha_Recibido", headerName: "Fecha Recibido ", width: 150 },
    { field: "Fecha_Vencimiento", headerName: "Fecha Vencimiento", width: 150 },
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
        Swal.fire( "¡Error!", res.STRMESSAGE,  "error");
      }
    });
  };

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
    consulta({ NUMOPERACION: 4 });
  }, []);

  return (
 <div>


    
   <Grid container spacing={1} padding={0}>
     <div style={{ height: 600, width: "100%" , padding:"1%"}}>
      {open ? (
        <AuditoriaModal
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
        />
      ) : ""}

       <TitleComponent title={"Administración de Auditorias"} show={openSlider} />
       <ButtonsAdd handleOpen={handleOpen} agregar={true} /> 
       <MUIXDataGrid columns={columns} rows={bancos} />     
    </div>

    </Grid>
    {openModalNotificacion ? (<Notif handleFunction={handleClose} obj={vrows}/>) : ("")} 
    {openAdjuntos ? (<VisorDocumentos handleFunction={handleClose} obj={vrows} tipo={1}/>) : ("")} 
    {openModalAcciones ? (<Acciones handleFunction={handleClose} obj={vrows}/>) : ("")} 
  </div>

  );
};
