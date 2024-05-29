import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, Switch } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { base64ToArrayBuffer } from "../../helpers/Files";
import Progress from "../Progress";

export default function ReporteAuditoriaF ({
open,
handleFunction,
obj,
}:{
open:boolean;
handleFunction: Function;
obj:any;
}) {
    const [openSlider, setOpenSlider] = useState(false);
    const [switchValue, setSwitchValue] = useState(false);
    const handleChange = (event: any) => {
      setSwitchValue(event.target.checked);
    };

    const handleGenerarInforme = () => {
        setOpenSlider(true);
        let data = {
          CHID: obj.row.id,
          Fechas: switchValue,

        };

        try {
          let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: process.env.REACT_APP_APPLICATION_BASE_URL + "handleReport",
            headers: {
              "Content-Type": "application/json",
              responseType: "blob",
            },
            data: data,
          };
            

          axios
            .request(config)
            .then((response) => {
              var bufferArray = base64ToArrayBuffer(
                String(response.data.RESPONSE.response64)
              );
              var blobStore = new Blob([bufferArray], {
                type: "application/*",
              });
              const link = document.createElement("a");
              link.href = window.URL.createObjectURL(blobStore);
              link.download =
                obj.row.NAUDITORIA + "." + response.data.RESPONSE.extencion;
              link.click();
              setOpenSlider(false);
            })
            .catch((error) => {
              console.log(error);
              setOpenSlider(false);
            });
        } catch (err: any) {
          setOpenSlider(false);
          console.log(err);
        }
      };
      useEffect((
      ) =>{
        console.log("obj",obj);
        
      },[""])
return (
    <Dialog
        open={open}
        PaperProps={{
        component: "form",
        }}>
          <Progress open= {openSlider} />
        <DialogTitle>
        Descargar Informe
        </DialogTitle>
        <DialogContent>
        <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="agregarFecha"
                    control={
                      <Switch
                        color="primary" 
                        checked={switchValue}
                        onChange={handleChange}
                      />
                    }
                    label="Agregar fecha de vencimiento y prórroga"
                    labelPlacement="end"
                    //disabled={Entregado === "1" || visualizar === true}
                  />
                </FormGroup>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => handleFunction()}>Cancelar</Button>
            <Button onClick={handleGenerarInforme}>Generar</Button>
        </DialogActions>
      

    </Dialog>
    );
}