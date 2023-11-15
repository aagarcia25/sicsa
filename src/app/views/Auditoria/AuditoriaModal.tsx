import { Box, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Toast } from "../../helpers/Toast";
import { PERMISO, USUARIORESPONSE } from "../../interfaces/UserInfo";
import { AuditoriaService } from "../../services/AuditoriaService";
import { getPermisos, getUser } from "../../services/localStorage";
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
  const [Encargado, setEncargado] = useState("");
  const [anio, setanio] = useState("");
  const [idModalidad, setidModalidad] = useState("");
  const [origenauditoria, setorigenauditoria] = useState("");
  const [idGrupoFuncional, setidGrupoFuncional] = useState("");
  const [iduaa, setiduaa] = useState("");
  const [idaa, setidaa] = useState("");
  const [idClasificacion, setidClasificacion] = useState("");
  const [idramo, setidramo] = useState("");
  const [Consecutivo, setConsecutivo] = useState("");
  const [actainicio, setactainicio] = useState("");
  const [universomilespesos, setuniversomilespesos] = useState("");
  const [muestramilespesos, setmuestramilespesos] = useState("");
  const [inicio, setInicio] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [idEstatus, setidEstatus] = useState("");

  const [CatInforme, setCatInforme] = useState<SelectValues[]>([]);
  const [CatRamo, setCatRamo] = useState<SelectValues[]>([]);
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
  const [LisClasificacion, setLisClasificacion] = useState<SelectValues[]>([]);
  const [Listinicio, setListInicio] = useState<SelectValues[]>([]);
  const [ListMunicipio, setListMunicipio] = useState<SelectValues[]>([]);
  const [ListIdEstatus, setListIdEstatus] = useState<SelectValues[]>([]);
  const [montoauditado, setmontoauditado] = useState(0);
  const [Entregado, setEntregado] = useState("")
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [visualizar, setVisualizar] = useState<boolean>(false);
  const [editarPermiso, setEditarPermiso] = useState<boolean>(false);


  const handleSend = () => {
    if (
      !NAUDITORIA ||
      !NombreAudoria ||
      !PersonalEncargado ||
      !universomilespesos ||
      !muestramilespesos
    ) {
      Swal.fire("Favor de Completar los Campos", "¡Error!", "info");
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.Id,
        anio: Number(anio),
        NAUDITORIA: NAUDITORIA,
        FolioSIGA: FolioSIGA,
        idModalidad: idModalidad,
        Consecutivo: Consecutivo,
        NombreAudoria: NombreAudoria,
        ActaInicio: actainicio,
        Encargado: Encargado,
        PersonalEncargado: PersonalEncargado,
        idClasificacion: idClasificacion,
        idcatorigenaud: origenauditoria,
        idCatGrupoFuncional: idGrupoFuncional,
        idCatSector: idSector,
        idCatEntidadFiscalizada: idEntidadFiscalizada,
        idTipoAuditoria: idTipoAuditoria,
        idCatInforme: idInforme,
        idUnidadAdm: iduaa,
        idAreaAdm: idaa,
        idRamo: idramo,
        universopesos: universomilespesos,
        muestrapesos: muestramilespesos,
        inicio: inicio,
        municipio: municipio,
        idEstatus: idEstatus,
        montoauditado: montoauditado,
      };

      if (tipo == 1) {
        agregar(data);
      } else if (tipo === 2) {
        editar(data);

      }
    }
  };

  const handleFilterChangemodalidad = (v: string) => {
    setidModalidad(v);
  };

  const handleFilterChange1 = (v: string) => {
    setanio(v);
  };

  const handleFilterChangeinicio = (v: string) => {
    setInicio(v);
  };

  const handleFilterChangeestatus = (v: string) => {
    setidEstatus(v);
  };

  const handleFilterChangeMunicipio = (v: string) => {
    setMunicipio(v);
  };

  const handleFilterChangeclasificacion = (v: string) => {
    setidClasificacion(v);
    loadFilter(21, v);
  };

  const handleFilterChange2 = (v: string) => {
    setidGrupoFuncional(v);
  };

  const handleFilterChangeorigenaud = (v: string) => {
    setorigenauditoria(v);
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

  const handleFilterramo = (v: any) => {
    setidramo(v);
  };

  const handleFilterChange6 = (v: any) => {
    setIdInforme(v);
  };

  const handleFilterChangeaa = (v: any) => {
    setidaa(v);
  };

  const handleFilterChangeuaa = (v: any) => {
    setiduaa(v);
    loadFilter(13, v);
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

  const loadFilter = (operacion: number, id?: string) => {
    setShow(true);
    let data = { NUMOPERACION: operacion, P_ID: id };
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
      } //else if (operacion === 6) {
      //setListorigenauditoria(res.RESPONSE);
      //}
      else if (operacion === 10) {
        setListuaa(res.RESPONSE);
        setShow(false);
      } else if (operacion === 13) { 
        setListaa(res.RESPONSE);
        setShow(false);
      } else if (operacion === 14) {
        setLisClasificacion(res.RESPONSE);
        setShow(false);
      } else if (operacion === 15) {
        setCatRamo(res.RESPONSE);
      } else if (operacion === 16) {
        setListInicio(res.RESPONSE);
      } else if (operacion === 17) {
        setListMunicipio(res.RESPONSE);
      } else if (operacion === 18) {
        setListIdEstatus(res.RESPONSE);
      } else if (operacion === 21) {
        setListorigenauditoria(res.RESPONSE);
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
    loadFilter(14);
    loadFilter(15);
    loadFilter(12);
    //  loadFilter(6);
    loadFilter(10);
    loadFilter(16);
    loadFilter(17);
    loadFilter(18);
    loadFilter(21);

    if (dt === "") {
    } else {
      setId(dt?.row?.id);
      setanio(String(dt?.row?.anio));
      setNAUDITORIA(dt?.row?.NAUDITORIA);
      setFolioSIGA(dt?.row?.FolioSIGA);
      setidModalidad(dt?.row?.cmoid);
      setConsecutivo(dt?.row?.Consecutivo);
      setNombreAudoria(dt?.row?.NombreAudoria);
      setactainicio(dt?.row?.ActaInicio);
      setEncargado(dt?.row?.Encargado);
      setPersonalEncargado(dt?.row?.PersonalEncargado);
      //setidClasificacion(dt?.row?.ctid);
      //handleFilterChangeorigenaud(dt?.row?.coaid);
      handleFilterChangeclasificacion(dt?.row?.ctid);
      setorigenauditoria(dt?.row?.coaid);
      setIdSector(dt?.row?.csid);
      setIdEntidadFiscalizada(dt?.row?.cefid);
      setIdTipoAuditoria(dt?.row?.ctaid);
      setIdInforme(dt?.row?.ciid);
      setiduaa(dt?.row?.cuaaid);
      setidGrupoFuncional(dt?.row?.cgfid);
      setidramo(dt?.row?.crid);
      setuniversomilespesos(dt?.row?.universopesos);
      setmuestramilespesos(dt?.row?.muestrapesos);
      handleFilterChangeuaa(dt?.row?.cuaaid);
      setidaa(dt?.row?.caaid);
      setidEstatus(dt?.row?.ceaid);
      setMunicipio(dt?.row?.munid);
      setInicio(dt?.row?.ciaid);
      setmontoauditado(dt?.row.montoauditado);
      setEntregado(dt?.row?.entregado);


    }
  }, []);

  const validarNumero = (dato: string, state: any) => {
    if (/^\d+(\.\d*)?$/.test(dato)) {
      return dato;
    } else if (dato.length === 0) {
      return "";
    }
    return state;
  };

  useEffect( () => {
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
                Estatus:
              </Typography>
              <SelectFrag
                value={idEstatus}
                options={ListIdEstatus}
                onInputChange={handleFilterChangeestatus}
                placeholder={"Seleccione.."}
                //disabled={false}
                disabled={Entregado === "1" || visualizar === true }

              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Origen Auditoría:
              </Typography>
              <SelectFrag
                value={inicio}
                options={Listinicio}
                onInputChange={handleFilterChangeinicio}
                placeholder={"Seleccione.."}
                disabled={Entregado === "1" || visualizar === true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Año Cuenta Pública:
              </Typography>
              <SelectFrag
                value={anio}
                options={ListAnio}
                onInputChange={handleFilterChange1}
                placeholder={"Seleccione.."}
                disabled={Entregado === "1" || visualizar === true} />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Modalidad:
              </Typography>
              <SelectFrag
                value={idModalidad}
                options={ListModalidad}
                onInputChange={handleFilterChangemodalidad}
                placeholder={"Seleccione ..."}
                disabled={Entregado === "1" || visualizar === true }
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
                disabled={Entregado === "1" || visualizar === true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                margin="dense"
                id="Consecutivo"
                label="Consecutivo"
                type="number"
                fullWidth
                variant="standard"
                value={Consecutivo}
                onChange={(v) => setConsecutivo(v.target.value)}
                disabled={Entregado === "1" || visualizar === true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                margin="dense"
                id="ActaInicio"
                label="Acta de Inicio"
                type="text"
                fullWidth
                variant="standard"
                value={actainicio}
                onChange={(v) => setactainicio(v.target.value)}
                disabled={Entregado === "1" || visualizar === true}

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
                onChange={(v) => setFolioSIGA(v.target.value)}
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
                disabled={Entregado === "1" || visualizar === true}

              />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={6}>
              <TextField
                id="outlined-multiline-static"
                label="Responsable de la auditoría"
                multiline
                fullWidth
                variant="standard"
                rows={5}
                value={Encargado}
                onChange={(v) => setEncargado(v.target.value)}
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
            <Grid item xs={12} sm={12} md={8} lg={6}>
              <TextField
                margin="dense"
                id="personalencargado"
                label="Personal del Organo Fiscalizador"
                type="text"
                multiline
                fullWidth
                variant="standard"
                rows={5}
                value={PersonalEncargado}
                required
                error={!PersonalEncargado}
                onChange={(v) => setPersonalEncargado(v.target.value)}
                disabled={Entregado === "1" || visualizar === true}

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
                Clasificación Auditoría:
              </Typography>
              <SelectFrag
                value={idClasificacion}
                options={LisClasificacion}
                onInputChange={handleFilterChangeclasificacion}
                placeholder={"Seleccione...."}
                disabled={Entregado === "1" || visualizar === true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Organo Auditor:
              </Typography>
              <SelectFrag
                value={origenauditoria}
                options={Listorigenauditoria}
                onInputChange={handleFilterChangeorigenaud}
                placeholder={"Seleccione...."}
                disabled={Entregado === "1" || visualizar === true}
              />
            </Grid>
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
                placeholder={"Seleccione.."}
                disabled={Entregado === "1" || visualizar === true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>Sector:</Typography>
              <SelectFrag
                value={idSector}
                options={CatSector}
                onInputChange={handleFilterChange3}
                placeholder={"Seleccione.."}
                disabled={Entregado === "1" || visualizar === true}
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
                placeholder={"Seleccione.."}
                disabled={Entregado === "1" || visualizar === true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Tipo de Auditoría:
              </Typography>
              <SelectFrag
                value={idTipoAuditoria}
                options={CatTipoAuditoria}
                onInputChange={handleFilterChange5}
                placeholder={"Seleccione.."}
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
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Entrega:
              </Typography>
              <SelectFrag
                value={idInforme}
                options={CatInforme}
                onInputChange={handleFilterChange6}
                placeholder={"Seleccione.."}
                disabled={Entregado === "1" || visualizar === true}
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
                disabled={Entregado === "1" || visualizar === true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Área Auditora:
              </Typography>
              <SelectFrag
                value={idaa}
                options={Listaa}
                onInputChange={handleFilterChangeaa}
                placeholder={"Seleccione.."}
                disabled={Entregado === "1" || visualizar === true}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>Ramo:</Typography>
              <SelectFrag
                value={idramo}
                options={CatRamo}
                onInputChange={handleFilterramo}
                placeholder={"Seleccione.."}
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
                required
                margin="dense"
                id="UNIVERSO"
                label="Universo(miles de pesos)"
                value={universomilespesos}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setuniversomilespesos(validarNumero(v.target.value, universomilespesos))}
                error={universomilespesos === "" ? true : false}
                disabled={Entregado === "1" || visualizar === true}

              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                required
                margin="dense"
                id="muestra"
                label="Muestra(miles de pesos)"
                value={muestramilespesos}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setmuestramilespesos(validarNumero(v.target.value, muestramilespesos))}
                error={muestramilespesos === "" ? true : false}
                disabled={Entregado === "1" || visualizar === true}

              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                required
                margin="dense"
                id="montoauditado"
                label="Monto auditado"
                value={montoauditado || ""}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => {
                  setmontoauditado(
                    validarNumero(v.target.value, montoauditado)
                  );
                }}
                error={montoauditado === 0 ? true : false}
                disabled={Entregado === "1" || visualizar === true}

              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Municipio:
              </Typography>
              <SelectFrag
                value={municipio}
                options={ListMunicipio}
                onInputChange={handleFilterChangeMunicipio}
                placeholder={"Seleccione.."}
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


              <Grid item alignItems="center" justifyContent="flex-end" xs={6} paddingRight={1} sx={{ display: "flex" }}>
                <Button
                  // disabled={descripcion === "" || nombre === ""}
                  className={tipo === 1 ? "guardar" : "actualizar"}
                  onClick={() => handleSend()}
                >
                  {tipo === 1 ? "Agregar" : "Actualizar"}
                </Button>
              </Grid>
              <Grid item alignItems="center" justifyContent="flex-start" xs={6} paddingLeft={1} sx={{ display: "flex" }}>
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
          <Grid item alignItems="center" justifyContent="center" xs={12} sx={{ display: "flex" }}>
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
