import React, { useEffect, useState } from "react";
import ModalForm from "../componentes/ModalForm";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import CustomizedDate from "../componentes/CustomizedDate";
import dayjs, { Dayjs } from "dayjs";
import Swal from "sweetalert2";
import { AuditoriaService } from "../../services/AuditoriaService";
import { Toast } from "../../helpers/Toast";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { getUser } from "../../services/localStorage";
import SelectFrag from "../componentes/SelectFrag";
import SelectValues from "../../interfaces/Share";
import { ShareService } from "../../services/ShareService";
import Progress from "../Progress";

export const ControlOficiosModal = ({
  handleClose,
  tipo,
  dt,
}: {
  tipo: number;
  handleClose: Function;
  dt: any;
}) => {
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [Fecha, setFecha] = useState<Dayjs | null>();
  const [FechaEntregado, setFechaEntregado] = useState<Dayjs | null>();
  const [FechaRecibido, setFechaRecibido] = useState<Dayjs | null>();
  const [Oficio, setOficio] = useState("");
  const [Nauditoria, setNauditoria] = useState("");
  const [Solicitante, setSolicitante] = useState("");
  const [Asunto, setAsunto] = useState("");
  const [Tema, setTema] = useState("");
  const [Tipo, setTipo] = useState("");
  const [Observaciones, setObservaciones] = useState("");
  const [Destinatario, setDestinatario] = useState("");
  const [Cargo, setCargo] = useState("");
  const [ListDestinatario, setListDestinatario] = useState<SelectValues[]>([]);
  const [ListCargo, setListCargo] = useState<SelectValues[]>([]);
  const [ListSolicitante, setListSolicitante] = useState<SelectValues[]>([]);



  const handleSend = () => {
      let data = {
        CHID: id,
        NUMOPERACION: tipo,
        CHUSER: user.Id,
        Fecha: Fecha,
        Oficio: Oficio,
        Nauditoria: Nauditoria,
        Solicitante: Solicitante,
        FechaEntregado: FechaEntregado,
        FechaRecibido: FechaRecibido,
        Asunto: Asunto,
        Tema: Tema,
        Tipo: Tipo,
        Observaciones: Observaciones,
        Cargo: Cargo,
        Destinatario: Destinatario,
      };

      if (tipo === 1) {
        //AGREGAR
        agregar(data);
      } else if (tipo === 2) {
        //EDITAR
        editar(data);
      }
    
  };

  const agregar = (data: any) => {
    AuditoriaService.Foliosindex(data).then((res) => {
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
    AuditoriaService.Foliosindex(data).then((res) => {
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
  


  const handleFilterChange1 = (v: any) => {
    setFecha(v);
  };
  const handleFilterChange2 = (v: any) => {
    setFechaEntregado(v);
  };
  const handleFilterChange3 = (v: any) => {
    setFechaRecibido(v);
  };

  const handleFilterChangeDestinatario = (v: string) => {
    setDestinatario(v);
  };
  const handleFilterChangeCargo = (v: string) => {
    setCargo(v);
  };
  const handleFilterChangeSolicitante = (v: string) => {
    setSolicitante(v);
  };

  const loadFilter = (operacion: number, id?: string) => {
    setShow(true);
    let data = { NUMOPERACION: operacion, P_ID: id };
    ShareService.SelectIndex(data).then((res) => {
      if (operacion === 25) {
        setListDestinatario(res.RESPONSE);
      }else if (operacion === 26){
        setListCargo(res.RESPONSE);
      }else if (operacion === 27){
        setListSolicitante(res.RESPONSE);
      }
    });
  };

  useEffect(() => {
    
    loadFilter(25);
    loadFilter(26);
    loadFilter(27);


    if (dt === "") {
    } else {
      setId(dt?.data?.row?.id);
      setOficio(dt?.data?.row?.Oficio);
      setDestinatario(dt?.data?.row?.Destinatario);
      setCargo(dt?.data?.row?.Cargo);
      setAsunto(dt?.data?.row?.Asunto);
      setTema(dt?.data?.row?.Tema);
      setNauditoria(dt?.data?.row?.Nauditoria);
      setSolicitante(dt?.data?.row?.Solicita);
      setFecha(dayjs(dt?.data?.row?.Fecha));
      setFechaRecibido(dayjs(dt?.data?.row?.FechaRecibido));
      setFechaEntregado(dayjs(dt?.data?.row?.FechaEntrega));
      setTipo(dt?.data?.row?.Tipo);
      setObservaciones(dt?.data?.row?.Observaciones);

    }
  }, [dt]);

  return <div>
    <ModalForm handleClose={handleClose} title={tipo === 1 ? "Agregar Registro" : "Editar Registro"}>
    {/* <Progress open={show}></Progress> */}

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
              margin="dense"
              id="Oficio"
              label="Oficio"
              type="text"
              fullWidth
              variant="standard"
              value={Oficio}
              onChange={(v) => setOficio(v.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
          {/* <TextField
              margin="dense"
              id="Destinatario"
              label="Destinatario"
              type="text"
              fullWidth
              variant="standard"
              value={Destinatario}
              onChange={(v) => setDestinatario(v.target.value)}
            /> */}
            <Typography sx={{ fontFamily: "sans-serif" }}>
                Destinatario:
              </Typography>
              <SelectFrag
                value={Destinatario}
                options={ListDestinatario}
                onInputChange={handleFilterChangeDestinatario}
                placeholder={"Seleccione...."}
                disabled={false}
              />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
              margin="dense"
              id="Asunto"
              label="Asunto"
              type="text"
              fullWidth
              variant="standard"
              value={Asunto}
              onChange={(v) => setAsunto(v.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
              margin="dense"
              id="Tema"
              label="Tema"
              type="text"
              fullWidth
              variant="standard"
              value={Tema}
              onChange={(v) => setTema(v.target.value)}
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
              id="Nauditoria"
              label="No. de Auditoría"
              type="text"
              fullWidth
              variant="standard"
              value={Nauditoria}
              onChange={(v) => setNauditoria(v.target.value)}
            />          
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
          <Typography sx={{ fontFamily: "sans-serif" }}>
                Solicitante:
              </Typography>
              <SelectFrag
                value={Solicitante}
                options={ListSolicitante}
                onInputChange={handleFilterChangeSolicitante}
                placeholder={"Seleccione...."}
                disabled={false}
              />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
          <CustomizedDate
              value={Fecha}
              label={"Fecha"}
              onchange={handleFilterChange1}
              disabled={false}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
          <CustomizedDate
              value={FechaRecibido}
              label={"Fecha Recibido"}
              onchange={handleFilterChange3}
              disabled={false}
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
              value={FechaEntregado}
              label={"Fecha Entregado"}
              onchange={handleFilterChange2}
              disabled={false}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
              margin="dense"
              id="Tipo"
              label="Tipo"
              type="text"
              fullWidth
              variant="standard"
              value={Tipo}
              onChange={(v) => setTipo(v.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
              margin="dense"
              id="Observaciones"
              label="Observaciones"
              type="text"
              fullWidth
              variant="standard"
              value={Observaciones}
              onChange={(v) => setObservaciones(v.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
          
          </Grid>
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
              //disabled={Nombre === "" || ClaveEstado === "" || ClaveINEGI === ""}
              className={tipo === 1 ? "guardar" : "actualizar"}
              onClick={() => handleSend()}
            >
              {tipo === 1 ? "Agregar" : "Editar"}
            </Button>
          </Grid>

        </Grid>
      </Box>
    </ModalForm>
  </div>;
};
