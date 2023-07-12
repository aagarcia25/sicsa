import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import { getUser } from '../services/localStorage';
import Bienvenido from '../views/Bienvenido';
import { Eo404 } from '../views/Eo404';
import Inicio from '../views/Inicio';
import { Perfil } from '../views/perfil/Perfil';
import { AuthRouter } from './AuthRouter';
import { Anios } from '../views/CatAnio/Anios';
import { RESPONSE, RESPONSESTORAGE } from '../interfaces/UserInfo';

export const AppRouter = (
  {
    login
  }
    :
    {
      login: boolean
    }

) => {
  const log = login;
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [responseStorage, setResponseStorage] = useState<RESPONSESTORAGE>();
  const [ClearresponseStorage, setClearResponseStorage] = useState<RESPONSESTORAGE>();

  const handleCloseModal = () => {
  };
  const handleChangeImg = () => {
    GetImage("/FOTOPERFIL/", user.RutaFoto)
  };

  const GetImage = (tipo: string, nameImagen: string) => {
    AuthService.GetImagenProfile(tipo, nameImagen).then((res) => {
      if (res.SUCCESS) {
        setResponseStorage(res.RESPONSE.RESPONSE);
      }
      else {
        setResponseStorage(responseStorage);
      }
    });
  };

  useEffect(() => {
    handleChangeImg();
  }, []);

  return (
    <Inicio user={user} imgData={String(responseStorage?.FILE)} imgTipo={String(responseStorage?.TIPO)}>

      <Routes>
        <Route path='/*' element={log ? <Eo404 /> : <AuthRouter />} />
        <Route path='/' element={log ? <Bienvenido user={user} /> : <AuthRouter />} />
        {/* SECCION DE CATALOGOS */}
        <Route path='/inicio/catalogos/anio' element={<Anios />} />
        {/* FIN SECCION DE CATALOGOS */}

        {/* SECCION DE CALENDARIO */}
        {/* <Route path='/Calendario' element={<CalendarC />} /> */}
        {/* FIN SECCION DE CALENDARIO */}

        {/* SECCION DE NOTIFICACIONES */}
        {/* <Route path='/Notification' element={<ListNotification />} /> */}
        {/* FIN SECCION DE NOTIFICACIONES */}

        {/* SECCION DE PERFIL */}
        <Route path='/perfil' element={<Perfil handleChangeImg={handleChangeImg} imgData={String(responseStorage?.FILE)} imgTipo={String(responseStorage?.TIPO)} />} />
        {/* FIN SECCION DE PERFIL */}

      

      </Routes>
    </Inicio>
  );
};
