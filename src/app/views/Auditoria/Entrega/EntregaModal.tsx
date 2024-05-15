import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { PERMISO, USUARIORESPONSE } from "../../../interfaces/UserInfo";
import Progress from "../../Progress";
import ModalForm from "../../componentes/ModalForm";
import SelectFrag from "../../componentes/SelectFrag";
import CustomizedDate from "../../componentes/CustomizedDate";
import { useEffect, useState } from "react";
import SelectValues from "../../../interfaces/Share";
import dayjs, { Dayjs } from "dayjs";
import { getPermisos } from "../../../services/localStorage";
import Swal from "sweetalert2";
import { Entrega } from "./Entrega";
import { ShareService } from "../../../services/ShareService";
import { AuditoriaService } from "../../../services/AuditoriaService";
import { Toast } from "../../../helpers/Toast";

export const EntregaModal = ({
    tipo,
    handleClose,
    dt,
    user,
    idAuditoria,
    destino,

}:{
    tipo: number;
    handleClose: Function;
    dt: any;
    user: USUARIORESPONSE;
    idAuditoria: string;
    destino: string;

})=>{
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [entrega, setEntrega] = useState("");
  const [ListEntrega, setListEntrega] = useState<SelectValues[]>([]);
  const [fecha, setFecha] = useState<Dayjs | null>();
  const [Oficio, setOficio] = useState("");
  const [Entregado, setEntregado] = useState(dt[1]?.row?.entregado);
  const [editarPermiso, setEditarPermiso] = useState<boolean>(false);
  const [visualizar, setVisualizar] = useState<boolean>(false);
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
 


  const handleFilterChangeEntrega = (v: string) => {
    setEntrega(v);
  };
  const handleFilterChangeFecha = (v: any) => {
    setFecha(v);
  };

  const handleSend = () => {
    
      let data = {};
       data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.Id,
        idAuditoria: idAuditoria,
        Fecha: fecha,
        Entrega: entrega,
        Oficio: Oficio,
       }
       if (tipo == 1) {
        agregar(data);
      } else if (tipo === 2) {
        editar(data);

      }
      };

      const agregar = (data: any) => {
        AuditoriaService.Entregaindex(data).then((res) => {
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
        AuditoriaService.Entregaindex(data).then((res) => {
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
      },[]);

      const loadFilter = (operacion: number, P_ID?: string) => {
        setShow(true);
        let data = { NUMOPERACION: operacion, P_ID: P_ID };
        ShareService.SelectIndex(data).then((res) => {
          
          if (operacion === 5) {
            setListEntrega(res.RESPONSE);
            setShow(false);
          }
        });
      };

      useEffect(() => {
        loadFilter(5);
       
        
        
    
        
    
        if (Object.keys(dt).length === 0) {
          //setAPE(dt.coaid);
        } else {
          setId(dt[0]?.row?.id);
          setEntrega(dt[0]?.row?.ciid);
          setOficio(dt[0]?.row?.Oficio);
          
          
          if (fecha !== null) {
            setFecha(dayjs(dt[0]?.row?.Fecha,'DD-MM-YYYY'));
          }
          
          if (dt[0]?.row?.Fecha !== null && dt[0]?.row?.Fecha !== undefined) {
            setFecha(dayjs(dt[0]?.row?.Fecha,'DD-MM-YYYY'));
          }
        }
      }, [dt]);

    return(
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
                Entrega:
              </Typography>
              <SelectFrag
                value={entrega}
                options={ListEntrega}
                onInputChange={handleFilterChangeEntrega}
                placeholder={"Seleccione..."}
                disabled={false}
              />
            </Grid>
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
                disabled={false}
              />
              </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomizedDate
                      value={fecha}
                      label={"Fecha"}
                      onchange={handleFilterChangeFecha}
                      disabled={false}
                    />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              
            </Grid>
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
                    alignItems="end"
                    justifyContent="flex-start"
                    xs={3}
                    paddingLeft={1}
                    sx={{ display: "flex" }}
                  ></Grid>
                  <Grid
                    item
                    alignItems="center"
                    justifyContent="flex-end"
                    xs={3}
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
                    xs={3}
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
    
                  <Grid
                    item
                    alignItems="end"
                    justifyContent="flex-start"
                    xs={3}
                    paddingLeft={1}
                    sx={{ display: "flex" }}
                  >
                    
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
                    xs={4}
                    sx={{ display: "flex" }}
                  ></Grid>
                  <Grid
                    item
                    alignItems="center"
                    justifyContent="center"
                    xs={4}
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
                  <Grid
                    item
                    alignItems="center"
                    justifyContent="center"
                    xs={4}
                    sx={{ display: "flex" }}
                  >
                    
                  </Grid>
                </Grid>
              )}
        </Box>
      </ModalForm>
    )
}