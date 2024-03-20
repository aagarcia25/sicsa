import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
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
import { getPermisos, getUser } from "../../../services/localStorage";

export const AccionesModal = ({
  handleClose,
  tipo,
  dt,
  nAuditoria,
  idAuditoria,
}: {
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
  const [numeroResultado, setnumeroResultado] = useState(0);
  const [monto, setmonto] = useState(0);
  const [Entregado, setEntregado] = useState(dt[1]?.row?.entregado)
  const [editarPermiso, setEditarPermiso] = useState<boolean>(false);
  const [visualizar, setVisualizar] = useState<boolean>(false);

  const permisos: PERMISO[] = JSON.parse(String(getPermisos()))

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
        numeroResultado: numeroResultado,
        monto: monto,
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
      setNoAuditoria(dt[0]?.NAUDITORIA);
      setTipoAccion(dt[0]?.idTipoAccion);
      setEstatusAcciones(dt[0]?.idEstatusAccion);
      setClaveAccion(dt[0]?.ClaveAccion);
      setTextoAccion(dt[0]?.TextoAccion);
      setId(dt[0]?.id);
      setaccionSuperviviente(dt[0]?.accionSuperviviente);
      setmonto(dt[0]?.monto);
      setnumeroResultado(dt[0]?.numeroResultado);
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

  useEffect( () => {
    console.log("obj dt",dt);


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
  }
  )

  useEffect(() => {
    consultaListas(8);
    consultaListas(3);
  }, []);

  const validarNumero = (dato: string, state: any) => {
    //const nuevovalor=dato.target.value;

    //setmonto(nuevovalor);

    if (/^\d+(\.\d*)?$/.test(dato)) {
      return dato;
    } else if (dato.length === 0) {
      return "";
    }
    return state;
  };

  return (
    <>
      <ModalForm
        title={tipo === 1 ? "Agregar Observación" : "Editar Observación"}
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
                disabled={Entregado === "1" || visualizar === true}
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
                Tipo de Resultado:
              </Typography>
              <SelectFrag
                value={TipoAccion}
                options={ListTipoAccion}
                onInputChange={handleFilterChange2}
                placeholder={"Seleccione el Tipo de Resultado"}
                disabled={Entregado === "1" || visualizar === true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Estatus de los Resultados:
              </Typography>
              <SelectFrag
                value={EstatusAcciones}
                options={ListEstatusAcciones}
                onInputChange={handleFilterChange4}
                placeholder={"Seleccione el Estatus de los Resultados"}
                disabled={Entregado === "1" || visualizar === true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                margin="dense"
                id="monto"
                label="Monto"
                type="text"
                fullWidth
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                value={monto || ""}
                //required
                //error={!monto}
                onChange={(v) => {
                  setmonto(validarNumero(v.target.value, monto));
                }}
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
              <TextField
                margin="dense"
                id="ClaveAccion"
                label="Clave de Resultado"
                type="text"
                fullWidth
                variant="standard"
                value={ClaveAccion}
                required
                error={!ClaveAccion}
                onChange={(v) => setClaveAccion(v.target.value)}
                disabled={Entregado === "1" || visualizar === true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                margin="dense"
                id="TextoAccion"
                label="Resultado/Observación"
                type="text"
                fullWidth
                variant="standard"
                value={TextoAccion}
                //required
                //error={!TextoAccion}
                onChange={(v) => setTextoAccion(v.target.value)}
                disabled={Entregado === "1" || visualizar === true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                margin="dense"
                id="accionSuperviviente"
                label="Resultado Superveniente"
                type="text"
                fullWidth
                variant="standard"
                value={accionSuperviviente}
                //required
                //error={!accionSuperviviente}
                onChange={(v) => setaccionSuperviviente(v.target.value)}
                disabled={Entregado === "1" || visualizar === true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                margin="dense"
                id="numeroResultado"
                label="Número de Resultado"
                type="text"
                fullWidth
                variant="standard"
                value={numeroResultado || ""}
                //required
                //error={!numeroResultado}
                onChange={(v) => {
                  setnumeroResultado(
                    validarNumero(v.target.value, numeroResultado)
                  );
                }}
                disabled={Entregado === "1" || visualizar === true}
              />
            </Grid>
          </Grid>


        {(String(Entregado) !== "1" && editarPermiso === true) ? (
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
                // disabled={descripcion === "" || nombre === ""}

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
        ):(
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
              item alignItems="center" justifyContent="center" xs={12} sx={{ display: "flex" }}
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
        )}
          
        </Box>
      </ModalForm>
    </>
  );
};
