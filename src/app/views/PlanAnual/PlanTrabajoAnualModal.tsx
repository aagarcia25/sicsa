import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Swal from "sweetalert2";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { AuditoriaService } from "../../services/AuditoriaService";
import ModalForm from "../componentes/ModalForm";
import CustomizedDate from "../componentes/CustomizedDate";
import { Toast } from "../../helpers/Toast";

export const PlanTrabajoAnualModal = ({
  //id,
  tipo,
  handleClose,
  datos,
  //anio,
  //idauditoria,
  user,
}: {
  //id: string;
  datos: any;
  tipo: number;
  handleClose: Function;
  //idauditoria: string;
  user: USUARIORESPONSE;
  //anio: number;
}) => {
  // CAMPOS DE LOS FORMULARIOS

  //const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [start, setstart] = useState<Dayjs | null>();
  const [end, setend] = useState<Dayjs | null>();
  const [name, setname] = useState("");
  const [id, setId] = useState("");
  const [type, settype] = useState("");
  const [anio, setanio] = useState("");
  const [orden, setorden] = useState("");

  const handleSend = () => {
    if (!start || !end || !name || !anio || !orden) {
      Swal.fire("Favor de Completar los Campos", "¡Error!", "info");
    } else {
      let data = {
        start: start.format("YYYY-MM-DD"),
        end: end.format("YYYY-MM-DD"),
        name: name,
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.Id,
        type: type,
        anio: anio,
        orden: orden,
        //idauditoria: idauditoria,
      };

      handleRequest(data);
    }
  };

  const handleRequest = (data: any) => {
    if (tipo === 1) {
      AuditoriaService.planAnualindex(data).then((res) => {
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
      AuditoriaService.planAnualindex(data).then((res) => {
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

  const handleFilterChange1 = (v: any) => {
    setstart(v);
  };

  const handleFilterChange2 = (v: any) => {
    setend(v);
  };

  useEffect(() => {
    if (datos === "") {
    } else {
      setstart(dayjs(datos?.start));
      setend(dayjs(datos?.end));
      setname(datos?.name);
      setId(datos.id);
      setanio(datos?.anio);
      setorden(datos?.orden);
    }
  }, [datos]);
  return (
    <ModalForm
      title={tipo === 1 ? "Agregar Registro" : "Editar Registro"}
      handleClose={handleClose}
    >
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
            <CustomizedDate
              value={start}
              label={"Fecha Inicio"}
              onchange={handleFilterChange1}
              disabled={false}

            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomizedDate
              value={end}
              label={"Fecha Final"}
              onchange={handleFilterChange2}
              disabled={false}

            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              margin="dense"
              id="name"
              label="Nombre"
              type="text"
              fullWidth
              variant="standard"
              value={name}
              //required
              //error={!name}
              onChange={(v) => setname(v.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              margin="dense"
              id="anio"
              label="Año"
              type="text"
              fullWidth
              variant="standard"
              value={anio}
              //required
              //error={!anio}
              onChange={(v) => setanio(v.target.value)}
            />
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
              <TextField
                margin="dense"
                id="orden"
                label="Orden"
                type="text"
                fullWidth
                variant="standard"
                value={orden}
                //required
                //error={!orden}
                onChange={(v) => setorden(v.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
          </Grid>

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
  );
};
