import { Box, Button, FormControlLabel, FormGroup, Grid, Switch, TextField, Typography } from "@mui/material";
import CustomizedDate from "../../componentes/CustomizedDate";
import SelectFrag from "../../componentes/SelectFrag";
import { PERMISO, USUARIORESPONSE } from "../../../interfaces/UserInfo";
import ModalForm from "../../componentes/ModalForm";
import Progress from "../../Progress";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import SelectValues from "../../../interfaces/Share";
import { getPermisos } from "../../../services/localStorage";
import { AuditoriaService } from "../../../services/AuditoriaService";
import Swal from "sweetalert2";
import { Toast } from "../../../helpers/Toast";
import { ShareService } from "../../../services/ShareService";

export const DocsExtrasModal = ({
    handleClose,
    tipo,
    dt,
    user,
    idRelacion,
    destino,
    Entregado,
  }: {
    tipo: number;
    handleClose: Function;
    dt: any;
    user: USUARIORESPONSE;
    idRelacion: string;
    destino: string;
    Entregado: any;
  })=>{

const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [Prorroga, setProrroga] = useState<Dayjs | null>(
    dt?.row?.Prorroga !== undefined && dt?.row?.Prorroga !== null
      ? dayjs(dt?.row?.Prorroga)
      : null
  );
  const [Oficio, setOficio] = useState("");
  const [SIGAOficio, setSIGAOficio] = useState("");
  const [FOficio, setFechaOficio] = useState<Dayjs | null>();
  const [FRecibido, setFRecibido] = useState<Dayjs | null>();
  const [FVencimiento, setFVencimiento] = useState<Dayjs | null>(
    dt?.row?.FVencimiento !== undefined && dt?.row?.FVencimiento !== null
      ? dayjs(dt?.row?.FVencimiento)
      : null
  );
  const [idTipoDocumento, setIdTipoDocumento] = useState("");
  const [ListTipoDocumento, setListTipoDocumento] = useState<SelectValues[]>([]);
  const [editarPermiso, setEditarPermiso] = useState<boolean>(false);
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [visualizar, setVisualizar] = useState<boolean>(false);
  //const [switchValue, setSwitchValue] = useState(false);
  const [observacion	, setObservacion] = useState("");
  const [idEstatus, setIdEstatus] = useState("");
  const [ListEstatus, setListEstatus] = useState<SelectValues[]>([]);

//   const handleChange = (event: any) => {
//     setSwitchValue(event.target.checked);
//   };


  const handleRequestFOficio = () => {
    let data = {
      NUMOPERACION: 5,
      Oficio: Oficio,
    };

    if (tipo === 1) {
      AuditoriaService.DocsExtras_index(data)
        .then((res) => {
          if (res.RESPONSE.length !== 0) {
            Swal.fire({
              icon: "info",
              title:
                " Ya existe una fecha para este Oficio " +
                res.RESPONSE[0].Fecha +
                " , ¿deseas guardarla a este registro?",
              showDenyButton: true,
              showCancelButton: false,
              confirmButtonText: "Confirmar",
              denyButtonText: `No tomar fecha existente`,
            }).then((result) => {
              if (result.isConfirmed) {
                handleSend(res.RESPONSE[0].Fecha);
              } else if (result.isDenied) {
                handleSend();
              }
            });
          } else {
            handleSend();
          }
        })
        .catch((e) => {});
    } else if (tipo === 2) {
      handleSend();
    }
  
  };


    const handleSend = (fOficio?: string) => {
        if (!Oficio) {
          Swal.fire("Favor de Completar los Campos", "¡Error!", "info");
        } else {

          if (Prorroga){
            if (Prorroga.isAfter(FVencimiento)){
            Swal.fire("¡Rango de fechas no válido!");
            }else{
              let data = {};
          data = {
            NUMOPERACION: tipo,
            CHID: id,
            CHUSER: user.Id,
            Oficio: Oficio,
            Prorroga: Prorroga ? dayjs(Prorroga).format('YYYY-MM-DD HH:mm:ss') : null,
            FVencimiento: FVencimiento ? dayjs(FVencimiento).format('YYYY-MM-DD HH:mm:ss') : null, 
            idRelacion: idRelacion,
            TipoDoc: idTipoDocumento,
            Estatus: idEstatus,
            

          };
    
          handleRequest(data);
            }
            
          }

          
        }
      };

    const handleRequest = (data: any) => {
        if (tipo === 1) {
          AuditoriaService.DocsExtras_index(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "¡Registro Agregado!",
              });
              //handleOficioBlur();
              handleClose();
            } else {
              Swal.fire(res.STRMESSAGE, "¡Error!", "info");
            }
          });
        } else if (tipo === 2) {
          AuditoriaService.DocsExtras_index(data).then((res) => {
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
    

    
      
    
      const handleFilterChangefo = (v: any) => {
        setFechaOficio(v);
      };
    
      const handleFilterChangeTipoDocumento = (v: any) => {
        setIdTipoDocumento(v);
      };

      const handleFilterChangeEstatus = (v: any) => {
        setIdEstatus(v);
      };
    
      const handleFilterChangefv = (v: any) => {
        setFVencimiento(v);
      };
    
      const handleFilterChangep = (v: any) => {
        setProrroga(v);
      };

    const loadFilter = (operacion: number, P_ID?: string) => {
        setShow(true);
        let data = { NUMOPERACION: operacion, P_ID: P_ID };
        ShareService.SelectIndex(data).then((res) => {
          if (operacion === 11) {
            setListTipoDocumento(res.RESPONSE);
            setShow(false);
          } 
          if (operacion === 32) {
            setListEstatus(res.RESPONSE);
            setShow(false);
          } 
        });
      };


    useEffect(() => {
      console.log("Entregado",Entregado);
      console.log("dt",dt);
      console.log("idRelacion",idRelacion);
      
      
      
        loadFilter(11);
        loadFilter(32);

        
    
        if (Object.keys(dt).length === 0) {
        } else {
          setId(dt?.row?.id);
          setSIGAOficio(dt?.row?.SIGAOficio);
          setOficio(dt?.row?.Oficio);
          setObservacion(dt?.row?.Observacion);

          handleFilterChangeTipoDocumento(dt?.row?.TipoDoc);
          handleFilterChangeEstatus(dt?.row?.Estatus);

          if (FRecibido !== null) {
            setFRecibido(dayjs(dt?.row?.FRecibido,'DD-MM-YYYY'));
          }
          if (FVencimiento !== null && FVencimiento !== undefined) {
            setFVencimiento(dayjs(dt?.row?.FVencimiento,'DD-MM-YYYY'));
            //setSwitchValue(true);
          }
          if (FOficio !== null) {
            setFechaOficio(dayjs(dt?.row?.FOficio,'DD-MM-YYYY'));
          }
          if (Prorroga !== null && Prorroga !== undefined) {
            setProrroga(dayjs(dt?.row?.Prorroga,'DD-MM-YYYY'));
            //setSwitchValue(true);
          }
        }
      }, [dt]);

    useEffect(() => {
        permisos.map((item: PERMISO) => {
          if (String(item.menu) === "AUDITOR") {
            if (String(item.ControlInterno) === "VISUALDATOS") {
              setVisualizar(true);
            }
            if (String(item.ControlInterno) === "EDIT") {
              setEditarPermiso(true);
            }
          }
        });
      }, []);

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
            sx={{ padding: "2%" }}
          >
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Tipo de Documento:
              </Typography>
              <SelectFrag
                value={idTipoDocumento}
                options={ListTipoDocumento}
                onInputChange={handleFilterChangeTipoDocumento}
                placeholder={"Seleccione..."}
                disabled={Entregado === 1 || visualizar === true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography sx={{ fontFamily: "sans-serif" }}>
                Estatus:
              </Typography>
              <SelectFrag
                value={idEstatus}
                options={ListEstatus}
                onInputChange={handleFilterChangeEstatus}
                placeholder={"Seleccione..."}
                disabled={Entregado === 1 || visualizar === true}
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
                disabled={Entregado === 1 || visualizar === true}
              />
                
                </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                
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
                  value={Prorroga}
                  label={"Prórroga"}
                  onchange={handleFilterChangep}
                  disabled={Entregado === 1 || visualizar === true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <CustomizedDate
                  value={FVencimiento}
                  label={"Fecha Vencmiento"}
                  onchange={handleFilterChangefv}
                  disabled={Entregado === 1 || visualizar === true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
              
              </Grid>
            </Grid>

          {Entregado !== 1 && editarPermiso === true ? (
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
              <Grid
                item
                alignItems="end"
                justifyContent="flex-start"
                xs={3}
                paddingLeft={1}
                sx={{ display: "flex" }}
              ></Grid>
              <Grid
                item
                alignItems="center"
                justifyContent="flex-end"
                xs={3}
                paddingRight={1}
                sx={{ display: "flex" }}
              >
                <Button
                  // disabled={descripcion === "" || nombre === ""}
                  className={tipo === 1 ? "guardar" : "actualizar"}
                  onClick={() => handleRequestFOficio()}
                >
                  {tipo === 1 ? "Agregar" : "Editar"}
                </Button>
              </Grid>
              <Grid
                item
                alignItems="center"
                justifyContent="flex-start"
                xs={3}
                paddingLeft={1}
                sx={{ display: "flex" }}
              >
                <Button
                  // disabled={descripcion === "" || nombre === ""}
                  className={"actualizar"}
                  onClick={() => handleClose()}
                >
                  {"Salir"}
                </Button>
              </Grid>

              <Grid
                item
                alignItems="end"
                justifyContent="flex-start"
                xs={3}
                paddingLeft={1}
                sx={{ display: "flex" }}
              >
                
              </Grid>
            </Grid>
          ) : (
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
              <Grid
                item
                alignItems="center"
                justifyContent="center"
                xs={4}
                sx={{ display: "flex" }}
              ></Grid>
              <Grid
                item
                alignItems="center"
                justifyContent="center"
                xs={4}
                sx={{ display: "flex" }}
              >
                <Button
                  // disabled={descripcion === "" || nombre === ""}
                  className={"actualizar"}
                  onClick={() => handleClose()}
                >
                  {"Salir"}
                </Button>
              </Grid>
              <Grid
                item
                alignItems="center"
                justifyContent="center"
                xs={4}
                sx={{ display: "flex" }}
              >
             
              </Grid>
            </Grid>
          )}
        </Box>
      </ModalForm>
    </>
  );

}