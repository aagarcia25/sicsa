import { GridColDef } from "@mui/x-data-grid";
import ModalForm from "../componentes/ModalForm"
import MUIXDataGridGeneral from "../MUIXDataGridGeneral";
import { useEffect, useState } from "react";
import axios from "axios";
import { getIdApp, getToken, getUser } from "../../services/localStorage";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";

export const EstatusUsuarios = ({
    handleClose,

}:{
    handleClose: Function;

})=>{
    const [usuarios, setUsuarios] = useState([]);
    const user: USUARIORESPONSE = JSON.parse(String(getUser()));
    
    
    const getUsuarios = (setState: Function) => {
        axios
          .get(process.env.REACT_APP_APPLICATION_BASE_URL_EXT + "solicitudes-app", {
            params: {
              IdApp: JSON.parse(String(getIdApp())),
              IdUsuario: JSON.parse(String(getUser())), 
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

    const columns: GridColDef[] = [
        {
          field: "Id",
          headerName: "Identificador",
          width: 150,
        },
        { field: "NombreUsuario", 
          headerName: "Usuario", 
          width: 350, 
          headerAlign: "center",
        },
        { field: "tipoSoli", 
          headerName: "Tipo de solicitud", 
          width: 350, 
          headerAlign: "center",
        },
        { field: "Estatus", 
          headerName: "Estatus", 
          width: 350, 
          headerAlign: "center",
          renderCell: (params:any) => (
            <span>
                {params?.row?.Estatus === 1 ? "Aceptado" : params?.row?.Estatus === 0 ? "Pendiente" : "Rechazado"}
            </span>                 
              ),
        },
        // { field: "Mensaje", 
        //   headerName: "Observaciones", 
        //   width: 350, 
        //   headerAlign: "center",
        // },
        { field: "NombreSolicitante", 
          headerName: "Solicitante", 
          width: 150, 
          headerAlign: "center",
        //   renderCell: (params:any) => (
            
        //      <span>{params?.row?.EstaActivo === 1 ? "Activo" : "No Activo"}</span>
             
        //   ),
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
      
      useEffect(() => {
        getUsuarios(setUsuarios);
        }, []);

    return(
    <ModalForm title={"Solicitud de Usuarios"} handleClose={handleClose}>
<MUIXDataGridGeneral
                columns={columns}
                rows={usuarios}
                //setRowSelected={setSelectionModel}
                multiselect={true}
              />
    </ModalForm>
    )
}