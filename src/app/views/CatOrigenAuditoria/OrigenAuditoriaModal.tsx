import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Toast } from "../../helpers/Toast";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { CatalogosServices } from "../../services/catalogosServices";
import { getUser } from "../../services/localStorage";
import ModalForm from "../componentes/ModalForm";
import SelectValues from "../../interfaces/Share";
import { ShareService } from "../../services/ShareService";
import SelectFrag from "../componentes/SelectFrag";

export const OrigenAuditoriaModal = ({
  open,
  handleClose,
  tipo,
  dt,
}: {
  open: boolean;
  tipo: number;
  handleClose: Function;
  dt: any;
}) => {
  // CAMPOS DE LOS FORMULARIOS
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [origenauditoria, setorigenauditoria] = useState("");
  const [Listorigenauditoria, setListorigenauditoria] = useState<
    SelectValues[]
  >([]);

  const handleFilterChangeorigenaud = (v: string) => {
    setorigenauditoria(v);
  };
  const loadFilter = (operacion: number) => {
    let data = { NUMOPERACION: operacion };
    ShareService.SelectIndex(data).then((res) => {
      if (operacion === 14) {
        setListorigenauditoria(res.RESPONSE);
      }
    });
  };

  const handleSend = () => {
    if (!descripcion) {
      Swal.fire("Favor de Completar los Campos", "¡Error!", "info");
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.Id,
        IDORIGEN: origenauditoria,
        DESCRIPCION: descripcion,
      };

      handleRequest(data);
    }
  };

  const handleRequest = (data: any) => {
    if (tipo === 1) {
      //AGREGAR
      agregar(data);
    } else if (tipo === 2) {
      //EDITAR

      editar(data);
    }
  };

  const agregar = (data: any) => {
    CatalogosServices.Origen_Auditoria_index(data).then((res) => {
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
  };

  const editar = (data: any) => {
    CatalogosServices.Origen_Auditoria_index(data).then((res) => {
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
    loadFilter(14);
    if (dt === "") {
    } else {
      setId(dt?.row?.id);
      setNombre(dt?.row?.Nombre);
      setDescripcion(dt?.row?.Descripcion);
      setorigenauditoria(dt?.row?.idtipo);
    }
  }, [dt]);

  return (
    <>
      <ModalForm
        title={tipo === 1 ? "Agregar Registro" : "Editar Registro"}
        handleClose={handleClose}
      >
        <Box boxShadow={3}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ padding: "2%" }}
          >
            <Grid item alignItems="center" justifyContent="center" xs={4}>
              <TextField
                required
                margin="dense"
                id="Descripcion"
                label="Descripción"
                value={descripcion}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setDescripcion(v.target.value)}
                error={descripcion === "" ? true : false}
                InputProps={{}}
              />
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ padding: "2%" }}
          >
            <Grid item alignItems="center" justifyContent="center" xs={4}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Órgano Auditor:
              </Typography>
              <SelectFrag
                value={origenauditoria}
                options={Listorigenauditoria}
                onInputChange={handleFilterChangeorigenaud}
                placeholder={"Seleccione...."}
                disabled={false}
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ padding: "2%" }}
          >
            <Grid item alignItems="center" justifyContent="center" xs={2}>
              <Button
                disabled={descripcion === ""}
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
