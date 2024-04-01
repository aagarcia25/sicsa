import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Toast } from "../../../helpers/Toast";
import SelectValues from "../../../interfaces/Share";
import { PERMISO, USUARIORESPONSE } from "../../../interfaces/UserInfo";
import { AuditoriaService } from "../../../services/AuditoriaService";
import { ShareService } from "../../../services/ShareService";
import Progress from "../../Progress";
import ModalForm from "../../componentes/ModalForm";
import SelectFrag from "../../componentes/SelectFrag";
import dayjs, { Dayjs } from "dayjs";
import CustomizedDate from "../../componentes/CustomizedDate";
import { findOficios } from "../../../helpers/Files";
import { getPermisos } from "../../../services/localStorage";

export const OrganoRModal = ({
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
  const [Oficio, setOficio] = useState("");
  const [SIGAOficio, setSIGAOficio] = useState("");
  const [FOficio, setFechaOficio] = useState<Dayjs | null>();
  const [FRecibido, setFRecibido] = useState<Dayjs | null>();
  const [FVencimiento, setFVencimiento] = useState<Dayjs | null>();
  const [idorigen, setidorigen] = useState("");
  const [LisOrigen, setLisOrigen] = useState<SelectValues[]>([]);
  const [idDestino, setidDestino] = useState("");
  const [LisDestino, setLisDestino] = useState<SelectValues[]>([]);
  const [editarPermiso, setEditarPermiso] = useState<boolean>(false);
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [visualizar, setVisualizar] = useState<boolean>(false);

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
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.Id,
        idOrganoC: idNotificacion,
        Oficio: Oficio,
        SIGAOficio: SIGAOficio,
        FOficio: fOficio || FOficio,
        FRecibido: FRecibido,
        FVencimiento: FVencimiento,
        idOrganoAuditorOrigen: idorigen,
        idOrganoAuditorDestino: idDestino,
      };

      handleRequest(data);
    }
  };

  const handleRequest = (data: any) => {
    if (tipo === 1) {
      AuditoriaService.OrganoRindex(data).then((res) => {
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
      AuditoriaService.OrganoRindex(data).then((res) => {
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
    setidorigen(v);
  };

  const handleFilterChange2 = (v: string) => {
    setidDestino(v);
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

  const loadFilter = (operacion: number, P_ID?: string) => {
    setShow(true);
    let data = { NUMOPERACION: operacion, P_ID: P_ID };
    ShareService.SelectIndex(data).then((res) => {
      if (operacion === 6) {
        setLisOrigen(res.RESPONSE);
        setLisDestino(res.RESPONSE);
        setShow(false);
      }
    });
  };

  useEffect(() => {
    loadFilter(6);

    if (Object.keys(dt).length === 0) {
    } else {
      setId(dt?.row?.id);
      setOficio(dt?.row?.Oficio);
      setSIGAOficio(dt?.row?.SIGAOficio);
      setidorigen(dt?.row?.origenid);
      setidDestino(dt?.row?.destinoid);
      if (FRecibido !== null) {
        setFRecibido(dayjs(dt?.row?.FRecibido));
      }
      if (FVencimiento !== null) {
        setFVencimiento(dayjs(dt?.row?.FVencimiento));
      }
      if (FOficio !== null) {
        setFechaOficio(dayjs(dt?.row?.FOficio));
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
  });

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
                Organo Origen:
              </Typography>
              <SelectFrag
                value={idorigen}
                options={LisOrigen}
                onInputChange={handleFilterChange1}
                placeholder={"Seleccione..."}
                disabled={Entregado === "1" || visualizar === true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Organo Destino:
              </Typography>
              <SelectFrag
                value={idDestino}
                options={LisDestino}
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
              <TextField
                margin="dense"
                id="FolioSIGA"
                label="Folio SIGA"
                type="text"
                fullWidth
                variant="standard"
                value={SIGAOficio}
                onChange={(v) => setSIGAOficio(v.target.value)}
                disabled={Entregado === "1" || visualizar === true}
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
            <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
          </Grid>

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
                alignItems="center"
                justifyContent="flex-end"
                xs={6}
                paddingRight={1}
                sx={{ display: "flex" }}
              >
                <Button
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
                xs={6}
                paddingLeft={1}
                sx={{ display: "flex" }}
              >
                <Button className={"actualizar"} onClick={() => handleClose()}>
                  {"Salir"}
                </Button>
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
                xs={12}
                sx={{ display: "flex" }}
              >
                <Button className={"actualizar"} onClick={() => handleClose()}>
                  {"Salir"}
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </ModalForm>
    </>
  );
};
