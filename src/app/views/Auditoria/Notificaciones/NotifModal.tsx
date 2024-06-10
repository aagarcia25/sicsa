import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { findOficios } from "../../../helpers/Files";
import { Toast } from "../../../helpers/Toast";
import SelectValues from "../../../interfaces/Share";
import { PERMISO, USUARIORESPONSE } from "../../../interfaces/UserInfo";
import { AuditoriaService } from "../../../services/AuditoriaService";
import { ShareService } from "../../../services/ShareService";
import Progress from "../../Progress";
import CustomizedDate from "../../componentes/CustomizedDate";
import ModalForm from "../../componentes/ModalForm";
import SelectFrag from "../../componentes/SelectFrag";
import { getPermisos } from "../../../services/localStorage";
import { log } from "console";

export const NotifModal = ({
  handleClose,
  tipo,
  dt,
  user,
  idAuditoria,
  destino,
  idEntrega
}: {
  tipo: number;
  handleClose: Function;
  dt: any;
  user: USUARIORESPONSE;
  idAuditoria: string;
  destino: string;
  idEntrega:string

}) => {
  // CAMPOS DE LOS FORMULARIOS
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [Prorroga, setProrroga] = useState<Dayjs | null>(
    dt[0]?.row?.Prorroga !== undefined && dt[0]?.row?.Prorroga !== null
      ? dayjs(dt[0]?.row?.Prorroga)
      : null
  );
  const [Oficio, setOficio] = useState("");
  const [SIGAOficio, setSIGAOficio] = useState("");
  const [FOficio, setFechaOficio] = useState<Dayjs | null>();
  const [FRecibido, setFRecibido] = useState<Dayjs | null>();
  const [FVencimiento, setFVencimiento] = useState<Dayjs | null>(
    dt[0]?.row?.FVencimiento !== undefined && dt[0]?.row?.FVencimiento !== null
      ? dayjs(dt[0]?.row?.FVencimiento)
      : null
  );
  const [idsecretaria, setidsecretaria] = useState("");
  const [idunidad, setidunidad] = useState("");
  const [ListSecretarias, setListSecretarias] = useState<SelectValues[]>([]);
  const [ListUnidades, setListUnidades] = useState<SelectValues[]>([]);
  const [APE, setAPE] = useState("");
  const [ListAPE, setListAPE] = useState<SelectValues[]>([]);
  const [Entregado, setEntregado] = useState(dt[1]?.row?.entregado);
  const [editarPermiso, setEditarPermiso] = useState<boolean>(false);
  const [visualizar, setVisualizar] = useState<boolean>(false);
  const [switchValue, setSwitchValue] = useState(false);
  const handleChange = (event: any) => {
    setSwitchValue(event.target.checked);
  };

  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));

  const handleOficioBlur = () => {
    var cadena = Oficio.split("-");
    var origen = cadena[2] + "/" + Oficio;
    findOficios(origen, destino);
    handleClose();
    // Realiza cualquier otra acción que desees aquí
  };

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
        idAuditoria: idAuditoria,
        Oficio: Oficio,
        SIGAOficio: SIGAOficio,
        FOficio: fOficio || FOficio,
        FRecibido: FRecibido,

        idsecretaria: idsecretaria,
        idunidad: idunidad,
        idEntrega: idEntrega,

      };
      if (switchValue === true) {
        data = { ...data, FVencimiento: FVencimiento, Prorroga: Prorroga };
      }

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
          handleOficioBlur();
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
  }, [switchValue]);

  useEffect(() => {
    loadFilter(11);
    loadFilter(19);
    loadFilter(6);

    if (Object.keys(dt).length === 0) {
    } else {
      setId(dt[0]?.row?.id);
      setOficio(dt[0]?.row?.Oficio);
      setSIGAOficio(dt[0]?.row?.SIGAOficio);
      handleFilterChange1(dt[0]?.row?.secid);
      setidunidad(dt[0]?.row?.uniid);

      if (FRecibido !== null) {
        setFRecibido(dayjs(dt[0]?.row?.FRecibido,'DD-MM-YYYY'));
      }

      if (FVencimiento !== null && FVencimiento !== undefined) {
        setFVencimiento(dayjs(dt[0]?.row?.FVencimiento,'DD-MM-YYYY'));
        setSwitchValue(true);
      }
      if (FOficio !== null) {
        setFechaOficio(dayjs(dt[0]?.row?.FOficio,'DD-MM-YYYY'));
      }
      if (Prorroga !== null && Prorroga !== undefined) {
        setProrroga(dayjs(dt[0]?.row?.Prorroga,'DD-MM-YYYY'));
        setSwitchValue(true);
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
                disabled={Entregado === "1" || visualizar === true}
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
                disabled={Entregado === "1" || visualizar === true}
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
                disabled={Entregado === "1" || visualizar === true}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              {/* <TextField
                margin="dense"
                id="FolioSIGA"
                label="Folio SIGA"
                type="text"
                fullWidth
                variant="standard"
                value={SIGAOficio}
                onChange={(v) => setSIGAOficio(v.target.value)}
                disabled={Entregado === "1" || visualizar === true}

              /> */}
            </Grid>
          </Grid>
          {switchValue ? (
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
                  disabled={Entregado === "1" || visualizar === true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <CustomizedDate
                  value={FRecibido}
                  label={"Fecha Recibido"}
                  onchange={handleFilterChangefr}
                  disabled={Entregado === "1" || visualizar === true}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={3}>
                <CustomizedDate
                  value={FVencimiento}
                  label={"Fecha Vencimiento"}
                  onchange={handleFilterChangefv}
                  disabled={Entregado === "1" || visualizar === true}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={3}>
                <CustomizedDate
                  value={Prorroga}
                  label={"Prorroga"}
                  onchange={handleFilterChangep}
                  disabled={Entregado === "1" || visualizar === true}
                />
              </Grid>
            </Grid>
          ) : (
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
                  disabled={Entregado === "1" || visualizar === true}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <CustomizedDate
                  value={FRecibido}
                  label={"Fecha Recibido"}
                  onchange={handleFilterChangefr}
                  disabled={Entregado === "1" || visualizar === true}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={3}></Grid>

              <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
            </Grid>
          )}

          {String(Entregado) !== "1" && editarPermiso === true ? (
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
                    disabled={Entregado === "1" || visualizar === true}
                  />
                </FormGroup>
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
                    disabled={Entregado === "1" || visualizar === true}
                  />
                </FormGroup>
              </Grid>
            </Grid>
          )}
        </Box>
      </ModalForm>
    </>
  );
};
