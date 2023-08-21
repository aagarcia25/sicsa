import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Toast } from "../../helpers/Toast";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { CatalogosServices } from "../../services/catalogosServices";
import { getUser } from "../../services/localStorage";
import ModalForm from "../componentes/ModalForm";
import SelectFrag from "../componentes/SelectFrag";
import SelectValues from "../../interfaces/Share";
import { ShareService } from "../../services/ShareService";

export const CatAreaAuditoraModal = ({
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
  const [Clave, setClave] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [idCatUnidadAdmin, setidCatUnidadAdmin] = useState("");

  const [Catunidad, setCatunidad] = useState<SelectValues[]>([]);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  const handleSend = () => {
    if (!Clave && !Descripcion && !idCatUnidadAdmin) {
      Swal.fire("Favor de Completar los Campos", "¡Error!", "info");
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.Id,
        Clave: Clave,
        Descripcion: Descripcion,
        idCatUnidadAdmin: idCatUnidadAdmin,
      };

      if (tipo === 1) {
        //AGREGAR
        agregar(data);
      } else if (tipo === 2) {
        //EDITAR
        editar(data);
      }
    }
  };

  const handleFilterChange1 = (v: string) => {
    setidCatUnidadAdmin(v);
  };

  const agregar = (data: any) => {
    CatalogosServices.areaindex(data).then((res) => {
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
    CatalogosServices.areaindex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Registro Editado!",
        });
      } else {
        Swal.fire(res.STRMESSAGE, "¡Error!", "info");
      }
    });
  };

  const loadFilter = (operacion: number) => {
    let data = { NUMOPERACION: operacion };
    ShareService.SelectIndex(data).then((res) => {
      if (operacion === 10) {
        setCatunidad(res.RESPONSE);
      }
    });
  };

  useEffect(() => {
    loadFilter(10);
    if (dt === "") {
    } else {
      console.log("dt", dt);
      setId(dt?.row?.id);
      setClave(dt?.row?.Clave);
      setDescripcion(dt?.row?.Descripcion);
      setidCatUnidadAdmin(dt?.row?.iduaa);
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
                Unidad Administrativa Auditora:
              </Typography>
              <SelectFrag
                value={idCatUnidadAdmin}
                options={Catunidad}
                onInputChange={handleFilterChange1}
                placeholder={"Seleccione..."}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                required
                margin="dense"
                id="Clave"
                label="Clave"
                value={Clave}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setClave(v.target.value)}
                error={Clave === "" ? true : false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                required
                margin="dense"
                id="descripcion"
                label="Descripción"
                value={Descripcion}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setDescripcion(v.target.value)}
                error={Descripcion === "" ? true : false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ padding: "2%" }}
          >
            <Grid
              item
              alignItems="center"
              justifyContent="center"
              xs={4}
            ></Grid>
            <Grid
              item
              alignItems="center"
              justifyContent="center"
              xs={4}
            ></Grid>
            <Grid
              item
              alignItems="center"
              justifyContent="center"
              xs={4}
            ></Grid>
            <Grid
              item
              alignItems="center"
              justifyContent="center"
              xs={12}
              height={40}
            ></Grid>
            <Grid
              item
              alignItems="center"
              justifyContent="center"
              xs={5}
            ></Grid>

            <Grid item alignItems="center" justifyContent="center" xs={2}>
              <Button
                disabled={Clave === ""}
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
