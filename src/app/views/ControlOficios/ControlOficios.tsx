import AttachmentIcon from "@mui/icons-material/Attachment";
import ClearIcon from "@mui/icons-material/Clear";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import InsertPageBreakIcon from "@mui/icons-material/InsertPageBreak";
import { IconButton, ToggleButton, Typography } from "@mui/material";
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
export const ControlOficios = () => {
  const [openAdjuntos, setOpenAdjuntos] = useState(false);
  const [openSlider, setOpenSlider] = useState(true);
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const [bancos, setBancos] = useState([]);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

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

  const CancelarFolio = () => {};
  const generarBS = () => {};

  const ProcesaSPeis = (event: React.ChangeEvent<HTMLInputElement>) => {
    /*  setOpenSlider(true);
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
      formData.append("TIPO", String(tipo));
      formData.append("NUMOPERACION", "1");
      formData.append("ID", obj.id);
      formData.append("CHUSER", user.Id);
      formData.append("TOKEN", JSON.parse(String(getToken())));
      formData.append("FILE", item.Archivo, item.NOMBRE);
      let p = axios.post(
        process.env.REACT_APP_APPLICATION_BASE_URL + "Filesindex",
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
    });*/
  };
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      width: 150,
    },
    { field: "Fecha", headerName: "Fecha", width: 150 },
    { field: "Oficio", headerName: "Oficio", width: 150 },
    { field: "Nauditoria", headerName: "N° de Auditoría", width: 100 },
    { field: "Solicita", headerName: "Solicitante", width: 150 },
    {
      field: "FechaEntrega",
      headerName: "Fecha de Entregado",
      width: 150,
    },
    { field: "FechaRecibido", headerName: "Fecha de Recibido", width: 200 },
    { field: "Asunto", headerName: "Asunto", width: 200 },
    { field: "Tema", headerName: "Tema", width: 350 },
    { field: "tipoau", headerName: "Tipo", width: 350 },
    { field: "Observaciones", headerName: "Observaciones", width: 350 },
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
              title={"Cancelar Folio"}
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

  useEffect(() => {
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

      <MUIXDataGrid columns={columns} rows={bancos} />

      {openAdjuntos ? (
        <VisorDocumentosOficios handleFunction={handleClose} obj={vrows} />
      ) : (
        ""
      )}
    </div>
  );
};
