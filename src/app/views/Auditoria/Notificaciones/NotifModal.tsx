import { Box, Button, Grid, TextField, Typography } from "@mui/material";
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
import { log } from "console";

export const NotifModal = ({
  handleClose,
  tipo,
  dt,
  user,
  idAuditoria,
}: {
  tipo: number;
  handleClose: Function;
  dt: any;
  user: USUARIORESPONSE;
  idAuditoria: string;
}) => {
  // CAMPOS DE LOS FORMULARIOS
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [Prorroga, setProrroga] = useState<Dayjs | null>();
  const [Oficio, setOficio] = useState("");
  const [SIGAOficio, setSIGAOficio] = useState("");
  const [FOficio, setFechaOficio] = useState<Dayjs | null>();
  const [FRecibido, setFRecibido] = useState<Dayjs | null>();
  const [FVencimiento, setFVencimiento] = useState<Dayjs | null>();
  const [idsecretaria, setidsecretaria] = useState("");
  const [idunidad, setidunidad] = useState("");
  const [ListSecretarias, setListSecretarias] = useState<SelectValues[]>([]);
  const [ListUnidades, setListUnidades] = useState<SelectValues[]>([]);
  const [APE, setAPE] = useState("");
  const [ListAPE, setListAPE] = useState<SelectValues[]>([]);

  const handleRequestFOficio = () => {
    let data = {
      NUMOPERACION: 5,
      Oficio: Oficio,
    };

    if (tipo === 1) {
      AuditoriaService.Notificacionindex(data).then((res) => {
        if(res.RESPONSE.length!==0){
          Swal.fire({
          icon: "info",
          title: ' Ya existe una fecha para este Oficio '+ res.RESPONSE[0].Fecha+ ' , ¿deseas guardarla a este registro?',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "Confirmar",
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            handleSend(res.RESPONSE[0].Fecha)
          
          } else if (result.isDenied) {
            handleSend()
          }
        });
        }else{
          handleSend()
        }
        
        
      }).catch((e)=>{console.log("e",e);
      });
    }

  };


  

  const handleSend = (fOficio?:string) => {
    if (!Oficio) {
      Swal.fire("Favor de Completar los Campos", "¡Error!", "info");
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.Id,
        idAuditoria: idAuditoria,
        Prorroga: Prorroga,
        Oficio: Oficio,
        SIGAOficio: SIGAOficio,
        FOficio: fOficio||FOficio,
        FRecibido: FRecibido,
        FVencimiento: FVencimiento,
        idsecretaria: idsecretaria,
        idunidad: idunidad,
      };
      handleRequest(data);
    }
  };

  const handleRequest = (data: any) => {
    if (tipo === 1) {
      AuditoriaService.Notificacionindex(data).then((res) => {
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "¡Registro Agregado!",
          });
          handleClose();
        } else {
          Swal.fire(res.STRMESSAGE, "¡Error!", "info");
        }
      });
    } else if (tipo === 2) {
      AuditoriaService.Notificacionindex(data).then((res) => {
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "¡Registro Editado!",
          });
          handleClose();
        } else {
          Swal.fire(res.STRMESSAGE, "¡Error!", "info");
        }
      });
    }
  };

  const handleFilterChange1 = (v: string) => {
    setidsecretaria(v);
    loadFilter(20, v);
  };

  const handleFilterChange2 = (v: string) => {
    setidunidad(v);
  };

  const handleFilterChangefo = (v: any) => {
    setFechaOficio(v);
  };

  const handleFilterChangefr = (v: any) => {
    setFRecibido(v);
  };

  const handleFilterChangefv = (v: any) => {
    console.log("entre ls fincion");

    setFVencimiento(v);
  };

  const handleFilterChangep = (v: any) => {
    setProrroga(v);
  };

  const handleFilterAPE = (v: any) => {
    setAPE(v);
  };

  const loadFilter = (operacion: number, P_ID?: string) => {
    setShow(true);
    let data = { NUMOPERACION: operacion, P_ID: P_ID };
    ShareService.SelectIndex(data).then((res) => {
      if (operacion === 19) {
        setListSecretarias(res.RESPONSE);
        setShow(false);
      } else if (operacion === 20) {
        setListUnidades(res.RESPONSE);
        setShow(false);
      } else if (operacion === 6) {
        setListAPE(res.RESPONSE);
        setShow(false);
      }
    });
  };

  useEffect(() => {
    console.log("FOficio",FOficio);
    console.log("FOficio");
    console.log("dt",dt);

    loadFilter(11);
    loadFilter(19);
    loadFilter(6);

    if (Object.keys(dt).length === 0) {
    } else {      
      setId(dt?.row?.id);
      setOficio(dt?.row?.Oficio);
      setSIGAOficio(dt?.row?.SIGAOficio);
      handleFilterChange1(dt?.row?.secid);
      setidunidad(dt?.row?.uniid);
      if (FRecibido !== null) {
        setFRecibido(dayjs(dt?.row?.FRecibido));
      }
      if (FVencimiento !== null) {
        setFVencimiento(dayjs(dt?.row?.FVencimiento));
      }
      if (FOficio !== null) {
              setFechaOficio(dayjs(dt?.row?.FOficio));
      }
      if (Prorroga !== null) {
        setProrroga(dayjs(dt?.row?.Prorroga));
      }
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
            <Typography sx={{ fontFamily: "sans-serif" }}>
            Administración Pública del Estado APE:
              </Typography>
              <SelectFrag
                value={APE}
                options={ListAPE}
                onInputChange={handleFilterAPE}
                placeholder={"Seleccione...."}
                disabled={true}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              
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
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Secretaría:
              </Typography>
              <SelectFrag
                value={idsecretaria}
                options={ListSecretarias}
                onInputChange={handleFilterChange1}
                placeholder={"Seleccione..."}
                disabled={false}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Unidad Administrativa:
              </Typography>
              <SelectFrag
                value={idunidad}
                options={ListUnidades}
                onInputChange={handleFilterChange2}
                placeholder={"Seleccione..."}
                disabled={false}
              />
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
              <CustomizedDate
                value={FOficio}
                label={"Fecha Oficio"}
                onchange={handleFilterChangefo}
                disabled={false}

              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <CustomizedDate
                value={FRecibido}
                label={"Fecha Recibido"}
                onchange={handleFilterChangefr}
                disabled={false}

              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <CustomizedDate
                value={FVencimiento}
                label={"Fecha Vencimiento"}
                onchange={handleFilterChangefv}
                disabled={false}

              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <CustomizedDate
                value={Prorroga}
                label={"Prorroga"}
                onchange={handleFilterChangep}
                disabled={false}

              />
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
            <Grid item alignItems="center" justifyContent="flex-end" xs={6} paddingRight={1} sx={{display:"flex"}}>
              <Button
                // disabled={descripcion === "" || nombre === ""}
                className={tipo === 1 ? "guardar" : "actualizar"}
                onClick={() => handleRequestFOficio()}
              >
                {tipo === 1 ? "Agregar" : "Editar"}
              </Button>
            </Grid>
            <Grid item alignItems="center" justifyContent="flex-start" xs={6} paddingLeft={1} sx={{display:"flex"}}>
              <Button
                // disabled={descripcion === "" || nombre === ""}
                className={"actualizar"}
                onClick={() => handleClose()}
              >
                {"Salir"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </ModalForm>
    </>
  );
};
