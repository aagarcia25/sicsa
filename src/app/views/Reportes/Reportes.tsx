import { Grid } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import MUIXDataGrid from "../MUIXDataGrid";
import { AuditoriaService } from "../../services/AuditoriaService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getUser } from "../../services/localStorage";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import ArticleIcon from '@mui/icons-material/Article';

export const Reportes = () => {

    const [data, setData] = useState([]);
   
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));




    const consulta = () => {
        let data = {
            NUMOPERACION: 4,
            
          };
        AuditoriaService.ReportesIndex(data).then((res) => {
            console.log("res",res);
            
          if (res.SUCCESS) {
            // Toast.fire({
            //   icon: "success",
            //   title: "¡Consulta Exitosa!",
            // });
            setData(res.RESPONSE);
            //setOpenSlider(false);
          } else {
            //setOpenSlider(false);
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
          field: "ciid",
          headerName: "Identificador",
          width: 150,
        },
        {
          field: "ctaid",
          headerName: "Identificador",
          width: 150,
        },
        {
          field: "cefid",
          headerName: "Identificador",
          width: 150,
        },
        {
          field: "cgfid",
          headerName: "Identificador",
          width: 150,
        },
        {
          field: "csid",
          headerName: "Identificador",
          width: 150,
        },
    
    
        {
          field: "anio",
          description: "Año Cuenta Pública",
          headerName: "Año Cuenta Pública",
          width: 123,
          align: "center",
          headerAlign: "center",
        },
        {
          field: "NAUDITORIA",
          description: "Número de Auditoría",
          headerName: "No. de Auditoría",
          width: 120,
          align: "center",
          headerAlign: "center",
        },
        {
          field: "NombreAudoria",
          description: "Nombre",
          headerName: "Nombre",
          width: 325,
        },
        {
          field: "cmoDescripcion",
          description: "Modalidad",
          headerName: "Modalidad",
          width: 200,
        },
        {
          field: "ActaInicio",
          description: "Acta de Inicio",
          headerName: "Acta de Inicio",
          width: 185,
        },
        {
          field: "ceaDescripcion",
          description: "Estatus",
          headerName: "Estatus",
          width: 170,
        },
        {
          field: "acciones",
          disableExport: true,
          headerName: "Acciones",
          description: "Campo de Acciones",
          sortable: false,
          width: 400,
          renderCell: (v) => {
            return (
              <>
                
                <ArticleIcon
                  //onClick={}
                ></ArticleIcon>
    
                
              </>
            );
          },
        },
      ];

      useEffect( () => {
        consulta();
      },[]

      )

    return(
        <Grid container spacing={1} padding={0}>
        <h1>Reportes</h1>
        <MUIXDataGrid columns={columns} rows={data} />
        </Grid>
    );
}