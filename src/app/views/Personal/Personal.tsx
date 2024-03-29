import { useEffect, useState } from "react";
import TitleComponent from "../componentes/TitleComponent";
import { getPermisos, getUser } from "../../services/localStorage";
import { PERMISO, USUARIORESPONSE } from "../../interfaces/UserInfo";
import ButtonsAdd from "../componentes/ButtonsAdd";
import ButtonsEdit from "../componentes/ButtonsEdit";
import ButtonsDeleted from "../componentes/ButtonsDeleted";
import { GridColDef } from "@mui/x-data-grid";
import MUIXDataGrid from "../MUIXDataGrid";
import { PersonalModal } from "./PersonalModal";
import Swal from "sweetalert2";
import { CatalogosServices } from "../../services/catalogosServices";
import { Toast } from "../../helpers/Toast";
import { TroubleshootRounded } from "@mui/icons-material";
import MUIXDataGridGeneral from "../MUIXDataGridGeneral";
import { IconButton, ToggleButton, Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const Personal = () => {
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

        CatalogosServices.Personal_index(data).then((res) => {
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

          CatalogosServices.Personal_index(data).then((res) => {
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

  const handleEdit = (v: any) => {
    setTipoOperacion(2);
    setModo("Módificar Registro");
    setOpen(true);
    setVrows(v);
  };

  const consulta = (data: any) => {
    CatalogosServices.Personal_index(data).then((res) => {
      if (res.SUCCESS) {
        setBancos(res.RESPONSE);
        setOpenSlider(false);
      } else {
        setOpenSlider(false);
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      width: 150,
    },

    {
      field: "Empleado",
      headerName: "Empleado",
      width: 80,
      headerAlign: "left",
    },
    {
      field: "Nombre",
      headerName: "Nombre",
      width: 200,
      headerAlign: "left",
    },
    {
      field: "Puesto",
      headerName: "Puesto",
      width: 200,
      headerAlign: "left",
    },
    { field: "RFC", headerName: "RFC", width: 150, headerAlign: "left" },
    { field: "CURP", headerName: "CURP", width: 200, headerAlign: "left" },
    {
      field: "CorreoElectronico",
      headerName: "Correo Electrónico",
      width: 250,
      headerAlign: "left",
    },
    {
      field: "Telefono",
      headerName: "Teléfono",
      width: 100,
      headerAlign: "left",
    },

    {
      field: "acciones",
      disableExport: true,
      headerName: eliminar || editar ? "Acciones" : "",
      description: eliminar || editar ? "Campo de Acciones" : "",
      sortable: false,
      //width: 200,
      width: eliminar || editar ? 100 : 0,
      renderCell: (v) => {
        return (
          <>
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
          </>
        );
      },
    },

    { field: "FechaCreacion", headerName: "Fecha de Creación", width: 140 },
    {
      field: "UltimaActualizacion",
      headerName: "Última Actualización",
      width: 140,
    },
    {
      field: "creado",
      headerName: "Creado Por",
      width: 180,
      headerAlign: "left",
    },
    {
      field: "modi",
      headerName: "Modificado Por",
      width: 180,
      headerAlign: "left",
    },
  ];

  useEffect(() => {
    permisos.map((item: PERMISO) => {
      if (String(item.menu) === "PERSONAL") {
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
      <TitleComponent title={"Personal"} show={openSlider} />
      {open ? (
        <PersonalModal
          open={open}
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
        />
      ) : (
        ""
      )}
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
};
