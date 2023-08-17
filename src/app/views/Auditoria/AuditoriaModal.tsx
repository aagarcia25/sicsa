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
  const [anio, setanio] = useState("");
  const [modalidad, setmodalidad] = useState("");
  const [origenauditoria, setorigenauditoria] = useState("");
  const [idGrupoFuncional, setidGrupoFuncional] = useState("");
  const [iduaa, setiduaa] = useState("");
  const [idaa, setidaa] = useState("");

  const [CatInforme, setCatInforme] = useState<SelectValues[]>([]);
  const [CatTipoAuditoria, setCatTipoAuditoria] = useState<SelectValues[]>([]);
  const [CatSector, setCatSector] = useState<SelectValues[]>([]);
  const [CatEntidadFiscalizada, setCatEntidadFiscalizada] = useState<
    SelectValues[]
  >([]);

  const [ListGrupoFuncional, setListGrupoFuncional] = useState<SelectValues[]>(
    []
  );

  const [ListAnio, setListAnio] = useState<SelectValues[]>([]);
  const [ListModalidad, setListModalidad] = useState<SelectValues[]>([]);
  const [Listorigenauditoria, setListorigenauditoria] = useState<
    SelectValues[]
  >([]);

  const [Listuaa, setListuaa] = useState<SelectValues[]>([]);
  const [Listaa, setListaa] = useState<SelectValues[]>([]);

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
      anio: Number(anio),
      idCatGrupoFuncional: idGrupoFuncional,
    };

    console.log(data);
    if (tipo == 1) {
      agregar(data);
    } else {
      editar(data);
    }
  };

  const handleFilterChange1 = (v: string) => {
    setanio(v);
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

  const handleFilterChangeuaa = (v: any) => {
    setiduaa(v);
    loadFilter(13);
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
    let data = { NUMOPERACION: operacion, P_ID: iduaa };
    ShareService.SelectIndex(data).then((res) => {
      if (operacion === 5) {
        setCatInforme(res.RESPONSE);
      } else if (operacion === 9) {
        setCatTipoAuditoria(res.RESPONSE);
      } else if (operacion === 7) {
        setCatSector(res.RESPONSE);
      } else if (operacion === 2) {
        setCatEntidadFiscalizada(res.RESPONSE);
      } else if (operacion === 1) {
        setListAnio(res.RESPONSE);
      } else if (operacion === 4) {
        setListGrupoFuncional(res.RESPONSE);
      } else if (operacion === 12) {
        setListModalidad(res.RESPONSE);
      } else if (operacion === 6) {
        setListorigenauditoria(res.RESPONSE);
      } else if (operacion === 10) {
        setListuaa(res.RESPONSE);
        setShow(false);
      } else if (operacion === 13) {
        setListaa(res.RESPONSE);
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
    loadFilter(12);
    loadFilter(6);
    loadFilter(10);

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
      setanio(String(dt.row.anio));
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
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Año Cuenta Pública:
              </Typography>
              <SelectFrag
                value={anio}
                options={ListAnio}
                onInputChange={handleFilterChange1}
                placeholder={"Seleccione el Año"}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
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
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Modalidad:
              </Typography>
              <SelectFrag
                value={modalidad}
                options={ListModalidad}
                onInputChange={handleFilterChange1}
                placeholder={"Seleccione ..."}
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
                label="Encargado"
                multiline
                fullWidth
                variant="standard"
                rows={5}
                value={Encargado}
                onChange={(v) => setEncargado(v.target.value)}
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
            <Grid item xs={12} sm={12} md={8} lg={6}>
              <TextField
                margin="dense"
                id="personalencargado"
                label="Personal Encargado"
                type="text"
                multiline
                fullWidth
                variant="standard"
                rows={5}
                value={PersonalEncargado}
                required
                error={!PersonalEncargado}
                onChange={(v) => setPersonalEncargado(v.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={6}></Grid>
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
                Origen Auditoria:
              </Typography>
              <SelectFrag
                value={origenauditoria}
                options={Listorigenauditoria}
                onInputChange={handleFilterChange2}
                placeholder={"Seleccione...."}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
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
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Grupo Funcional:
              </Typography>
              <SelectFrag
                value={idGrupoFuncional}
                options={ListGrupoFuncional}
                onInputChange={handleFilterChange2}
                placeholder={"Seleccione Grupo Funcional"}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>Sector:</Typography>
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
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Unidad Administrativa Auditora:
              </Typography>
              <SelectFrag
                value={iduaa}
                options={Listuaa}
                onInputChange={handleFilterChangeuaa}
                placeholder={"Seleccione.."}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Área Auditora:
              </Typography>
              <SelectFrag
                value={idaa}
                options={Listaa}
                onInputChange={handleFilterChange6}
                placeholder={"Seleccione.."}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>Ramo:</Typography>
              <SelectFrag
                value={idInforme}
                options={CatInforme}
                onInputChange={handleFilterChange6}
                placeholder={"Seleccione.."}
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
              <TextField
                required
                margin="dense"
                id="UNIVERSO"
                label="Universo(miles de pesos)"
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
                required
                margin="dense"
                id="NAUDITORIA"
                label="Muestra(miles de pesos)"
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
