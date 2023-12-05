import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Toast } from "../../../helpers/Toast";
import SelectValues from "../../../interfaces/Share";
import { USUARIORESPONSE } from "../../../interfaces/UserInfo";
import { AuditoriaService } from "../../../services/AuditoriaService";
import { ShareService } from "../../../services/ShareService";
import Progress from "../../Progress";
import CustomizedDate from "../../componentes/CustomizedDate";
import ModalForm from "../../componentes/ModalForm";
import SelectFrag from "../../componentes/SelectFrag";

export const OrganoCModal = ({
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
  const [Oficio, setOficio] = useState("");
  const [SIGAOficio, setSIGAOficio] = useState("");
  const [FOficio, setFechaOficio] = useState<Dayjs | null>();
  const [FRecibido, setFRecibido] = useState<Dayjs | null>();
  const [FVencimiento, setFVencimiento] = useState<Dayjs | null>();
  const [idorigen, setidorigen] = useState("");
  const [ListOrigen, setListOrigen] = useState<SelectValues[]>([]);

  const handleSend = () => {
    if (!Oficio) {
      Swal.fire("Favor de Completar los Campos", "¡Error!", "info");
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.Id,
        idAuditoria: idAuditoria,
        Oficio: Oficio,
        SIGAOficio: SIGAOficio,
        FOficio: FOficio,
        FRecibido: FRecibido,
        FVencimiento: FVencimiento,
        idOrganoAuditorOrigen: idorigen,
      };

      handleRequest(data);
    }
  };

  const handleRequest = (data: any) => {
    if (tipo === 1) {
      AuditoriaService.OrganoCindex(data).then((res) => {
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
      AuditoriaService.OrganoCindex(data).then((res) => {
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
        setListOrigen(res.RESPONSE);
        setShow(false);
      }
    });
  };

  useEffect(() => {
    loadFilter(6);

    if (dt === "") {
      //setAPE(dt.coaid);
    } else {
      setId(dt?.row?.id);
      setidorigen(dt?.row?.secid);
      setOficio(dt?.row?.Oficio);
      setSIGAOficio(dt?.row?.SIGAOficio);
      setFechaOficio(dayjs(dt?.row?.FOficio));
      setFRecibido(dayjs(dt?.row?.FRecibido));
      setFVencimiento(dayjs(dt?.row?.FVencimiento));
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
                Organo Origen:
              </Typography>
              <SelectFrag
                value={idorigen}
                options={ListOrigen}
                onInputChange={handleFilterChange1}
                placeholder={"Seleccione..."}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
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
            <Grid item alignItems="center" justifyContent="flex-end" xs={6} paddingRight={1} sx={{ display: "flex" }}>
              <Button
                className={tipo === 1 ? "guardar" : "actualizar"}
                onClick={() => handleSend()}
              >
                {tipo === 1 ? "Agregar" : "Editar"}
              </Button>
            </Grid>
            <Grid item alignItems="center" justifyContent="flex-start" xs={6} paddingLeft={1} sx={{ display: "flex" }}>
              <Button className={"actualizar"} onClick={() => handleClose()}>
                {"Salir"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </ModalForm>
    </>
  );
};
