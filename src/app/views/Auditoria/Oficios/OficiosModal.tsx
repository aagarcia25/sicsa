import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Toast } from "../../../helpers/Toast";
import { USUARIORESPONSE } from "../../../interfaces/UserInfo";
import { AuditoriaService } from "../../../services/AuditoriaService";
import { getUser } from "../../../services/localStorage";
import Progress from "../../Progress";
import CustomizedDate from "../../componentes/CustomizedDate";
import ModalForm from "../../componentes/ModalForm";

export const OficiosModal = ({
  handleClose,
  tipo,
  dt,
  idauditoria
}: {
  tipo: number;
  handleClose: Function;
  dt: any;
  idauditoria:string;
}) => {
  
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [show, setShow] = useState(false);
  // CAMPOS DE LOS FORMULARIOS
  const [id, setId] = useState("");
  const [finicio, setFinicio] =useState<Dayjs | null>();
  const [ffin, setFfin] = useState<Dayjs | null>();
  const [oficio, setOficio] = useState("");

  const handleSend = () => {
     if (!oficio || !finicio || !ffin) {
       Swal.fire("Favor de Completar los Campos",  "¡Error!", "info");
     } else {
    let data = {
      CHID:id,
      NUMOPERACION: tipo,
      CHUSER: user.Id,
      idAuditoria:idauditoria,
      Oficio:oficio,
      FechaRecibido:finicio,
      FechaVencimiento:ffin
    };

    if (tipo === 1) {
      //AGREGAR
      agregar(data);
    } else if (tipo === 2) {
      //EDITAR
      editar(data);
    }
  }
  };

  const handleFilterChange1 = (v: any) => {
    setFinicio(v)
  };

  const handleFilterChange2 = (v: any) => {
    setFfin(v)
  };


  const agregar = (data: any) => {
    AuditoriaService.OficiosA_index(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Registro Agregado!",
        });
      } else {
        Swal.fire(res.STRMESSAGE, "¡Error!", "info");
      }
    });
  };

  const editar = (data: any) => {
    AuditoriaService.OficiosA_index(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Registro Editado!",
        });
      } else {
        Swal.fire(res.STRMESSAGE, "¡Error!", "info");
      }
    });
  };

  useEffect(() => {
     if (dt === "") {
     } else {
       setId(dt?.data?.row?.id);
       setOficio(dt?.data?.row?.Oficio);
       setFinicio(dayjs(dt?.data?.row?.FechaRecibido) );
       setFfin(dayjs(dt?.data?.row?.FechaVencimiento) );
      
     }
  }, [dt]);


  return (
    <>
      <ModalForm
        title={tipo === 1 ? "Agregar Registro" : "Editar Registro"}
        handleClose={handleClose}
      >
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
            sx={{ padding: "1%" }}
          >
            <Grid item xs={12} sm={6} md={4} lg={3}>
             <Typography sx={{ fontFamily: "sans-serif" }}>Oficio</Typography>
              <TextField
                required
                margin="dense"
                id="oficio"
                label=""
                value={oficio}
                type="text"
                fullWidth
                focused 
                onChange={(v) => setOficio(v.target.value)}
                error={oficio === "" ? true : false}
                // InputProps={{
                //   readOnly: tipo === 1 ? false : true,
                // }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
            <CustomizedDate value={finicio} label={"Fecha Recibido"} onchange={handleFilterChange1}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2} >
            <CustomizedDate value={ffin} label={"Fecha Vencimiento"} onchange={handleFilterChange2}/>
             
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
           
            </Grid>
          </Grid>

          {/* <Grid
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
        
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
           
              
             </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>  


             
              </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>  
         
              </Grid>
          </Grid> */}

          {/* <Grid
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
            <Typography sx={{ fontFamily: "sans-serif" }}>Sector:</Typography>
              <SelectFrag
                value={idSector}
                options={CatSector}
                onInputChange={handleFilterChange3}
                placeholder={"Seleccione Sector"}
                disabled={false}
              />
            
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography sx={{ fontFamily: "sans-serif" }}>Entidad Fiscalizada:</Typography>
              <SelectFrag
                value={idEntidadFiscalizada}
                options={CatEntidadFiscalizada}
                onInputChange={handleFilterChange4}
                placeholder={"Seleccione entidad Fiscalizada"}
                disabled={false}
              />
              
             </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>  
            <Typography sx={{ fontFamily: "sans-serif" }}>Tipo de Auditoria:</Typography>
              <SelectFrag
                value={idTipoAuditoria}
                options={CatTipoAuditoria}
                onInputChange={handleFilterChange2}
                placeholder={"Seleccione Tipo de Auditoria"}
                disabled={false}
              />
             
              </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>  
            <Typography sx={{ fontFamily: "sans-serif" }}>Entrega:</Typography>
              <SelectFrag
                value={idInforme}
                options={CatInforme}
                onInputChange={handleFilterChange1}
                placeholder={"Seleccione Entrega"}
                disabled={false}
              />
              </Grid>
          </Grid> */}

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
            <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
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
                disabled={oficio === "" || finicio === null || ffin === null }
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
