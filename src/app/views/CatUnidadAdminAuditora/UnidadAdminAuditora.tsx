import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Toast } from "../../helpers/Toast";
import { PERMISO, USUARIORESPONSE } from "../../interfaces/UserInfo";
import { CatalogosServices } from "../../services/catalogosServices";
import { getPermisos, getUser } from "../../services/localStorage";
import MUIXDataGrid from "../MUIXDataGrid";
import ButtonsAdd from "../componentes/ButtonsAdd";
import ButtonsDeleted from "../componentes/ButtonsDeleted";
import ButtonsEdit from "../componentes/ButtonsEdit";
import TitleComponent from "../componentes/TitleComponent";
import { UnidadAdminAuditoraModal } from "./UnidadAdminAuditoraModal";
import MUIXDataGridGeneral from "../MUIXDataGridGeneral";
import { IconButton, ToggleButton, Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const UnidadAdminAuditora = () => {
  const [openSlider, setOpenSlider] = useState(true);
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const [bancos, setBancos] = useState([]);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [selectionModel, setSelectionModel] = useState<any[]>([]);

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

          CatalogosServices.Unidad_Admin_Auditora_index(data).then((res) => {
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
            NUMOPERACION: 5,
            CHIDs: selectionModel,
            CHUSER: user.Id,
          };

          CatalogosServices.Unidad_Admin_Auditora_index(data).then((res) => {
            console.log("Respuesta:", res);

            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "¡Registros Eliminados!",
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
    { field: "Descripcion", headerName: "Descripción", width: 350 },
    {
      field: "acciones",
      disableExport: true,
      headerName: eliminar || editar ? "Acciones": "",
      description: eliminar || editar ? "Campo de Acciones": "",
      sortable: false,
      //width: 200,
      width: eliminar || editar ? 200 : 0,
      renderCell: (v) => {
        return (
          <>
          {editar ? (
          <ButtonsEdit
              handleAccion={handleAccion}
              row={v}
              show={editar}
            ></ButtonsEdit>
            ):(""
            )} 
            {eliminar ? (
            <ButtonsDeleted
              handleAccion={handleAccion}
              row={v}
              show={eliminar}
            ></ButtonsDeleted>
            ):(""
            )}
            
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
    { field: "CreadoPor", headerName: "Creado Por", width: 200 },
    { field: "ModificadoPor", headerName: "Modificado Por", width: 200 },
    
  ];

  const handleClose = () => {
    setOpen(false);
    consulta({ NUMOPERACION: 4 });
  };

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
    setVrows("");
  };

  const consulta = (data: any) => {
    CatalogosServices.Unidad_Admin_Auditora_index(data).then((res) => {
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

  useEffect(() => {
    permisos.map((item: PERMISO) => {
      if (String(item.menu) === "UAA") {
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
        <UnidadAdminAuditoraModal
          open={open}
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
        />
      ) : (
        ""
      )}

      <TitleComponent
        title={"Unidades Administrativas Auditoras"}
        show={openSlider}
      />
      {agregar ? (
      <ButtonsAdd 
      handleOpen={handleOpen} 
      agregar={agregar} 
      />
      ):(""
      )}
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
          multiselect={true}
/>
    </div>
  );
};
