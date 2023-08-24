import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Toast } from "../../../helpers/Toast";
import SelectValues from "../../../interfaces/Share";
import { USUARIORESPONSE } from "../../../interfaces/UserInfo";
import { AuditoriaService } from "../../../services/AuditoriaService";
import { ShareService } from "../../../services/ShareService";
import Progress from "../../Progress";
import ModalForm from "../../componentes/ModalForm";
import SelectFrag from "../../componentes/SelectFrag";
import { getUser } from "../../../services/localStorage";

export const AccionesModal = ({
  handleClose,
  tipo,
  dt,
  nAuditoria,
  idAuditoria,
}: // user,
{
  tipo: number;
  handleClose: Function;
  dt: any;
  nAuditoria: number;
  idAuditoria: string;
}) => {
  useEffect(() => {});
  // CAMPOS DE LOS FORMULARIOS
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [show, setShow] = useState(true);
  const [id, setId] = useState("");

  const [NoAuditoria, setNoAuditoria] = useState(0);
  const [EstatusAcciones, setEstatusAcciones] = useState("");
  const [TipoAccion, setTipoAccion] = useState("");
  const [ClaveAccion, setClaveAccion] = useState("");
  const [TextoAccion, setTextoAccion] = useState("");
  const [accionSuperviviente, setaccionSuperviviente] = useState("");
  const [ListEstatusAcciones, setListEstatusAcciones] = useState<
    SelectValues[]
  >([]);
  const [ListTipoAccion, setListTipoAccion] = useState<SelectValues[]>([]);

  const handleSend = () => {
    if (!TipoAccion || !EstatusAcciones || !ClaveAccion || !TextoAccion) {
      Swal.fire("Favor de Completar los Campos", "¡Error!", "info");
    } else {
      setShow(true);
      let data = {
        idTipoAccion: TipoAccion,
        idEstatusAccion: EstatusAcciones,
        ClaveAccion: ClaveAccion,
        TextoAccion: TextoAccion,
        idAuditoria: idAuditoria,
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.Id,
        accionSuperviviente: accionSuperviviente,
      };

      handleRequest(data);
    }
  };

  const handleRequest = (data: any) => {
    if (tipo === 1) {
      AuditoriaService.Acciones_index(data).then((res) => {
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
      AuditoriaService.Acciones_index(data).then((res) => {
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "¡Registro Editado!",
          });
          setShow(false);
          handleClose();
        } else {
          setShow(false);
          Swal.fire(res.STRMESSAGE, "¡Error!", "info");
        }
      });
    }
  };

  const handleFilterChange2 = (v: any) => {
    setTipoAccion(v);
  };

  const handleFilterChange4 = (v: any) => {
    setEstatusAcciones(v);
  };

  useEffect(() => {
    if (dt === "") {
      setNoAuditoria(nAuditoria);
    } else {
      setNoAuditoria(dt?.NAUDITORIA);
      setTipoAccion(dt?.idTipoAccion);
      setEstatusAcciones(dt?.idEstatusAccion);
      setClaveAccion(dt?.ClaveAccion);
      setTextoAccion(dt?.TextoAccion);
      setId(dt?.id);
      setaccionSuperviviente(dt?.accionSuperviviente);
      console.log(dt);
    }
  }, [dt]);

  const consultaListas = (catalogo: any) => {
    let data = { NUMOPERACION: catalogo };
    ShareService.SelectIndex(data).then((res) => {
      if (catalogo === 8) {
        setListTipoAccion(res.RESPONSE);
      }
      if (catalogo === 3) {
        setListEstatusAcciones(res.RESPONSE);
        setShow(false);
      }
    });
  };

  useEffect(() => {
    consultaListas(8);
    consultaListas(3);
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
              <TextField
                disabled
                margin="dense"
                id="NoAuditoria"
                label="No. de Auditoria"
                fullWidth
                variant="standard"
                value={NoAuditoria}
                required
                error={!NoAuditoria}
                defaultValue="NAUDITORIA"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Tipo de Acción:
              </Typography>
              <SelectFrag
                value={TipoAccion}
                options={ListTipoAccion}
                onInputChange={handleFilterChange2}
                placeholder={"Seleccione el Tipo de Acción"}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Estatus de las acciones:
              </Typography>
              <SelectFrag
                value={EstatusAcciones}
                options={ListEstatusAcciones}
                onInputChange={handleFilterChange4}
                placeholder={"Seleccione el Estatus de las Acciones"}
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
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                margin="dense"
                id="ClaveAccion"
                label="Clave de Acción"
                type="text"
                fullWidth
                variant="standard"
                value={ClaveAccion}
                required
                error={!ClaveAccion}
                onChange={(v) => setClaveAccion(v.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                margin="dense"
                id="TextoAccion"
                label="Texto de Acción"
                type="text"
                fullWidth
                variant="standard"
                value={TextoAccion}
                required
                error={!TextoAccion}
                onChange={(v) => setTextoAccion(v.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                margin="dense"
                id="accionSuperviviente"
                label="Acción Superveniente"
                type="text"
                fullWidth
                variant="standard"
                value={accionSuperviviente}
                required
                error={!accionSuperviviente}
                onChange={(v) => setaccionSuperviviente(v.target.value)}
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
    </>
  );
};
