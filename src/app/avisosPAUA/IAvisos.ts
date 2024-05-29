export interface IAviso {
  Titulo: string;
  Id: string;
  IdApp: string;
  CreadoPor: string;
  ModificadoPor: string;
  FechaDeCreacion: string; // Formato ISO 8601: "YYYY-MM-DDTHH:MM:SS.sssZ"
  UltimaModificacion: string; // Formato ISO 8601: "YYYY-MM-DDTHH:MM:SS.sssZ"
  Deleted: string; // Podría ser booleano dependiendo de la lógica de tu aplicación
  TextoInc: string;
  FechaInicio: string; // Puede que necesites un tipo más específico dependiendo del formato de fecha
  FechaFin: string; // Puede que necesites un tipo más específico dependiendo del formato de fecha
}
