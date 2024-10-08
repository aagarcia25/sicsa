import { Box, Button, FormControlLabel, FormGroup, Grid, Switch, TextField, Typography } from "@mui/material";
import CustomizedDate from "../../componentes/CustomizedDate";
import SelectFrag from "../../componentes/SelectFrag";
import ModalForm from "../../componentes/ModalForm";
import Progress from "../../Progress";
import { useEffect, useState } from "react";
import { PERMISO, USUARIORESPONSE } from "../../../interfaces/UserInfo";
import { AuditoriaService } from "../../../services/AuditoriaService";
import Swal from "sweetalert2";
import { Toast } from "../../../helpers/Toast";
import dayjs, { Dayjs } from "dayjs";
import SelectValues from "../../../interfaces/Share";
import { getPermisos } from "../../../services/localStorage";
import { ShareService } from "../../../services/ShareService";

export const OficiosContestacionModal = ({
    handleClose,
    tipo,
    dt,
    user,
    idNotificacion,
    destino,
    Entregado,
  }: {
    tipo: number;
    handleClose: Function;
    dt: any;
    user: USUARIORESPONSE;
    idNotificacion: string;
    destino: string;
    Entregado: any;
  }) => {

    // CAMPOS DE LOS FORMULARIOS
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  ///fecha de vencimiento y prorroga////
  // const [Prorroga, setProrroga] = useState<Dayjs | null>(
  //   dt?.row?.Prorroga !== undefined && dt?.row?.Prorroga !== null
  //     ? dayjs(dt?.row?.Prorroga)
  //     : null
  // );
  const [Oficio, setOficio] = useState("");
  //const [SIGAOficio, setSIGAOficio] = useState("");
  const [FOficio, setFechaOficio] = useState<Dayjs | null>();
  const [FRecibido, setFRecibido] = useState<Dayjs | null>();
  ///fecha de vencimiento y prorroga////
  // const [FVencimiento, setFVencimiento] = useState<Dayjs | null>(
  //   dt?.row?.FVencimiento !== undefined && dt?.row?.FVencimiento !== null
  //     ? dayjs(dt?.row?.FVencimiento)
  //     : null
  // );
  const [idsecretaria, setidsecretaria] = useState("");
  const [idunidad, setidunidad] = useState("");
  const [ListSecretarias, setListSecretarias] = useState<SelectValues[]>([]);
  const [ListUnidades, setListUnidades] = useState<SelectValues[]>([]);
  const [editarPermiso, setEditarPermiso] = useState<boolean>(false);
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [visualizar, setVisualizar] = useState<boolean>(false);
  //const [switchValue, setSwitchValue] = useState(false);///fecha de vencimiento y prorroga////
  const [observacion	, setObservacion] = useState("");

  ///fecha de vencimiento y prorroga////
  // const handleChange = (event: any) => {
  //   setSwitchValue(event.target.checked);
  // };


  const handleRequestFOficio = () => {
    let data = {
      NUMOPERACION: 5,
      Oficio: Oficio,
    };

    if (tipo === 1) {
      AuditoriaService.Notificacionindex(data)
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
          let data = {};
          data = {
            NUMOPERACION: tipo,
            CHID: id,
            CHUSER: user.Id,
            idNotificacion: idNotificacion,
            Oficio: Oficio,
            //SIGAOficio: SIGAOficio,
            FOficio: fOficio || FOficio,
            FRecibido: FRecibido,
            idsecretaria: idsecretaria,
            idunidad: idunidad,
            idOficio: idNotificacion,
            Observacion: observacion,

          };
          ///fecha de vencimiento y prorroga////
          // if (switchValue === true) {
          //   data = { ...data, FVencimiento: FVencimiento, Prorroga: Prorroga };
          // }
    
          handleRequest(data);
        }
      };

    const handleRequest = (data: any) => {
        if (tipo === 1) {
          AuditoriaService.OficiosContestacon_index(data).then((res) => {
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
          AuditoriaService.OficiosContestacon_index(data).then((res) => {
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

    ///fecha de vencimiento y prorroga////
      // const handleFilterChangefv = (v: any) => {
      //   setFVencimiento(v);
      // };
    
      // const handleFilterChangep = (v: any) => {
      //   setProrroga(v);
      // };

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
          }
        });
      };

    useEffect(() => {
      console.log("Entregado",Entregado);
      
        loadFilter(19);
        
    
        if (Object.keys(dt).length === 0) {
        } else {
          setId(dt?.row?.id);
          ///fecha de vencimiento y prorroga////
          //setSIGAOficio(dt?.row?.SIGAOficio);
          setOficio(dt?.row?.Oficio);
          setObservacion(dt?.row?.Observacion);

          handleFilterChange1(dt?.row?.secid);
          setidunidad(dt?.row?.cuid);
          if (FRecibido !== null) {
            setFRecibido(dayjs(dt?.row?.FRecibido,'DD-MM-YYYY'));
          }
          if (FOficio !== null) {
            setFechaOficio(dayjs(dt?.row?.FOficio,'DD-MM-YYYY'));
          }
          ///fecha de vencimiento y prorroga////
          // if (FVencimiento !== null && FVencimiento !== undefined) {
          //   setFVencimiento(dayjs(dt?.row?.FVencimiento,'DD-MM-YYYY'));
          //   setSwitchValue(true);
          // }
          // if (Prorroga !== null && Prorroga !== undefined) {
          //   setProrroga(dayjs(dt?.row?.Prorroga,'DD-MM-YYYY'));
          //   setSwitchValue(true);
          // }
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

      }, [
        //switchValue ///fecha de vencimiento y prorroga////
      ]);

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
                    Secretaría:
                  </Typography>
                  <SelectFrag
                    value={idsecretaria}
                    options={ListSecretarias}
                    onInputChange={handleFilterChange1}
                    placeholder={"Seleccione..."}
                    disabled={Entregado === 1 || visualizar === true}
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
                    disabled={Entregado === 1 || visualizar === true}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  {/* <Typography sx={{ fontFamily: "sans-serif" }}>Observación</Typography> */}

                  <TextField
                    
                    margin="dense"
                    id="observacion"
                    label="Observación"
                    type="text"
                    //multiline
                    //rows={3}
                    fullWidth
                    variant="standard"
                    value={observacion}
                    
                    onChange={(v) => setObservacion(v.target.value)}
                    disabled={Entregado === 1 || visualizar === true}
 
                    // InputProps={{
                    //   readOnly: tipo === 1 ? false : true,
                    // }}
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
              </Grid>
    
              {/* ///fecha de vencimiento y prorroga//// */}
              {/* {switchValue ? (
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
                      disabled={Entregado === 1 || visualizar === true}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <CustomizedDate
                      value={FRecibido}
                      label={"Fecha Recibido"}
                      onchange={handleFilterChangefr}
                      disabled={Entregado === 1 || visualizar === true}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <CustomizedDate
                      value={FVencimiento}
                      label={"Fecha Vencimiento"}
                      onchange={handleFilterChangefv}
                      disabled={Entregado === 1 || visualizar === true}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <CustomizedDate
                      value={Prorroga}
                      label={"Prorroga"}
                      onchange={handleFilterChangep}
                      disabled={Entregado === 1 || visualizar === true}
                    />
                  </Grid>
                </Grid>
                
              ) : ( */}
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
                      disabled={Entregado === 1 || visualizar === true}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <CustomizedDate
                      value={FRecibido}
                      label={"Fecha Recibido"}
                      onchange={handleFilterChangefr}
                      disabled={Entregado === 1 || visualizar === true}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
                  <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
                </Grid>
              {/* )} */}
              
    
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
              {/* ///fecha de vencimiento y prorroga//// */}

                    {/* <FormGroup aria-label="position" row>
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
                        disabled={Entregado === 1 || visualizar === true}
                      />
                    </FormGroup> */}
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
              {/* ///fecha de vencimiento y prorroga//// */}
                    
                    {/* <FormGroup aria-label="position" row>
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
                        disabled={Entregado === 1 || visualizar === true}
                      />
                    </FormGroup> */}
                  </Grid>
                </Grid>
              )}
            </Box>
          </ModalForm>
        </>
      );
}