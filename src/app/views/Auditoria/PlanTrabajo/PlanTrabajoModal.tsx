import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import CustomizedDate from "../../componentes/CustomizedDate";
import Swal from "sweetalert2";
import { PERMISO, USUARIORESPONSE } from "../../../interfaces/UserInfo";
import { getPermisos, getUser } from "../../../services/localStorage";
import { AuditoriaService } from "../../../services/AuditoriaService";
import { Toast } from "../../../helpers/Toast";
import ModalForm from "../../componentes/ModalForm";
import ButtonsDeleted from "../../componentes/ButtonsDeleted";

export const PlanTrabajoModal = ({
  tipo,
  handleClose,
  datos,
  idauditoria,
  obj,
}: {
  datos: any;
  tipo: number;
  handleClose: Function;
  idauditoria: string;
  obj: any;
}) => {
  // CAMPOS DE LOS FORMULARIOS

  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [start, setstart] = useState<Dayjs | null>();
  const [end, setend] = useState<Dayjs | null>();
  const [name, setname] = useState("");
  const [id, setId] = useState("");
  const [type, settype] = useState("");
  const [bancos, setBancos] = useState([]);
  const [openSlider, setOpenSlider] = useState(true);
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);

  const consulta = (data: any) => {
    AuditoriaService.Auditoriaindex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        setBancos(res.RESPONSE);
        setOpenSlider(false);
      } else {
        setOpenSlider(false);
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

  const handleSend = () => {
    if (!start || !end || !name) {
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
        idauditoria: idauditoria,
      };

      handleRequest(data);
    }
  };

  const handleAccion = (v: any) => {
    Swal.fire({
      icon: "info",
      title: "¿Estás seguro de eliminar este registro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        //setOpenSlider(false);
        let data = {
          NUMOPERACION: 3,
          CHID: datos.id,
          CHUSER: user.Id,
        };

        AuditoriaService.planindex(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "¡Registro Eliminado!",
            });
            //consulta({ NUMOPERACION: 4 });
            handleClose();

            consulta({ NUMOPERACION: 4, P_IDAUDITORIA: obj.id });
          } else {
            Swal.fire("¡Error!", res.STRMESSAGE, "error");
          }
        });
      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }
    });
  };

  const handleRequest = (data: any) => {
    if (tipo === 1) {
      AuditoriaService.planindex(data).then((res) => {
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
      AuditoriaService.planindex(data).then((res) => {
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

      setId(datos?.id);
    }
    permisos.map((item: PERMISO) => {
      if (String(item.menu) === "AUDITOR") {
        if (String(item.ControlInterno) === "ELIM") {
          setEliminar(true);
        }
        if (String(item.ControlInterno) === "EDIT") {
          setEditar(true);
        }
      }
    });
  }, [datos]);
  return (
    <ModalForm
      title={tipo === 1 ? "Agregar Registro" : editar === true ? "Editar Registro" : "Eliminar Registro"}
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
              disabled={editar === false}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomizedDate
              value={end}
              label={"Fecha Final"}
              onchange={handleFilterChange2}
              disabled={editar === false}


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
              disabled={editar === false}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            alignItems="center"
            justifyContent="center"
          >
            {eliminar ? (<ButtonsDeleted
              handleAccion={handleAccion}
              row={datos}
              show={true}
            ></ButtonsDeleted>):("")}
            
          </Grid>
          {editar ? (<Grid item alignItems="center" justifyContent="center" xs={2}>
            <Button
              // disabled={descripcion === "" || nombre === ""}
              className={tipo === 1 ? "guardar" : "actualizar"}
              onClick={() => handleSend()}
            >
              {tipo === 1 ? "Agregar" : "Editar"}
            </Button>
          </Grid>):("")}
          
        </Grid>
      </Box>
    </ModalForm>
  );
};
