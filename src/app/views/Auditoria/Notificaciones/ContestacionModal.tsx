import {
  Box,
  Button,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Toast } from "../../../helpers/Toast";
import SelectValues from "../../../interfaces/Share";
import { USUARIORESPONSE } from "../../../interfaces/UserInfo";
import { AuditoriaService } from "../../../services/AuditoriaService";
import { ShareService } from "../../../services/ShareService";
import Progress from "../../Progress";
import ModalForm from "../../componentes/ModalForm";
import SelectFrag from "../../componentes/SelectFrag";
import dayjs, { Dayjs } from "dayjs";
import CustomizedDate from "../../componentes/CustomizedDate";

export const ContestacionModal = ({
  handleClose,
  tipo,
  dt,
  user,
  idNotificacion

}: {
  tipo: number;
  handleClose: Function;
  dt: any;
  user: USUARIORESPONSE ;
  idNotificacion:string

}) => {
  // CAMPOS DE LOS FORMULARIOS
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [Dependencia, setDependencia] = useState("");
  const [Prorroga, setProrroga] = useState<Dayjs | null>();
  const [Oficio, setOficio] = useState("");
  const [SIGAOficio, setSIGAOficio] = useState("");
  const [FOficio, setFechaOficio] = useState<Dayjs | null>();

  const [ListDependencia, setListDependencia] = useState<SelectValues[]>([]);


  const handleSend = () => {
    if (!Dependencia  ||!Oficio) {
      Swal.fire("Favor de Completar los Campos",  "¡Error!", "info");
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.Id,
        idNotificacion:idNotificacion,
        Dependencia:Dependencia,
        Prorroga:Prorroga,
        Oficio:Oficio,
        SIGAOficio:SIGAOficio,
        FOficio:FOficio,
      };

      handleRequest(data);
      
    }
  };

  const handleRequest = (data: any) => {
    if (tipo === 1) {
      AuditoriaService.Contestacionindex(data).then((res) => {
        console.log(res);

        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "¡Registro Agregado!",
          });
          
          handleClose();
          
        } else {
          Swal.fire(res.STRMESSAGE,  "¡Error!", "info");
        }
      });
    } else if (tipo === 2) {
      AuditoriaService.Contestacionindex(data).then((res) => {
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "¡Registro Editado!",
          });
          handleClose();
        } else {
          Swal.fire(res.STRMESSAGE,  "¡Error!", "info");
        }
      });
    }
  };

  const handleFilterChange1 = (v: string) => {
    setDependencia(v);
  };
  const loadFilter = (operacion: number) => {
    setShow(true);
    let data = { NUMOPERACION: operacion };
    ShareService.SelectIndex(data).then((res) => {
      if (operacion === 11) {
        setListDependencia(res.RESPONSE);
        setShow(false);
        
      } 
    });
  };

  const handleFilterChange2 = (v: any) => {
    setProrroga(v)
    console.log(v);
  };

  const handleFilterChange3 = (v: any) => {
    setFechaOficio(v)
    console.log(v);
  };

  useEffect(() => {
    loadFilter(11);
    if (dt === "") {
    } else { 
      setId(dt?.row?.id);
      setDependencia(dt?.row?.Dependencia);
      setProrroga(dayjs(dt?.row?.Prorroga));
      setOficio(dt?.row?.Oficio);
      setSIGAOficio(dt?.row?.SIGAOficio);
      setFechaOficio(dayjs(dt?.row?.FOficio) );
    } 
  }, [dt]);

  return (


    <>
      <ModalForm title={tipo === 1 ? "Agregar Registro" : "Editar Registro"} handleClose={handleClose} >
      <Progress open={show}></Progress>
        <Box boxShadow={3}>
         
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
            sx={{ padding: "2%" }}
          >
            <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography sx={{ fontFamily: "sans-serif" }}>Dependencia:</Typography>
              <SelectFrag
                value={Dependencia}
                options={ListDependencia}
                onInputChange={handleFilterChange1}
                placeholder={"Seleccione Dependencia"}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomizedDate value={Prorroga} label={"Prorroga"} onchange={handleFilterChange2}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>  

            <TextField
                        margin="dense"
                        id="Oficio"
                        label="Oficio"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={Oficio}
                        required
                        error={!Oficio}
                        onChange={(v) => setOficio(v.target.value)}
                    />

             
              </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>  
            <TextField
                        margin="dense"
                        id="FolioSIGA"
                        label="Folio SIGA"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={SIGAOficio}
                        required
                        error={!SIGAOficio}
                        onChange={(v) => setSIGAOficio(v.target.value)}
                    />
              </Grid>

             

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
            sx={{ padding: "2%" }}
          >
            <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomizedDate value={FOficio} label={"Fecha Oficio"} onchange={handleFilterChange3}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
          


             </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>  

          

             
              </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                </Grid>
           
             
          
          

          </Grid>
       






          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{ padding: "2%" }}
          >
          

            <Grid item alignItems="center" justifyContent="center" xs={2}>
              <Button
                // disabled={descripcion === "" || nombre === ""}
                className={tipo === 1 ? "guardar" : "actualizar"}
                onClick={() => handleSend()}
              >
                {tipo === 1 ? "Agregar" : "Editar"}
              </Button>
            </Grid>
          </Grid>
       
       
       
        </Box>
      </ModalForm>
    </>
  );

};
