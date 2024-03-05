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
import { findOficios } from "../../../helpers/Files";

export const OficiosModal = ({
  handleClose,
  tipo,
  dt,
  idauditoria,
  datosOficio,
}: {
  tipo: number;
  handleClose: Function;
  dt: any;
  idauditoria: string;
  datosOficio?: any;
}) => {
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [show, setShow] = useState(false);
  // CAMPOS DE LOS FORMULARIOS
  const [id, setId] = useState("");
  const [finicio, setFinicio] = useState<Dayjs | null>();
  const [ffin, setFfin] = useState<Dayjs | null>();
  const [oficio, setOficio] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSend = async () => {
    if (!oficio) {
      Swal.fire("Favor de Completar los Campos", "¡Error!", "info");
    } else {
      let data = {
        CHID: id,
        NUMOPERACION: tipo,
        CHUSER: user.Id,
        idAuditoria: idauditoria,
        Oficio: oficio,
        FechaRecibido: finicio,
        FechaVencimiento: ffin,
      };

      if (tipo === 1) {
        //AGREGAR
        agregar(data);
        handleOficioBlur();
      } else if (tipo === 2) {
        //EDITAR
        editar(data);
      }
    }
  };

  const handleFilterChange1 = (v: any) => {
    setFinicio(v);
  };

  const handleFilterChange2 = (v: any) => {
    setFfin(v);
  };

  const handleOficioBlur = () => {
    var cadena = oficio.split("-");
    var origen = cadena[2] + "/" + oficio;
    var destino =
      datosOficio.row.anio + "/" + datosOficio.row.NAUDITORIA + "/" + oficio;
    findOficios(origen, destino);
    handleClose();
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
        handleClose();
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
      setFinicio(dayjs(dt?.data?.row?.FechaRecibido));
      setFfin(dayjs(dt?.data?.row?.FechaVencimiento));
    }
  }, [dt]);

  return (
    <>
      <ModalForm
        title={tipo === 1 ? "Agregar Registro" : "Editar Registro"}
        handleClose={handleClose}
      >
        <Progress open={show} mensaje={mensaje}></Progress>
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
              <CustomizedDate
                value={finicio}
                label={"Fecha Recibido"}
                onchange={handleFilterChange1}
                disabled={false}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={2}>
              <CustomizedDate
                value={ffin}
                label={"Fecha Vencimiento"}
                onchange={handleFilterChange2}
                disabled={false}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
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
            <Grid
              item
              alignItems="center"
              justifyContent="flex-end"
              xs={6}
              paddingRight={1}
              sx={{ display: "flex" }}
            >
              <Button
                disabled={oficio === ""}
                className={tipo === 1 ? "guardar" : "actualizar"}
                onClick={() => handleSend()}
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
