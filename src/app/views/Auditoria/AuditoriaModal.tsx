import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Toast } from "../../helpers/Toast";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { AuditoriaService } from "../../services/AuditoriaService";
import { getUser } from "../../services/localStorage";
import ModalForm from "../componentes/ModalForm";
import SelectFrag from "../componentes/SelectFrag";
import { ShareService } from "../../services/ShareService";
import Progress from "../Progress";
import SelectValues from "../../interfaces/Share";

export const AuditoriaModal = ({
  handleClose,
  tipo,
  dt,
}: {
  tipo: number;
  handleClose: Function;
  dt: any;
}) => {
  // CAMPOS DE LOS FORMULARIOS

  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [show, setShow] = useState(false);

  const [id, setId] = useState("");
  const [idInforme, setIdInforme] = useState("");
  const [idTipoAuditoria, setIdTipoAuditoria] = useState("");
  const [idSector, setIdSector] = useState("");
  const [idEntidadFiscalizada, setIdEntidadFiscalizada] = useState("");
  const [FolioSIGA, setFolioSIGA] = useState("");
  const [PersonalEncargado, setPersonalEncargado] = useState("");
  const [NAUDITORIA, setNAUDITORIA] = useState("");
  const [NombreAudoria, setNombreAudoria] = useState("");
  const [ActaInicio, setActaInicio] = useState("");
  const [Encargado, setEncargado] = useState("");
  const [CatInforme, setCatInforme] = useState<SelectValues[]>([]);
  const [CatTipoAuditoria, setCatTipoAuditoria] = useState<SelectValues[]>([]);
  const [CatSector, setCatSector] = useState<SelectValues[]>([]);
  const [CatEntidadFiscalizada, setCatEntidadFiscalizada] = useState<SelectValues[]>([]);
  const [Anio, setAnio] = useState("");
  const [idGrupoFuncional, setidGrupoFuncional] = useState("");
  const [ListGrupoFuncional, setListGrupoFuncional] = useState<SelectValues[]>([]);
  
  const [ListAnio, setListAnio] = useState<SelectValues[]>([]);


  const handleSend = () => {
    let data = {
      CHID: id,
      NUMOPERACION: tipo,
      CHUSER: user.Id,
      FolioSIGA: FolioSIGA,
      PersonalEncargado: PersonalEncargado,
      Encargado: Encargado,
      NAUDITORIA: NAUDITORIA,
      NombreAudoria: NombreAudoria,
      ActaInicio: ActaInicio,
      idCatInforme: idInforme,
      idTipoAuditoria: idTipoAuditoria,
      idCatSector: idSector,
      idCatEntidadFiscalizada: idEntidadFiscalizada,
      Anio: Number(Anio),
      idCatGrupoFuncional:idGrupoFuncional,

    };

    console.log(data);
    if (tipo == 1) {
      agregar(data);
    } else {
      editar(data);
    }
  };

  const handleFilterChange1 = (v: string) => {
    setAnio(v);
  };

  const handleFilterChange2 = (v: string) => {
    setidGrupoFuncional(v);
  };

  const handleFilterChange3 = (v: string) => {
    setIdSector(v);
  };

  const handleFilterChange4 = (v: string) => {
    setIdEntidadFiscalizada(v);
  };

  const handleFilterChange5 = (v: any) => {
    setIdTipoAuditoria(v);
  };

  const handleFilterChange6 = (v: any) => {
    setIdInforme(v);
  };

  const agregar = (data: any) => {
    AuditoriaService.Auditoriaindex(data).then((res) => {
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
    AuditoriaService.Auditoriaindex(data).then((res) => {
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

  const loadFilter = (operacion: number) => {
    setShow(true);
    let data = { NUMOPERACION: operacion };
    ShareService.SelectIndex(data).then((res) => {
      if (operacion === 5) {
        setCatInforme(res.RESPONSE);
      } else if (operacion === 9) {
        setCatTipoAuditoria(res.RESPONSE);
      } else if (operacion === 7) {
        setCatSector(res.RESPONSE);
      } else if (operacion === 2) {
        setCatEntidadFiscalizada(res.RESPONSE);
        setShow(false);
      }else if (operacion === 1) {
        setListAnio(res.RESPONSE);
        setShow(false);
      }else if (operacion === 4) {
        setListGrupoFuncional(res.RESPONSE);
        setShow(false);
      }
    });
  };

  useEffect(() => {
    loadFilter(5);
    loadFilter(9);
    loadFilter(7);
    loadFilter(2);
    loadFilter(1);
    loadFilter(4);

    if (dt === "") {
    } else {
      console.log(dt?.row);
      setId(dt?.row?.id);
      setIdInforme(dt?.row?.ciid);
      setIdTipoAuditoria(dt?.row?.ctaid);
      setIdSector(dt?.row?.csid);
      setIdEntidadFiscalizada(dt?.row?.cefid);
      setFolioSIGA(dt?.row?.FolioSIGA);
      setEncargado(dt?.row?.Encargado);
      setPersonalEncargado(dt?.row?.PersonalEncargado);
      setNAUDITORIA(dt?.row?.NAUDITORIA);
      setNombreAudoria(dt?.row?.NombreAudoria);
      setActaInicio(dt?.row?.ActaInicio);
      setAnio (String(dt.row.Anio));
      setidGrupoFuncional(dt?.row?.cgfid);
    }
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
            <Grid item xs={12} sm={6} md={4} lg={1}>
            <Typography sx={{ fontFamily: "sans-serif" }}>Año:</Typography>
              <SelectFrag
                value={Anio}
                options={ListAnio}
                onInputChange={handleFilterChange1}
                placeholder={"Seleccione el Año"}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={5}>
            <TextField
                required
                margin="dense"
                id="NAUDITORIA"
                label="N° de Auditoría"
                value={NAUDITORIA}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setNAUDITORIA(v.target.value)}
                error={NAUDITORIA === "" ? true : false}
                InputProps={{
                  readOnly: tipo === 1 ? false : true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
                margin="dense"
                id="FolioSIGA"
                label="Folio SIGA"
                type="text"
                fullWidth
                variant="standard"
                value={FolioSIGA}
                required
                error={!FolioSIGA}
                onChange={(v) => setFolioSIGA(v.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              {/* <TextField
                margin="dense"
                id="FolioSIGA"
                label="Folio SIGA" 
                type="text"
                fullWidth
                variant="standard"
                value={FolioSIGA}
                required
                error={!FolioSIGA}
                onChange={(v) => setFolioSIGA(v.target.value)}
              /> */}
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
            <Grid item xs={12} sm={12} md={8} lg={6}>
            <TextField
                margin="dense"
                id="NombreAudoria"
                label="Nombre"
                type="text"
                multiline

                fullWidth
                variant="standard"
                rows={5}
                value={NombreAudoria}
                required
                error={!NombreAudoria}
                onChange={(v) => setNombreAudoria(v.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={6}>
            <TextField
                id="outlined-multiline-static"
                label="Personal"
                multiline
                fullWidth
                variant="standard"
                rows={5}
                value={PersonalEncargado}
                onChange={(v) => setPersonalEncargado(v.target.value)}
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
            <Typography sx={{ fontFamily: "sans-serif" }}>Grupo Funcional:</Typography>
              <SelectFrag
                value={idGrupoFuncional}
                options={ListGrupoFuncional}
                onInputChange={handleFilterChange2}
                placeholder={"Seleccione Grupo Funcional"}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography sx={{ fontFamily: "sans-serif" }}>
                Sector:
              </Typography>
              <SelectFrag
                value={idSector}
                options={CatSector}
                onInputChange={handleFilterChange3}
                placeholder={"Seleccione Sector"}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography sx={{ fontFamily: "sans-serif" }}>
                Entidad Fiscalizada:
              </Typography>
              <SelectFrag
                value={idEntidadFiscalizada}
                options={CatEntidadFiscalizada}
                onInputChange={handleFilterChange4}
                placeholder={"Seleccione entidad Fiscalizada"}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography sx={{ fontFamily: "sans-serif" }}>
                Tipo de Auditoria:
              </Typography>
              <SelectFrag
                value={idTipoAuditoria}
                options={CatTipoAuditoria}
                onInputChange={handleFilterChange5}
                placeholder={"Seleccione Tipo de Auditoria"}
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

            <Typography sx={{ fontFamily: "sans-serif" }}>
                Entrega:
              </Typography>
              <SelectFrag
                value={idInforme}
                options={CatInforme}
                onInputChange={handleFilterChange6}
                placeholder={"Seleccione Entrega"}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>

            

            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
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
                {tipo === 1 ? "Agregar" : "Actualizar"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </ModalForm>
    </>
  );
};
