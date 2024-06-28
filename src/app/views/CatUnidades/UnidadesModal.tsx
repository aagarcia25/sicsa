import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import ModalForm from "../componentes/ModalForm";
import { useEffect, useState } from "react";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { getUser } from "../../services/localStorage";
import Swal from "sweetalert2";
import { CatalogosServices } from "../../services/catalogosServices";
import { Toast } from "../../helpers/Toast";
import SelectFrag from "../componentes/SelectFrag";
import SelectValues from "../../interfaces/Share";
import { ShareService } from "../../services/ShareService";
import Progress from "../Progress";

export const UnidadesModal = ({
    open,
    handleClose,
    tipo,
    dt,
}:{
    open: boolean;
    tipo: number;
    handleClose: Function;
    dt: any;
})=>{
  const [descripcion, setDescripcion] = useState("");
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [id, setId] = useState("");
  const [idSecretaria, setIdSecretaria] = useState("");
  const [ListSecretarias, setListSecretarias] = useState<SelectValues[]>([]);
  const [show, setShow] = useState(false);



  const handleFilterChangeSecretaria = (v: string) => {
    setIdSecretaria(v);
  };

  const handleSend = () => {
    if (!descripcion && !idSecretaria) {
      Swal.fire("Favor de Completar los Campos", "¡Error!", "info");
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.Id,
        idSecretaria: idSecretaria,
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
    CatalogosServices.Unidad_index(data).then((res) => {
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
    CatalogosServices.Unidad_index(data).then((res) => {
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
      if (operacion === 19) {
        setListSecretarias(res.RESPONSE);
        setShow(false);
      } 
    });
  };

  useEffect(() => {
    loadFilter(19)
    if (dt === "") {
    } else {
      setId(dt?.row?.id);
      //setNombre(dt?.row?.Nombre);
      setDescripcion(dt?.row?.uniDescripcion);
      setIdSecretaria(dt?.row?.secid);
    }
  }, [dt]);


    return(
        <>
        <ModalForm
        title={tipo === 1 ? "Agregar Registro" : "Editar Registro"}
        handleClose={handleClose}
      >
        <Progress open={show}></Progress>

        <Box boxShadow={3}>
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

              <Typography sx={{ fontFamily: "sans-serif" }}>
                Secretaría:
              </Typography>
              <SelectFrag
                value={idSecretaria}
                options={ListSecretarias}
                onInputChange={handleFilterChangeSecretaria}
                placeholder={"Seleccione..."}
                disabled={false}
              />
            </Grid>
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
                disabled={descripcion === "" || idSecretaria === ""}
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

}