import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { RESPONSESTORAGE, USUARIORESPONSE } from "../interfaces/UserInfo";
import { AuthService } from "../services/AuthService";
import { getUser } from "../services/localStorage";
import AdminAyudas from "../views/AdminVideosTutoriales/AdminAyudas";
import { Auditoria } from "../views/Auditoria/Auditoria";
import Bienvenido from "../views/Bienvenido";
import { Anios } from "../views/CatAnio/Anios";
import { CatAreaAuditora } from "../views/CatAreaAuditora/CatAreaAuditora";
import { EntidadFiscalizada } from "../views/CatEntidadFiscalizada/EntidadFiscalizada";
import { EstatusAcciones } from "../views/CatEstatusAcciones/EstatusAcciones";
import { GrupoFuncional } from "../views/CatGrupoFuncional/GrupoFuncional";
import { Informe } from "../views/CatInforme/Informe";
import { Modalidad } from "../views/CatModalidad/Modalidad";
import { Municipio } from "../views/CatMunicipios/Municipio";
import { OrigenAuditoria } from "../views/CatOrigenAuditoria/OrigenAuditoria";
import { Ramo } from "../views/CatRamo/Ramo";
import { Sector } from "../views/CatSector/Sector";
import { TipoAccion } from "../views/CatTipoAccion/TipoAccion";
import { TipoAuditoria } from "../views/CatTipoAuditoria/TipoAuditoria";
import { UnidadAdminAuditora } from "../views/CatUnidadAdminAuditora/UnidadAdminAuditora";
import { Eo404 } from "../views/Eo404";
import Inicio from "../views/Inicio";
import { PTA } from "../views/PlanAnual/PTA";
import { Perfil } from "../views/perfil/Perfil";
import { AuthRouter } from "./AuthRouter";
import { Dash } from "../views/Dashboard/Dash";
import { Reportes } from "../views/Reportes/Reportes";
import { ControlOficios } from "../views/ControlOficios/ControlOficios";
import { Personal } from "../views/Personal/Personal";
//import ButtonsTutorial from "../views/componentes/ButtonsTutorial";

export const AppRouter = ({ login }: { login: boolean }) => {
  const log = login;
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [responseStorage, setResponseStorage] = useState<RESPONSESTORAGE>();
  const [ClearresponseStorage, setClearResponseStorage] =
    useState<RESPONSESTORAGE>();

  const handleCloseModal = () => { };
  const handleChangeImg = () => {
    //GetImage("/FOTOPERFIL/", user.RutaFoto)
  };

  const GetImage = (tipo: string, nameImagen: string) => {
    AuthService.GetImagenProfile(tipo, nameImagen).then((res) => {
      if (res.SUCCESS) {
        setResponseStorage(res.RESPONSE.RESPONSE);
      } else {
        setResponseStorage(responseStorage);
      }
    });
  };

  useEffect(() => {
    handleChangeImg();
  }, []);

  return (
    <Inicio
      user={user}
      imgData={String(responseStorage?.FILE)}
      imgTipo={String(responseStorage?.TIPO)}
    >
      <Routes>
        <Route path="/*" element={log ? <Eo404 /> : <AuthRouter />} />
        <Route
          path="/"
          element={log ? <Bienvenido user={user} /> : <AuthRouter />}
        />

        <Route
          path="/inicio/folios"
          element={log ? <ControlOficios /> : <AuthRouter />}
        />

        {/* SECCION ADMINISTRACION AUDITORIA */}
        <Route
          path="/inicio/admin/dash"
          element={log ? <Dash /> : <AuthRouter />}
        />
        <Route
          path="/inicio/admin/ad"
          element={log ? <Auditoria /> : <AuthRouter />}
        />
        {/* FIN SECCION ADMINISTRACION AUDITORIA */}
        {/* SECCION DE CATALOGOS */}
        <Route
          path="/inicio/catalogos/anio"
          element={log ? <Anios /> : <AuthRouter />}
        />
        <Route
          path="/inicio/catalogos/ef"
          element={log ? <EntidadFiscalizada /> : <AuthRouter />}
        />
        <Route
          path="/inicio/catalogos/ea"
          element={log ? <EstatusAcciones /> : <AuthRouter />}
        />
        <Route
          path="/inicio/catalogos/gf"
          element={log ? <GrupoFuncional /> : <AuthRouter />}
        />
        <Route
          path="/inicio/catalogos/informe"
          element={log ? <Informe /> : <AuthRouter />}
        />
        <Route
          path="/inicio/catalogos/oa"
          element={log ? <OrigenAuditoria /> : <AuthRouter />}
        />
        <Route
          path="/inicio/catalogos/sector"
          element={log ? <Sector /> : <AuthRouter />}
        />
        <Route
          path="/inicio/catalogos/ta"
          element={log ? <TipoAccion /> : <AuthRouter />}
        />
        <Route
          path="/inicio/catalogos/tauditoria"
          element={log ? <TipoAuditoria /> : <AuthRouter />}
        />
        <Route
          path="/inicio/catalogos/uaa"
          element={log ? <UnidadAdminAuditora /> : <AuthRouter />}
        />
        <Route
          path="/inicio/catalogos/ramo"
          element={log ? <Ramo /> : <AuthRouter />}
        />
        <Route
          path="/inicio/catalogos/uau"
          element={log ? <CatAreaAuditora /> : <AuthRouter />}
        />
        <Route path="/inicio/pta" element={log ? <PTA /> : <AuthRouter />} />
        <Route
          path="/inicio/catalogos/municipio"
          element={log ? <Municipio /> : <AuthRouter />}
        />
        <Route
          path="/inicio/catalogos/modalidad"
          element={log ? <Modalidad /> : <AuthRouter />}
        />

        <Route
          path="/inicio/catalogos/personal"
          element={log ? <Personal /> : <AuthRouter />}
        />

        {/* <Route
          path="/inicio/ayuda" element={log ? <ButtonsTutorial route={""} handleCloseMenuVideos={Function} /> : <AuthRouter />}
        /> */}

        <Route
          path="/inicio/ayuda"
          element={
            log ? (
              <AdminAyudas
                IdMenu={""}
                modo={""}
                tipo={0}
                handleClose={handleCloseModal}
                dt={undefined}
              />
            ) : (
              <AuthRouter />
            )
          }
        />


        <Route
          path="/inicio/admin/reportes"
          element={log ? <Reportes /> : <AuthRouter />}
        />

        {/* SECCION DE PERFIL */}
        <Route
          path="/perfil"
          element={
            <Perfil
              handleChangeImg={handleChangeImg}
              imgData={String(responseStorage?.FILE)}
              imgTipo={String(responseStorage?.TIPO)}
            />
          }
        />
        {/* FIN SECCION DE PERFIL */}
      </Routes>
    </Inicio>
  );
};
