import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, Typography } from "@mui/material"
import Progress from "../../Progress"
import { useEffect, useState } from "react";
import SelectFrag from "../../componentes/SelectFrag";
import SelectValues from "../../../interfaces/Share";
import { ShareService } from "../../../services/ShareService";

 export const Etapas = ({
    open,
    handleFunction,
    obj,
 }:{
    open:boolean;
    handleFunction: Function;
    obj:any;
 }) => {
    const [openSlider, setOpenSlider] = useState(false);
    const [idEtapa, setIdEtapa] = useState("");
    const [ListIdetapas, setListIdetapas] = useState<SelectValues[]>([]);
    const [show, setShow] = useState(false);
 

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

  useEffect(() => {
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
    ¿Qué etapa desea concluir?
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
        {/* <Button onClick={handleGenerarInforme}>Generar</Button> */}
        
    </DialogActions>
  

</Dialog>)
}