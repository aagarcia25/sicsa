
export interface User{
    name?:string,
    email:string,
    password:string,
    repeatPassword?:string
 }
 
 export interface UserLogin{
    IdUsuario:string,
    NombreUsuario:string,
    exp:number,
    iat:number
 }
 
 export interface imagen {
    CreadoPor: string;
    Descripcion: string;
    FechaCreacion: string;
    FechaFin: string;
    FechaInicio: string;
    Imagen: string;
    ModificadoPor: string;
    Nombre: string;
    UltimaActualizacion: string;
    deleted: string;
    id: string;
  }
  
export interface ROLE {
    Nombre: string;
    Descripcion: string;
}

export interface MENU {
    Menu: string;
    Descripcion: string;
    ControlInterno: string;
    items: any;
}

export interface PERMISO {
    ControlInterno: string;
    Referencia: string;
    Menu: string;

}





export interface FPG {
    id: string;
    Clave: string;
    Descripcion: string;
    Anio: number;
    nummes: number;
    Mes: string;
    Total: string;
    estatus: string;
    FechaCreacion: string;
    Tipo: string;
}

export interface FPGDetalle {
    id: string;
    ClaveEstado: number;
    Nombre: string;
    idCalculoTotal: string;
    Mensual: string;
    PrimerAjuste: string;
    SegundoAjuste: string;
    TercerAjuste: string;
    CuartoAjuste: string;
    AjusteAnual: string;
    AjusteSemestral: string;
    AjusteDefinitivo: string;
    AjusteEstatal: string;
    AjusteFofir: string;
    CompensacionFEIF: string;
    RetencionFEIF: string;
    total: string;
    ComentarioPresupuesto?: any;
    RutaArchivo?: any;
}

export interface ITEMS {
    Id: string;
    deleted: string;
    UltimaActualizacion: string;
    FechaCreacion: string;
    ModificadoPor: string;
    CreadoPor: string;
    Menu: string;
    Descripcion: string;
    MenuPadre: string;
    Icon: string;
    Path: string;
    Nivel: number;
    Orden: number;
    ControlInterno: string;
    subitems: any[];
}

export interface PERFILES {
    Descripcion: string;
    Referencia: string;
}

export interface MUNICIPIO {
    id: string;
    Nombre: string;
}

export interface ORG {
    id: string;
    Descripcion: string;
}

export interface DEPARTAMENTOS {
    NombreCorto: string;
    Descripcion: string;
}


export interface RESPONSESTORAGE {
    NOMBRE: string;
    TIPO: string;
    SIZE: number;
    FILE: string;

}

export interface RESPONSEVIDEOS {
    NombreOriginalVideo: string;
    RutaVideo: string;


}

export interface RESPONSEPREGUNTASFRECUENTES {
    id: string;
    Pregunta: string;
    Texto: string;
}

export interface RESPONSEGUIARAPIDA {
    id: string;
    Pregunta: string;
    RutaGuia: string;
}

export interface USUARIORESPONSE {
      Id: string
  Nombre: string
  ApellidoPaterno: string
  ApellidoMaterno: string
  NombreUsuario: string
  CorreoElectronico: string
  Puesto: string
  CURP: string
  RFC: string
  Telefono: string
  Ext: string
  Celular: string
  IdTipoUsuario: string
  TipoUsuario: string
  EstaActivo: number
  PuedeFirmar: number
  UltimoInicioDeSesion: string
  Deleted: number
  IdApp: string
  Aplicacion: string
  IdEntidad: string
  Entidad: string
  ControlInternoEntidad: any
  IdEntidadPerteneceA: any
  EntidadPerteneceA: any
  IdTipoEntidad: string
  TipoEntidad: string
  RutaFoto: string
}

export interface UserInfo {
    NUMCODE: number;
    STRMESSAGE: string;
    RESPONSE: USUARIORESPONSE;
    SUCCESS: boolean;
}

export interface MunicipioCambios {
    id: number;
    deleted: string;
    UltimaActualizacion: string;
    FechaCreacion: string;
    ModificadoPor: string;
    CreadoPor: string;
    Anio?: number;
    Personas?: number;
    CarenciaProm?: number;
    IdMun?: string;
    Nombre?: string;
    Porcentaje?: string;
    ClaveBancaria?: string;
    Cuenta?: string;
    Importe?: string;
    Coeficiente?: string;
    Version?: string;
    Facturacion?: number;
    totalPob?: string;
    Total?: string;
    anio?: string;
    Pob?: string;
    Recaudacion?: string;
    Km2?: string;
    Mes?: string;
    Movimientos?: string;
    Mensual?: string;
    Anual?: string;
    Diario?: string;
}

export interface SolUser {
    data: any[];
}

export interface SolUserData {
    Respuesta: string;
    Mensaje: string;
    IdSolicitud: string;
}

export interface getDescuentos {
    id: string;
    Tipo: string;
    NumOperacion: number;
    total: string;
    OtrosCargos: string;
    ParcialDescuento: string;
    cveRetencion: number;
    DescripcionDescuento?: any;
}


export interface IndexPaRetenciones {
    id: string;
    Tipo: string;
    NumOperacion: number;
    total: string;
    OtrosCargos: string;
    ParcialDescuento: string;
    cveRetencion: number;
    DescripcionDescuento?: any;
    importe: number;
}