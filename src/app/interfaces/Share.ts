export default interface SelectValues {
    value: string,
    label?: string
}


export interface MigraData {
    NUMCODE: number
    STRMESSAGE: string
    RESPONSE: resultmigracion[]
    SUCCESS: boolean
  }
  
  export interface resultmigracion {
    IDENTIFICADORC: string
  }
  
  export interface ItrazabilidadFile {
    id: string;
    FechaCreacion: string;
    Nombre: string;
    estatus: string;
}