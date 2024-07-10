import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, Typography } from "@mui/material"
import Progress from "../../Progress"
import { useEffect, useState } from "react";
import SelectFrag from "../../componentes/SelectFrag";
import SelectValues from "../../../interfaces/Share";
import { ShareService } from "../../../services/ShareService";
import axios from "axios";
import { USUARIORESPONSE } from "../../../interfaces/UserInfo";
import { getUser } from "../../../services/localStorage";
import { AuditoriaService } from "../../../services/AuditoriaService";
import { Toast } from "../../../helpers/Toast";
import Swal from "sweetalert2";

 export const Etapas = ({
    open,
    handleFunction,
    obj,
    tipo,

 }:{
    open:boolean;
    handleFunction: Function;
    obj:any;
    tipo: number;

 }) => {
    const [openSlider, setOpenSlider] = useState(false);
    const [idEtapa, setIdEtapa] = useState("");
    const [ListIdetapas, setListIdetapas] = useState<SelectValues[]>([]);
    const [show, setShow] = useState(false);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

 

    const handleFilterEtapas = (v: string) => {
        setIdEtapa(v);
      };



    const loadFilter = (operacion: number, P_ID?: string) => {
    setShow(true);
    let data = { NUMOPERACION: operacion, P_ID: P_ID };
    ShareService.SelectIndex(data).then((res) => {
      if (operacion === 31) {
        setListIdetapas(res.RESPONSE);
        setShow(false);
      } 
    });
    };

    const handleConcluir = () => {
      setOpenSlider(true);
        let data = {
        NUMOPERACION: tipo ===1? 5:6,
        //CHID: obj.row.id,
        CHUSER: user.Id,
        IDETAPA: idEtapa,
      };
      AuditoriaService.OficiosA_index(data).then((res) => {
        if (res.SUCCESS) {
          setOpenSlider(false);

          Toast.fire({
            icon: "success",
            title: tipo ===1?"¡Etapa Concluida!":"¡Etapa Habilitada!",
          });
          handleFunction()
        } else {
          Swal.fire(res.STRMESSAGE, "¡Error!", "info");
        }
      })
    };



  useEffect(() => {
    console.log("tipo",tipo);
    
    loadFilter(31)
    
  }, []);


    

return(<Dialog
    open={open}
    PaperProps={{
    component: "form",
   
    }} 
    fullWidth
    sx={{
        "& .MuiDialog-container": {
          alignItems: "center",
          justifyContent: "center",
        },
        "& .MuiPaper-root": {
          width: "30%", // Ocupa el 98% del ancho disponible
          height: "58%", // Ocupa el 98% de la altura disponible
          margin: 0,
        },
      }}
      >
        
      <Progress open= {openSlider} />
    <DialogTitle>
    {tipo===1?"¿Qué etapa desea concluir?":"¿Qué etapa desea habilitar?"} 
    </DialogTitle>
    <DialogContent>
    <FormGroup aria-label="position" row>
    <Typography sx={{ fontFamily: "sans-serif" }}>
                Etapa:
              </Typography>
              <SelectFrag
                value={idEtapa}
                options={ListIdetapas}
                onInputChange={handleFilterEtapas}
                placeholder={"Seleccione..."}
                disabled={false}
              />
            </FormGroup>
    </DialogContent>
    <DialogActions>
        <Button onClick={() => handleFunction()}>Cancelar</Button>
        <Button onClick={handleConcluir}>{tipo===1 ? "Concluir" : "Habilitar"} </Button>
        
    </DialogActions>
  

</Dialog>)
}