//TOKEN
export const setToken = (user: any) => localStorage.setItem('token', JSON.stringify(user));
export const getToken = () => localStorage.getItem('token');
export const setRfToken = (user: any) => localStorage.setItem('Rftoken', JSON.stringify(user));
export const getRfToken = () => localStorage.getItem('Rftoken');
//IDAPP
export const setIdApp = (data: any) => localStorage.setItem('idapp', JSON.stringify(data));
export const getIdApp = () => localStorage.getItem('idapp');
// USUARIOS
export const setUser = (user: any) => localStorage.setItem('user', JSON.stringify(user));
export const getUser = () => localStorage.getItem('user');
// PERMISOS
export const setPermisos = (permisos: any) => localStorage.setItem('permisos', JSON.stringify(permisos));
export const getPermisos = () => ((localStorage.getItem('permisos')===undefined)?  []: localStorage.getItem('permisos'));
// ROLES
export const setRoles = (roles: any) => localStorage.setItem('roles', JSON.stringify(roles));
export const getRoles = () => localStorage.getItem('roles');
// MENUS
export const setMenus = (menus: any) => localStorage.setItem('menus', JSON.stringify(menus));
export const getMenus = () => localStorage.getItem('menus');
//// foto perfil
export const setPerfilFoto = (perfiles: any) => localStorage.setItem('perfilFoto', JSON.stringify(perfiles));
export const getPerfilFoto = () => localStorage.getItem('perfilFoto');
// DEPARTAMENTO
export const setDepartamento = (departamento: any) => localStorage.setItem('departamento', JSON.stringify(departamento));
export const getDepartamento = () => localStorage.getItem('departamento');


//IDENTIFICAR QUE EL USUARIO YA ESTA LOGEADO
export const setlogin = (data: any) => {
  localStorage.setItem('login', JSON.stringify(data));
};
export const getlogin = () => localStorage.getItem('login');
export const islogin = (): boolean => {
  return getlogin() ===  'true' ? true : false;
};


export const validaLocalStorage = (name: string): boolean => {
  return localStorage.getItem(name) ? true : false;
};


export const getItem = (item:string ) :string => {
  return String(localStorage.getItem(item));
 }



  
 
