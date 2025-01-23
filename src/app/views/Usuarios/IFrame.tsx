import { useEffect } from "react"; 
import './Iframe.css'; 
import ModalForm from "../componentes/ModalForm";
import { Grid } from "@mui/material";
 
export const IFrame = ({ 
  baseURL, 
  source, 
  tipo,
  handleClose,
  //dt,

}: { 
  source: string; 
  baseURL: string; 
  tipo: number;
  handleClose: Function;
  //dt: any;

}) => { 
 
  useEffect(() => { 
    console.log("source",source);
    console.log("baseURL",baseURL);
    
  }, []); 
 
  if (!source) { 
    return <div>Loading...</div>; 
  } 
 
  return ( 
    <> 
    <ModalForm
        title={tipo === 1 ? "Agregar Registro" : "Editar Registro"}
        handleClose={handleClose}
      >
      <Grid sx={{width:"95vw",height:"87.5vh",display:"felx",justifyContent:"center",alignItems:"center"}}> 
        <iframe 
          className="iframe" 
          src={String(baseURL) + String(source)} 
          title="Embedded PDF" 
        ></iframe> 
      </Grid> 
      </ModalForm>
    </> 
  ); 
}; 
 
export default IFrame; 
 
// export const getToken = () => { 
//   let token = String(localStorage.getItem("token")) 
//   JSON.parse(token)
//   //token = token.replace(/^"|"$/g, '');
//   console.log(token);
//   return token; 
// };

// export const getIdApp = () => { 
//   let idApp = localStorage.getItem("idapp"); 
//   return idApp; 
// };