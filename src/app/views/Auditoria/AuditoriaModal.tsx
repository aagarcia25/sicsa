import {
  Box,
  Button,
  Grid,
  TextField,
  Typography
} from "@mui/material";
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
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [show, setShow] = useState(false);

  const [idInforme, setIdInforme] = useState("");
  const [idTipoAuditoria, setIdTipoAuditoria] = useState("");
  const [idSector, setIdSector] = useState("");
  const [idEntidadFiscalizada, setIdEntidadFiscalizada] = useState("");

  const [CatInforme, setCatInforme] = useState<SelectValues[]>([]);
  const [CatTipoAuditoria, setCatTipoAuditoria] = useState<SelectValues[]>([]);
  const [CatSector, setCatSector] = useState<SelectValues[]>([]);
  const [CatEntidadFiscalizada, setCatEntidadFiscalizada] = useState<SelectValues[]>([]);



  const handleSend = () => {
    // if (!nombre || !descripcion) {
    //   Swal.fire("Favor de Completar los Campos",  "¡Error!", "info");
    // } else {
      let data = {
        NUMOPERACION: tipo,
        CHUSER: user.Id,
       // FolioSIGA:FolioSIGA,
       // PersonalEncargado:PersonalEncargado,
      //  NAUDITORIA:NAUDITORIA,
       // NombreAudoria:NombreAudoria,
       // ActaInicio:ActaInicio,
       // OFinicio:OFinicio,
       // Fecha_Recibido:Fecha_Recibido,
       // Fecha_Vencimiento:Fecha_Vencimiento,
        idCatInforme:idInforme,
        idTipoAuditoria:idTipoAuditoria,
        idCatSector:idSector,
        idCatEntidadFiscalizada:idEntidadFiscalizada,

      };
console.log(data)
     // handleRequest(data);
     // handleClose();
    // }
  };

  const handleFilterChange1 = (v: string) => {
    setIdInforme(v);
  };

  const handleFilterChange2 = (v: string) => {
    setIdTipoAuditoria(v);
  };

  const handleFilterChange3 = (v: string) => {
    setIdSector(v);
  };

  const handleFilterChange4 = (v: string) => {
    setIdEntidadFiscalizada(v);
  };
  

  const agregar = (data: any) => {
    AuditoriaService.Auditoriaindex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Registro Agregado!",
        });

      } else {
        Swal.fire(res.STRMESSAGE,  "¡Error!", "info");
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
      } else {
        Swal.fire(res.STRMESSAGE,  "¡Error!", "info");
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
      } 
    });
  };

  useEffect(() => {
    loadFilter(5);
    loadFilter(9);
    loadFilter(7);
    loadFilter(2);
    // if (dt === "") {
    // } else {
    //   setId(dt?.row?.id);
    //   setNombre(dt?.row?.Nombre);
    //   setDescripcion(dt?.row?.Descripcion);
    // }
  }, [dt]);

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
              required
              margin="dense"
              id="NAUDITORIA"
              label="N° de Auditoría"
              value={nombre}
              type="text"
              fullWidth
              variant="standard"
              onChange={(v) => (v.target.value)}
              error={nombre === "" ? true : false}
              InputProps={{
                readOnly: tipo === 1 ? false : true,
              }}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
             {/* <textarea
              id="PersonalEncargado"
              required
              spellCheck="true"
              rows={2}
              onChange={(v) => (v.target.value)}
              style={{ width: "100%" }}
            /> */}

<TextField
                        margin="dense"
                        id="NombreAudoria"
                        label="Nombre"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={nombre}
                        required
                        error={!nombre}
                        onChange={(v) => (v.target.value)}
                    />
              
             </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>  

            <TextField
                        margin="dense"
                        id="OFinicio"
                        label="Oficio"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={nombre}
                        required
                        error={!nombre}
                        onChange={(v) => (v.target.value)}
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
                        value={nombre}
                        required
                        error={!nombre}
                        onChange={(v) => (v.target.value)}
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
            <Typography sx={{ fontFamily: "sans-serif" }}>Entidad Fiscalizada:</Typography>
              <SelectFrag
                value={idEntidadFiscalizada}
                options={CatEntidadFiscalizada}
                onInputChange={handleFilterChange4}
                placeholder={"Seleccione entidad Fiscalizada"}
                disabled={false}
              />
              
             </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>  
            <Typography sx={{ fontFamily: "sans-serif" }}>Tipo de Auditoria:</Typography>
              <SelectFrag
                value={idTipoAuditoria}
                options={CatTipoAuditoria}
                onInputChange={handleFilterChange2}
                placeholder={"Seleccione Tipo de Auditoria"}
                disabled={false}
              />
             
              </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>  
            <Typography sx={{ fontFamily: "sans-serif" }}>Entrega:</Typography>
              <SelectFrag
                value={idInforme}
                options={CatInforme}
                onInputChange={handleFilterChange1}
                placeholder={"Seleccione Entrega"}
                disabled={false}
              />
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
