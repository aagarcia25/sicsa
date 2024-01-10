import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toast } from "../../helpers/Toast";
import SelectValues from "../../interfaces/Share";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { IReportes } from "../../interfaces/menu";
import { ShareService } from "../../services/ShareService";
import { getUser } from "../../services/localStorage";
import { getHeaderInfoReporte } from "../../services/tokenCreator";
import SelectFrag from "../componentes/SelectFrag";
import Item from "antd/es/list/Item";

const resumenResultados = [
  {value: "Gobierno Central", label: "Gobierno Central" },
  {value: "Organismos Descentralizados", label: "Organismos Descentralizados"  },
  {value: "Municipios", label: "Municipios"  },
];


export const Reportes = () => {
  const [data, setData] = useState([]);
  const [idOrigenAuditoria, setidOrigenAuditoria] = useState("");
  const [ListOrigenAuditoria, setListOrigenAuditoria] = useState<
    SelectValues[]
  >([]);
  const [idTipoReporte, setidTipoReporte] = useState("");
  const [ListTipoReporte, setListTipoReporte] = useState<SelectValues[]>([]);
  const [NombreReporte, setNombreReporte] = useState("");
  const [AuxiliarReporte, setAuxiliarReporte] = useState("");

  const [anio, setanio] = useState("");
  const [ListAnio, setListAnio] = useState<SelectValues[]>([]);
  const [REPORTE, setREPORTE] = useState("");
  const [TIPO, setTIPO] = useState("");
  const [idEntidadFis, setidEntidadFis] = useState("");
  const [ListEntidadFis, setListEntidadFis] = useState<SelectValues[]>([]);
  const [selectedValue, setSelectedValue] = React.useState("PDF");
  const [Reporte, setReporte] = useState<IReportes>();
  const [listaReportes, setListaReportes] = useState<IReportes[]>([]);
  const [ResumenR, setResumenR] = useState("");
  const [ListEntidadFiscalizada, setListEntidadFiscalizada] = useState<SelectValues[]>([]);
  const [EntidadFiscalizada, setEntidadFiscalizada] = useState("");
  const [Municipios, setMunicipios] = useState("");
  const [ListMunicipios, setListMunicipios] = useState<SelectValues[]>([]);
  const [VisibleResumen, setVisibleResumen] = useState<boolean>(false);
  const [VisibleEntidadFiscalizada, setVisibleEntidadFiscalizada] = useState<boolean>(false);
  const [VisibleMunicipios, setVisibleMunicipios] = useState<boolean>(false);


  const downloadPdfFromBase64 = (base64String: string, fileName: string) => {
    const byteCharacters = atob(base64String); // Decodificar el string base64
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    // Crear un enlace <a> para descargar el archivo
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;

    // Simular un clic en el enlace para descargar el archivo
    link.click();

    // Limpiar después de la descarga
    window.URL.revokeObjectURL(link.href);
  };

  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  const ObtenerFiltro = () => {
    switch(ResumenR)
      {
        case "Gobierno Central":
          return (  EntidadFiscalizada);
          
          break;
        case "Municipios":
          return (Municipios);
          break;
          default:
            return("")
      }

  }

  const handleGenerar = () => {
    console.log("NombreReporte", setNombreReporte);

    //setOpenSlider(true);
    let flag = true;
    if (TIPO === "") {
      Toast.fire({
        title: "Es obligatorio el tipo de reporte",
        icon: "warning",
      });
      flag = false;
      //setOpenSlider(false);
    }

    if (flag) {
      const params = {
        TIPO: TIPO,
        P_ANIO: anio,
        REPORTE: NombreReporte,
      ResumenResultados: ResumenR,
      Filtro: ObtenerFiltro(),
      // ResumenR === "Gobierno Central" ? EntidadFiscalizada : ResumenR === "Gobierno Central" ?,

      };

      // let data = {
      //   CHID: Reporte?.id,
      //   TIPO: TIPO,
      //   PARAMETROS: params,
      //   P_ANIO: anio,
      //   REPORTE: NombreReporte,
      // };

      try {
        console.log("NombreReporte", NombreReporte);

        let header = getHeaderInfoReporte();
        axios
          .post(
            process.env.REACT_APP_APPLICATION_BASE_URL + "ReportesIndex",
            params
            // { responseType: "blob" }
          )
          .then((response) => {
            const archivo = response?.data?.RESPONSE;
            console.log("archivo", archivo);

            const identificadorAleatorio = Math.random()
              .toString(36)
              .substring(2, 8);
            const extension = TIPO;
            const nuevoNombreArchivo =
            AuxiliarReporte==="REP_04.jrxml"
             ? AuxiliarReporte + ' ('+ ResumenR + ') '+ `${identificadorAleatorio}.${extension}`
            
              :AuxiliarReporte + `${identificadorAleatorio}.${extension}`;
            console.log("nuevoNombreArchivo", nuevoNombreArchivo);
            
              

            // Llamar a la función para descargar el archivo PDF
            downloadPdfFromBase64(archivo, nuevoNombreArchivo);
          })
          .catch((error) => {
            //setOpenSlider(false);
            Toast.fire({
              title: "Error en la Generación de Reporte",
              icon: "warning",
            });
          });
      } catch (err: any) {
        //setOpenSlider(false);
      }
    }
  };

  const handleFilterChangeTipoReporte = (v: string) => {
    setidTipoReporte(v);
    // let opcion
    // opcion = ListTipoReporte.find((item) => item.label?.includes("Resumen de Resultados"))
    // if (opcion) {
    //   setVisibleResumen(true)
    // }
    //console.log("setidreporte1", opcion);

    ///console.log("selected",selected?.Reporte);

    // if(selected){
    //   setidTipoReporte(selected.id);
    //   setNombreReporte(selected.Reporte);
    //   console.log("setNombreReporte",NombreReporte);

    // }else{
    //   setidTipoReporte("");
    //   setNombreReporte("");
    // }
  };
  const handleFilterAnio = (v: string) => {
    setanio(v);
  };




  const handleFilterResumenResultados = (v: string) => {
    setResumenR(v)
    

  };



  const handleFilterEntidadFiscalizada = (v: string) => {
    setEntidadFiscalizada(v)
  };

  const handleFilterMunicipios = (v: string) => {
    setMunicipios(v)
  };



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTIPO(event.target.value);
  };
  // const handleReporte = (data: IReportes) => {
  //   setReporte(data);
  // };

  // const consultaReportes = (data: any) => {
  //   //setOpenSlider(true);
  //   CatalogosServices.reportesAdministracionRelacion(data).then((res) => {
  //     setListaReportes(res.RESPONSE);
  //     //setOpenSlider(false);
  //   });
  // };

  const loadFilter = (operacion: number, id?: string) => {
    let data = { NUMOPERACION: operacion, P_ID: id };
    ShareService.SelectIndex(data).then((res) => {
      if (operacion === 5) {
        //  setCatInforme(res.RESPONSE);
      } else if (operacion === 1) {
        setListAnio(res.RESPONSE);
      } else if (operacion === 23) {
        setListTipoReporte(res.RESPONSE);
      } else if (operacion === 2) {
        setListEntidadFiscalizada(res.RESPONSE);
      }else if (operacion === 17) {
        setListMunicipios(res.RESPONSE);
         }
      //else if (operacion === 16) {
      //     setListInicio(res.RESPONSE);
      //   } else if (operacion === 18) {
      //     setListIdEstatus(res.RESPONSE);
      //   } 
    });
  };

  useEffect(() => {
    loadFilter(1);
    loadFilter(23);
    loadFilter(2);
    loadFilter(17);

    //consulta();
  }, []);

  useEffect(() => {
    if (idTipoReporte != "") {
      let data = { NUMOPERACION: 24, id: idTipoReporte };
      ShareService.SelectIndex(data).then((res) => {
        //setNombreReporte(res.RESPONSE.id)

        let auxResponse =
          res.RESPONSE.find((item: IReportes) => item.id === idTipoReporte) ||
          "";
        setNombreReporte(auxResponse.Reporte);
        console.log("aux",auxResponse);
        
        setAuxiliarReporte(auxResponse.Nombre);
      });
    }
  }, [idTipoReporte]);

  useEffect(()=> {
    let resumen
    resumen = idTipoReporte.includes("3b599aca-9a0d-11ee-b247-3cd92b4d9bf4")
    if (resumen) {
      console.log("entre al if 0 ",resumen);
      setVisibleResumen(true)

      if(VisibleResumen){
        let opcion
        opcion = ResumenR.includes("Gobierno Central")
        if (opcion) {
          console.log("entre al if 1 ",opcion);
    
          setVisibleEntidadFiscalizada(true)
          setVisibleMunicipios(false)
        }
        opcion = ResumenR.includes("Municipios")
        if (opcion) {
        console.log("entre al if 2 ",opcion);
      
          setVisibleEntidadFiscalizada(false)
          setVisibleMunicipios(true)
        }
        opcion = ResumenR.includes("Organismos Descentralizados")
        if (opcion) {
          console.log("entre al if 3 ",opcion);
    
          setVisibleEntidadFiscalizada(false)
          setVisibleMunicipios(false)
        }
      }

    }else{
      setVisibleResumen(false)
      setVisibleEntidadFiscalizada(false)
      setVisibleMunicipios(false)
      console.log("entre al else 0");

    
    }
    
    //setResumenR("")

  },[idTipoReporte,ResumenR])

  const disableGenerator=()=>{


    let obj=ListTipoReporte.find((item)=>item.value===idTipoReporte)
     

    switch(obj?.label){
     case "Resumen de Resultados":
      console.log("ResumenR",ResumenR);
      console.log("ObtenerFiltro()",ObtenerFiltro());
      console.log("todo",(ResumenR === "Gobierno Central"|| ResumenR === "Municipios") && ObtenerFiltro()!=="");

         return ((ResumenR === "Gobierno Central"|| ResumenR === "Municipios") && ObtenerFiltro()==="") || ResumenR === ''
     default: return false
     }


}
 


const [deshabilitar,setDeshabilitar]=useState<boolean>(true);
  //const deshabilitar: boolean = ((anio === "" || TIPO === "" || (idTipoReporte === "") || (ResumenR === "" )) || (!idTipoReporte) || (ResumenR === "Organismos Descentralizados"? (false):(ResumenR === "Gobierno Central" ? (EntidadFiscalizada === "") :  (Municipios === "")) ) ) || (idTipoReporte === "Gobierno" ? true : idTipoReporte === "Desarrollo Social")
  //(ResumenR=== "Gobierno"?(false):(ResumenR)=== "Desarrollo Social")||

useEffect (()=>{console.log(idTipoReporte);
  setDeshabilitar (anio === "" || TIPO === "" || idTipoReporte === ""  || disableGenerator())
},[idTipoReporte,TIPO,anio,ResumenR,EntidadFiscalizada,Municipios])
  return (
    <Grid container spacing={1} padding={0}>
      <Grid
        container
        item
        spacing={1}
        xs={12}
        sm={12}
        md={12}
        lg={12}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ padding: "1%" }}
      >
        <h1>Reportes</h1>
      </Grid>

      <Grid
        container
        item
        spacing={1}
        xs={12}
        sm={12}
        md={12}
        lg={12}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ padding: "1%" }}
      >
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ textAlign: "center" }}>
            Tipo de Reporte
          </FormLabel>

          {/* <Grid paddingTop={1} container item xs={12} md={6} justifyContent="center"> */}
          <RadioGroup
            aria-label="options"
            name="options"
            value={TIPO}
            onChange={handleChange}
            sx={{ display: "flex", flexDirection: "row" }}
          >

            <Grid container item xs={12} md={12} lg={12} sx={{ textAlign: "center" }}>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <FormControlLabel value="pdf" control={<Radio />} label="PDF" />
              </Grid>
              {/* <Grid item xs={12} sm={6} md={4} lg={4}>
                <FormControlLabel value="XLSX" control={<Radio />} label="XLSX" />
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={4}>
                <FormControlLabel value="xls" control={<Radio />} label="XLS" />
              </Grid> */}
            </Grid>
          </RadioGroup>
          {/* </Grid> */}
        </FormControl>
      </Grid>

      <Grid
        container
        item
        spacing={1}
        xs={12}
        sm={12}
        md={12}
        lg={12}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ padding: "1%" }}
      >
        {/* <Grid container item xs={12} md={8} lg={8} sx={{ textAlign: "center" }}> */}

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography sx={{ fontFamily: "sans-serif" }}>
            Tipo de Reporte:
          </Typography>
          <SelectFrag
            value={idTipoReporte}
            options={ListTipoReporte}
            onInputChange={handleFilterChangeTipoReporte}
            placeholder={"Seleccione.."}
            disabled={false}
          />
        </Grid>

        {VisibleResumen ? <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography sx={{ fontFamily: "sans-serif" }}>
            Resumen de resultados:
          </Typography>
          <SelectFrag
            value={ResumenR}
            options={resumenResultados}
            onInputChange={handleFilterResumenResultados}
            placeholder={"Seleccione.."}
            disabled={false}
          />
        </Grid> : ""}

        {VisibleEntidadFiscalizada ? <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography sx={{ fontFamily: "sans-serif" }}>
            Entidad Fiscalizada:
          </Typography>
          <SelectFrag
            value={EntidadFiscalizada}
            options={ListEntidadFiscalizada}
            onInputChange={handleFilterEntidadFiscalizada}
            placeholder={"Seleccione.."}
            disabled={false}
          />
        </Grid> : ""}
        
        {VisibleMunicipios ? <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography sx={{ fontFamily: "sans-serif" }}>
            Municipios:
          </Typography>
          <SelectFrag
            value={Municipios}
            options={ListMunicipios}
            onInputChange={handleFilterMunicipios}
            placeholder={"Seleccione.."}
            disabled={false}
          />
        </Grid> : ""}


        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography sx={{ fontFamily: "sans-serif" }}>
            Año Cuenta Pública:
          </Typography>
          <SelectFrag
            value={anio}
            options={ListAnio}
            onInputChange={handleFilterAnio}
            placeholder={"Seleccione.."}
            disabled={false}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography sx={{ fontFamily: "sans-serif" }}>
            Entidad Fiscalizada:
          </Typography>
          <SelectFrag
            value={idEntidadFis}
            options={ListEntidadFis}
            onInputChange={handleFilterEntidadFis}
            placeholder={"Seleccione.."}
            disabled={false}
          />
        </Grid> */}
        {/* </Grid> */}
      </Grid>
      <Grid
        container
        item
        spacing={1}
        xs={12}
        sm={12}
        md={12}
        lg={12}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ padding: "1%" }}
      >
        <Button
          className={"actualizar"}
          disabled={deshabilitar }
          onClick={() => handleGenerar()}
        >
          {"Generar Reporte"}
        </Button>
        {/* <Button
              className={"actualizar"}
              onClick={() => handleReporte()}
            >
              {"Generar noose"}
            </Button> */}

        {/* {listaReportes.map((item, index) => (
              <Tooltip title={item.Descripcion}>
                <MenuItem
                  className="menu-Typography-report"
                  onClick={() => handleReporte(item)}
                >
                  {item.Nombre}
                </MenuItem>
              </Tooltip>
            ))} */}
      </Grid>
    </Grid>
  );
};
