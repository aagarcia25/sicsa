import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import ButtonsDeleted from "../componentes/ButtonsDeleted";
import ButtonsEdit from "../componentes/ButtonsEdit";
import { useEffect, useState } from "react";
import { PERMISO, USUARIORESPONSE } from "../../interfaces/UserInfo";
import { getPermisos, getUser } from "../../services/localStorage";
import Swal from "sweetalert2";
import { CatalogosServices } from "../../services/catalogosServices";
import TitleComponent from "../componentes/TitleComponent";
import ButtonsAdd from "../componentes/ButtonsAdd";
import MUIXDataGrid from "../MUIXDataGrid";
import { Toast } from "../../helpers/Toast";
import { MunicipioModal } from "./MunicipioModal";


export const Municipio = () => {
    const [openSlider, setOpenSlider] = useState(true);
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const [bancos, setBancos] = useState([]);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(true);
  const [editar, setEditar] = useState<boolean>(true);
  const [eliminar, setEliminar] = useState<boolean>(true);
  const [ClaveINEGI, setClaveINEGI] = useState("");


  const handleAccion = (v: any) => {



    if (Number(ClaveINEGI) >= 19001 && Number(ClaveINEGI) <= 19051) {
      alert('No puedes editar este registro.');
    } else {
      // Permitir la edición
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
  
            CatalogosServices.Municipios_index(data).then((res) => {
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
    }



    // if (v.tipo == 1) {
    //   setTipoOperacion(2);
    //   setModo("Editar Registro");
    //   setOpen(true);
    //   setVrows(v.data);
    // } else if (v.tipo === 2) {
    //   Swal.fire({
    //     icon: "info",
    //     title: "¿Estás seguro de eliminar este registro?",
    //     showDenyButton: true,
    //     showCancelButton: false,
    //     confirmButtonText: "Confirmar",
    //     denyButtonText: `Cancelar`,
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       let data = {
    //         NUMOPERACION: 3,
    //         CHID: v.data.row.id,
    //         CHUSER: user.Id,
    //       };

    //       CatalogosServices.Municipios_index(data).then((res) => {
    //         if (res.SUCCESS) {
    //           Toast.fire({
    //             icon: "success",
    //             title: "¡Registro Eliminado!",
    //           });
    //           consulta({ NUMOPERACION: 4 });
    //         } else {
    //           Swal.fire("¡Error!", res.STRMESSAGE, "error");
    //         }
    //       });
    //     } else if (result.isDenied) {
    //       Swal.fire("No se realizaron cambios", "", "info");
    //     }
    //   });
    // }
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
              handleAccion={handleAccion}
              row={v}
              show={eliminar}
            ></ButtonsDeleted>
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
    { field: "creado", headerName: "Creado Por", width: 100 },
    { field: "modi", headerName: "Modificado Por", width: 100 },
    { field: "Nombre", headerName: "Nombre", width: 100 },
    { field: "ClaveEstado", headerName: "Clave Estado", width: 100 },
    { field: "ClaveINEGI", headerName: "Clave INEGI", width: 100 },

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
    CatalogosServices.Municipios_index(data).then((res) => {
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
      if (String(item.ControlInterno) === "TINFORMES") {
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
    <div style={{ height: 600, width: "100%", padding: "1%" }}>
      {open ? (
        <MunicipioModal
          open={open}
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
        />
      ) : (
        ""
      )}

      <TitleComponent title={"Municipios"} show={openSlider} />
      <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
      <MUIXDataGrid columns={columns} rows={bancos} />
    </div>
  );
};
         
  
   
  
    
 