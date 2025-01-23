import { useEffect, useState } from "react";
import IFrame from "./IFrame"
import TitleComponent from "../componentes/TitleComponent";
import ButtonsAdd from "../componentes/ButtonsAdd";
import { getIdApp, getPermisos, getToken, getUser } from "../../services/localStorage";
import { PERMISO, USUARIORESPONSE } from "../../interfaces/UserInfo";
import axios from "axios";
import { GridColDef } from "@mui/x-data-grid";
import MUIXDataGridGeneral from "../MUIXDataGridGeneral";
import ButtonsEdit from "../componentes/ButtonsEdit";
import ButtonsDeleted from "../componentes/ButtonsDeleted";

export const Usuarios = ()=>{
      const [open, setOpen] = useState(false);
  const [openSlider, setOpenSlider] = useState(false);
  const [agregar, setAgregar] = useState<boolean>(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [vrows, setVrows] = useState("");
   const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
 

const user: USUARIORESPONSE = JSON.parse(String(getUser()));
const [usuarios, setUsuarios] = useState([]);

      
      const handleClose = () => {
        setOpen(false);
        //consulta({ NUMOPERACION: 4 });
      };
      const handleOpen = (v: any) => {
        setTipoOperacion(1);
        //setModo("Agregar Registro");
        setOpen(true);
        //setVrows("");
      };
      const handleEdit = (v: any) => {
        setTipoOperacion(2);
        //setModo("Módificar Registro");
        setOpen(true);
        setVrows(v.data.row.Id||"");
      };
    
      const columns: GridColDef[] = [
        {
          field: "id",
          headerName: "Identificador",
          width: 150,
        },
        { field: "Nombre", 
          headerName: "Nombre", 
          width: 350, 
          headerAlign: "center",
        },
        { field: "ApellidoPaterno", 
          headerName: "Apellido Paterno", 
          width: 350, 
          headerAlign: "center",
        },
        { field: "ApellidoMaterno", 
          headerName: "Apellido Materno", 
          width: 350, 
          headerAlign: "center",
        },
        { field: "CorreoElectronico", 
          headerName: "Correo Electronico", 
          width: 350, 
          headerAlign: "center",
        },
        { field: "Activo", 
          headerName: "Estatus", 
          width: 150, 
          headerAlign: "center",
          renderCell: (params:any) => (
            
             <span>{params?.row?.EstaActivo === 1 ? "Activo" : "No Activo"}</span>
          ),
        },
        {
          field: "acciones",
          disableExport: true,
          headerName: eliminar || editar ? "Acciones" : "",
          description: eliminar || editar ? "Campo de Acciones" : "",
          sortable: false,
          //width: 200,
          width: eliminar || editar ? 200 : 0,
          align: "center",
          headerAlign: "center",
    
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
                {/* {eliminar ? (
                  <ButtonsDeleted
                    handleAccion={handleAccion}
                    row={v}
                    show={true}
                  ></ButtonsDeleted>
                ) : (
                  ""
                )} */}
              </>
            );
          },
        },
        { field: "FechaCreacion", 
          headerName: "Fecha de Creación", 
          width: 150, 
          align: "center",
          headerAlign: "center",
        },
        {
          field: "UltimaActualizacion",
          headerName: "Última Actualización",
          width: 150,
          align: "center",
          headerAlign: "center",
        },
        { field: "modi", 
          headerName: "Creado Por", 
          width: 200, 
          headerAlign: "center",
        },
        { field: "creado", 
          headerName: "Modificado Por", 
          width: 200, 
          headerAlign: "center",
        },
      ];

      const getUsuarios = (setState: Function) => {
        axios
          .get(process.env.REACT_APP_APPLICATION_BASE_URL_EXT + "users-app", {
            params: {
              IdApp: JSON.parse(String(getIdApp())),
              
            },
            headers: {
              Authorization: JSON.parse(String(getToken())) || "",
            },
            
          })
          
          .then((r) => {
            setState(r.data.data);
            setUsuarios(r.data.data);
            console.log("Usuarios",usuarios);
            

          });
      };
      

useEffect(() => {
  getUsuarios(setUsuarios);
  }, []);
  useEffect(() => {
      permisos.map((item: PERMISO) => {
        if (String(item.menu) === "USUARIOS") {
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
    }, []);
    useEffect(() => {
// console.log("vrows",vrows?.data?.row?.Id);
      }, [vrows]);
      

    return(
        <div style={{ height: 600, width: "100%", padding: "1%" }}>
        {open ? (
  tipoOperacion === 2 ? (
    <IFrame
      source={
        "?jwt=" +
        JSON.parse(String(getToken())) +
        "&IdApp=" +
        JSON.parse(String(getIdApp())) +
        "&idUsuarioModificado=" +
        vrows
      }
      baseURL={String(process.env.REACT_APP_APPLICATION_BASE_URL_LOGIN)}
      tipo={tipoOperacion}
      handleClose={handleClose}
    />
  ) : (
    <IFrame
      source={
        "?jwt=" +
        JSON.parse(String(getToken())) +
        "&IdApp=" +
        JSON.parse(String(getIdApp()))
      }
      baseURL={String(process.env.REACT_APP_APPLICATION_BASE_URL_LOGIN)}
      tipo={tipoOperacion}
      handleClose={handleClose}
      //dt={vrows}
    />
  )
) : ""}

  
        <TitleComponent title={"Usuarios"} show={openSlider} />
        {agregar ? <ButtonsAdd handleOpen={handleOpen} agregar={true} /> : ""}
        <MUIXDataGridGeneral
                columns={columns}
                rows={usuarios}
                //setRowSelected={setSelectionModel}
                multiselect={true}
              />
        {/* {eliminar ? (
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
        /> */}
      </div>
    )
}