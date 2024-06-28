import { useEffect, useState } from "react";
import { PERMISO, USUARIORESPONSE } from "../../interfaces/UserInfo";
import { getPermisos, getUser } from "../../services/localStorage";
import { CatalogosServices } from "../../services/catalogosServices";
import Swal from "sweetalert2";
import { GridColDef } from "@mui/x-data-grid";
import ButtonsEdit from "../componentes/ButtonsEdit";
import ButtonsDeleted from "../componentes/ButtonsDeleted";
import { Toast } from "../../helpers/Toast";
import TitleComponent from "../componentes/TitleComponent";
import { IconButton, ToggleButton, Tooltip } from "@mui/material";
import ButtonsAdd from "../componentes/ButtonsAdd";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MUIXDataGridGeneral from "../MUIXDataGridGeneral";
import { UnidadesModal } from "./UnidadesModal";


export const Unidades = ()=>{
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const [agregar, setAgregar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [openSlider, setOpenSlider] = useState(true);
  const [bancos, setBancos] = useState([]);
  const [selectionModel, setSelectionModel] = useState<any[]>([]);
  const [editar, setEditar] = useState<boolean>(false);
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [modo, setModo] = useState("");
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

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
            NUMOPERACION: 5,
            CHIDs: selectionModel,
            CHUSER: user.Id,
          };

          CatalogosServices.Entidad_Fiscalizada_index(data).then((res) => {
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

          CatalogosServices.Unidad_index(data).then((res) => {
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
      field: "uniDescripcion",
      headerName: "Descripción",
      description: "Descripción",
      width: 350,
    },
    {
        field: "secDescripcion",
        headerName: "Secretaria",
        description: "Secretaria",
        width: 350,
      },
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
            {editar ? (
              <ButtonsEdit
                handleAccion={handleAccion}
                row={v}
                show={editar}
              ></ButtonsEdit>
            ) : (
              ""
            )}
            {eliminar ? (
              <ButtonsDeleted
                handleAccion={handleAccion}
                row={v}
                show={eliminar}
              ></ButtonsDeleted>
            ) : (
              ""
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
    CatalogosServices.Unidad_index(data).then((res) => {
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
      if (String(item.menu) === "EFISCALIZADA") {
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

    return(
    <div style={{ height: 600, width: "100%", padding: "1%" }}>
        {open ? (
          <UnidadesModal
            open={open}
            tipo={tipoOperacion}
            handleClose={handleClose}
            dt={vrows}
          />
        ) : (
          ""
        )}
  
        <TitleComponent title={"Unidades"} show={openSlider} />
        {agregar ? <ButtonsAdd handleOpen={handleOpen} agregar={agregar} /> : ""}
        {eliminar ? (
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
          rows={bancos}
          setRowSelected={setSelectionModel}
          multiselect={true}
        />
      </div>
      );
}