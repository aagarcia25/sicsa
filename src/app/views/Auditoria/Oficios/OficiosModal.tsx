import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Toast } from "../../../helpers/Toast";
import { PERMISO, USUARIORESPONSE } from "../../../interfaces/UserInfo";
import { AuditoriaService } from "../../../services/AuditoriaService";
import { getPermisos, getUser } from "../../../services/localStorage";
import Progress from "../../Progress";
import CustomizedDate from "../../componentes/CustomizedDate";
import ModalForm from "../../componentes/ModalForm";
import { findOficios } from "../../../helpers/Files";
import { DnsTwoTone } from "@mui/icons-material";
import SelectFrag from "../../componentes/SelectFrag";
import SelectValues from "../../../interfaces/Share";
import { ShareService } from "../../../services/ShareService";

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
  const [descripcion	, setDescripcion] = useState("");


  const [idCatTOficio, setIdCatTOficio] = useState("");
  const [CatTOficioList, setCatTOficioList] = useState<SelectValues[]>([]);


  const [mensaje, setMensaje] = useState("");
  const [Entregado, setEntregado] = useState(dt[1]?.row?.entregado);
  const [editarPermiso, setEditarPermiso] = useState<boolean>(false);
  const [visualizar, setVisualizar] = useState<boolean>(false);

  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));

  const handleSend = async () => {
    if (!oficio) {
      Swal.fire("Favor de Completar los Campos", "¡Error!", "info");
    } else {
      let data = {
        CHID: id,
        NUMOPERACION: tipo,
        CHUSER: user.Id,
        idAuditoria: idauditoria,
        idOficios: idCatTOficio,
        Oficio: oficio,
        FechaRecibido: finicio,
        FechaVencimiento: ffin,
        Descripcion: descripcion,
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

  
  const handleFilterChangeCatTOficio = (v: any) => {
    setIdCatTOficio(v);
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

  const loadFilter = (operacion: number, P_ID?: string) => {
    setShow(true);
    let data = { NUMOPERACION: operacion, P_ID: P_ID };
    ShareService.SelectIndex(data).then((res) => {
      if (operacion === 29) {
        setCatTOficioList(res.RESPONSE);
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
  });

  useEffect(() => {
loadFilter(29)



    if (dt === "") {
    } else {
      setId(dt[0]?.data?.row?.id);
      //setOficio(dt?.data?.row?.Oficio);
      setOficio(dt[0]?.data?.row?.Oficio);
      setDescripcion(dt[0]?.data?.row?.Descripcion);
      setIdCatTOficio(dt[0]?.data?.row?.tofid);
      setFinicio(dayjs(dt[0]?.data?.row?.FechaRecibido,'DD-MM-YYYY'));
      setFfin(dayjs(dt[0]?.data?.row?.FechaVencimiento,'DD-MM-YYYY'));
      
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
                disabled={Entregado === "1" || visualizar === true}

                // InputProps={{
                //   readOnly: tipo === 1 ? false : true,
                // }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Tipo de Oficio:
              </Typography>
              <SelectFrag
                value={idCatTOficio}
                options={CatTOficioList}
                onInputChange={handleFilterChangeCatTOficio}
                placeholder={"Seleccione.."}
                disabled={Entregado === "1" || visualizar === true}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <CustomizedDate
                value={finicio}
                label={"Fecha Recibido"}
                onchange={handleFilterChange1}
                disabled={Entregado === "1" || visualizar === true}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <CustomizedDate
                value={ffin}
                label={"Fecha Vencimiento"}
                onchange={handleFilterChange2}
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
            sx={{ padding: "1%" }}
          >
            <Grid item xs={12} sm={6} md={4} lg={6}>
            <Typography sx={{ fontFamily: "sans-serif" }}>Descripción</Typography>
            <TextField
              
                margin="dense"
                id="descripcion"
                label=""
                value={descripcion}
                type="text"
                multiline
                rows={3}
                fullWidth
                focused
                onChange={(v) => setDescripcion(v.target.value)}
                disabled={Entregado === "1" || visualizar === true}

                // InputProps={{
                //   readOnly: tipo === 1 ? false : true,
                // }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
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
