import { Autocomplete, Box, Button, FormControl, Grid, Stack, TextField, Typography, fabClasses } from "@mui/material";
import ModalForm from "../componentes/ModalForm";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { getUser } from "../../services/localStorage";
import { Toast } from "../../helpers/Toast";
import { CatalogosServices } from "../../services/catalogosServices";
//import SelectValues from "../../interfaces/Share";
import { ShareService } from "../../services/ShareService";
import SelectValues from "../../interfaces/Share";
import { log } from "console";

export const MonitoreoWebModal = (
  {
    open,
    tipo,
    handleClose,
    dt,
  }: {
    open: boolean;
    tipo: number;
    handleClose: Function;
    dt: any;
  }
) => {

  const [id, setId] = useState("");
  const [Url, setUrl] = useState("");
   const [Correos, setCorreos] = useState<Array<SelectValues>>([]);
   const [CorreosList, setCorreosList] = useState<SelectValues[]>([]);
  //const [Correos, setCorreos] = useState("");
  const [Alias, setAlias] = useState("");
  const [Tiempo, setTiempo] = useState("");
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  const [show, setShow] = useState(false);




  const handleSend = () => {
    if (!Url || !Correos || !Alias || !Tiempo) {


      Swal.fire("Favor de Completar los Campos", "¡Error!", "info");
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.Id,
        Url: Url,
        Correos: getArrayCorreo(),
        //Correos: Correos,
        Alias: Alias,
        Tiempo: Tiempo,
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

  const agregar = (data: any) => {
    CatalogosServices.Monitoreo_index(data).then((res) => {
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
    CatalogosServices.Monitoreo_index(data).then((res) => {      
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

  const loadFilter = (operacion: number, id?: string) => {
    setShow(true);
    let data = { NUMOPERACION: operacion, P_ID: id };
    ShareService.SelectIndex(data).then((res) => {
      if (operacion === 28) {
        setCorreos(res.RESPONSE);


      }
    });
  };

  function getArrayCorreo() {


    let correosListos = ""
    CorreosList.map((item) => {
      correosListos = correosListos + item.label + ";";
    })
    return (correosListos);
  }


  useEffect(() => {
    loadFilter(28)



    if (dt === "") {
    } else {
      setId(dt?.row?.id)
      setUrl(dt?.row?.Url)
      setCorreos(dt?.row?.Correos)
      setAlias(dt?.row?.Alias)
      setTiempo(dt?.row?.Tiempo)
    }

  }, []);





  return (
    <div style={{ height: 600, width: "100%", padding: "1%" }}>
      <ModalForm handleClose={handleClose} title={tipo === 1 ? "Agregar Registro" : "Editar Registro"}>
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
                id="Url"
                label="URL"
                type="text"
                multiline
                fullWidth
                rows={5}
                variant="standard"
                value={Url}
                onChange={(v) => setUrl(v.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Seleccione Correo
              </Typography>
              <Autocomplete
                multiple
                disabled={Correos.length === 0}
                noOptionsText="No se encontraron opciones"
                clearText="Borrar"
                closeText="Cerrar"
                openText="Abrir"
                options={Correos}
                getOptionLabel={(correo) => correo.label || "Seleccione Roles"}
                value={CorreosList}
                onChange={(event, newValue) => {
                  if (newValue != null) {
                    setCorreosList( [...newValue]);
                  }
                }}
                renderInput={(params) => (
                  <TextField key={params.id} {...params} variant="outlined" />
                )}
                isOptionEqualToValue={(option, value) =>
                  option?.label === value?.label || value?.label === ""
                }
              />

              {/* <TextField
                margin="dense"
                id="Correos"
                label="Correos"
                type="text"
                multiline
                fullWidth
                rows={5}
                variant="standard"
                value={Correos}
                onChange={(v) => setCorreos(v.target.value)}
              /> */}
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                margin="dense"
                id="Alias"
                label="Alias"
                type="text"
                fullWidth
                variant="standard"
                value={Alias}
                onChange={(v) => setAlias(v.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                margin="dense"
                id="Tiempo"
                label="Tiempo"
                type="number"
                fullWidth
                variant="standard"
                value={Tiempo}
                onChange={(v) => setTiempo(v.target.value)}
              />
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
            <Grid item alignItems="center" justifyContent="flex-end" xs={6} paddingRight={1} sx={{display:"flex"}}>
                <Button
                  //disabled={Nombre === "" || ClaveEstado === "" || ClaveINEGI === ""}
                  className={tipo === 1 ? "guardar" : "actualizar"}
                  onClick={() =>
                    //console.log("getarraycorrero",getArrayCorreo())


                    handleSend()
                  }

                >
                  {tipo === 1 ? "Agregar" : "Editar"}
                </Button>
              </Grid>
              <Grid item alignItems="center" justifyContent="flex-start" xs={6} paddingLeft={1} sx={{display:"flex"}}>
              <Button
                // disabled={descripcion === "" || nombre === ""}
                className={"actualizar"}
                onClick={() => handleClose()}
              >
                {"Salir"}
              </Button>
            </Grid>
            </Grid>
          </Grid >
        </Box>
      </ModalForm>



    </div>
  )
}