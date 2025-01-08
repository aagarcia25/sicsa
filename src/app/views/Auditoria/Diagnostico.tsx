import { useEffect } from "react";
import ModalForm from "../componentes/ModalForm";
import { plantillaHTML } from "./Dignostico/DiagnosticoPlantilla";

export const Diagnostico = ({
  handleClose,
  obj,
  //open,
}:{
  handleClose: Function;
  obj:any;
  //open:boolean;
})=>{

  // const auditoriasTabla = JSON.parse(auditorias).map(record =>
  //   <tr style="background-color: #f9f9f9; color: #000;">
  //           <td style="padding: 8px; text-align: center;">{obj[0].Consecutivo}</td>
  //           <td style="padding: 8px; text-align: center;">{obj[0].anio}</td>
  //           <td style="padding: 8px; text-align: center;">{obj[0].NAUDITORIA}</td>
  //           <td style="padding: 8px; text-align: center;">{obj[0].cefDescripcion}</td>
  //           <td style="padding: 8px; text-align: center;">{obj[0].NAUDITORIA}</td>
  //           <td style="padding: 8px; text-align: center;">{obj[0].NAUDITORIA}</td>
  //           <td style="padding: 8px; text-align: center;">{obj[0].NAUDITORIA}</td>
  //           <td style="padding: 8px; text-align: center;">{obj[0].NAUDITORIA}</td>
  //           <td style="padding: 8px; text-align: center;">{obj[0].NAUDITORIA}</td>
  //           <td style="padding: 8px; text-align: center;">{obj[0].NAUDITORIA}</td>
  //           <td style="padding: 8px; text-align: center;">{obj[0].NAUDITORIA}</td>
  //           <td style="padding: 8px; text-align: center;">{obj[0].NAUDITORIA}</td>
  //           <td style="padding: 8px; text-align: center;">{obj[0].NAUDITORIA}</td>
  //       </tr>
  // ).join('');
  

  
  const registroAuditoria = (obj).map((row: any) => {
    let entregadoStyle = "";
  
    // Asignación de colores dependiendo del valor de row.entregado
    if (row.entregado === "1") {
      entregadoStyle = "background-color: #00ff00; color: #000;"; // Verde para 1
    } else if (row.entregado === null) {
      entregadoStyle = "background-color: #0000ff; color: #fff;"; // Azul para 2
    } else if (row.entregado === 3) {
      entregadoStyle = "background-color: #ffff00; color: #000;"; // Amarillo para 3
    } else if (row.entregado === 4) {
      entregadoStyle = "background-color: #ffa500; color: #fff;"; // Naranja para 4
    } else if (row.entregado === "0") {
      entregadoStyle = "background-color: #ff0000; color: #fff;"; // Rojo para 0
    } else {
      entregadoStyle = "background-color: #cccccc; color: #000;"; // Gris por defecto para otros valores
    }
  
    return `<tr style="background-color: #f9f9f9; color: #000;">
      <td style="padding: 8px; text-align: center;">${row.anio || ""}</td>
      <td style="padding: 8px; text-align: center;">${row.NAUDITORIA || ""}</td>
      <td style="padding: 8px; text-align: center;">${row.cefDescripcion || ""}</td>
      <td style="padding: 8px; text-align: center;">${row.NombreAudoria || ""}</td>
      <td style="padding: 8px; text-align: center;">${row.ctaDescripcion || ""}</td>
      <td style="padding: 8px; text-align: center;">${row.cmoDescripcion || ""}</td>
      <td style="padding: 8px; text-align: center;">${row.cuaaDescripcion || ""}</td>
      <td style="padding: 8px; text-align: center;"></td>
      <td style="padding: 8px; text-align: center;"></td>
      <td style="padding: 8px; text-align: center;"></td>
      <td style="padding: 8px; text-align: center;"></td>
      <td style="padding: 8px; text-align: center;"></td>
      <td style="padding: 8px; text-align: center;"></td>
      <td style="padding: 8px; text-align: center;"></td>
      <td style="padding: 8px; text-align: center;"></td>
      <td style="padding: 8px; text-align: center;"></td>
      <td style="padding: 8px; text-align: center;"></td>
      <td style="padding: 8px; text-align: center;"></td>
      <td style="padding: 8px; text-align: center;"></td>
      <td style="padding: 8px; text-align: center;"></td>
      <td style="padding: 8px; text-align: center;"></td>
      <td style="padding: 8px; text-align: center;"></td>
      <td style="padding: 8px; text-align: center;"></td>
      <td style="padding: 8px; text-align: center; ${entregadoStyle}">${row.entregado}</td>
    </tr>
`
  }).join('') ;

  useEffect(() => {
    console.log("obj",obj);
    
  }, [
  
  ]);

    return(
      <ModalForm
        title={"Diagnóstico"}
        handleClose={handleClose}
      >
        <div dangerouslySetInnerHTML={{ __html:plantillaHTML.replace("{{RowsAuditorias}}",registroAuditoria) }} />
      </ModalForm>
    );
}
