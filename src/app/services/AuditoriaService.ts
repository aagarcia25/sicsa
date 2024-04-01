import { post, postReporte } from "./apiService";

export class AuditoriaService {
  public static async Auditoriaindex(data: any) {
    return await post("Auditoriaindex", data);
  }

  public static async Notificacionindex(data: any) {
    return await post("Notificacionindex", data);
  }

  public static async Contestacionindex(data: any) {
    return await post("Contestacionindex", data);
  }

  public static async Acciones_index(data: any) {
    return await post("Acciones_index", data);
  }

  public static async OficiosA_index(data: any) {
    return await post("OficiosA_index", data);
  }

  public static async planindex(data: any) {
    return await post("planindex", data);
  }

  public static async planAnualindex(data: any) {
    return await post("planAnualindex", data);
  }

  public static async OrganoRindex(data: any) {
    return await post("OrganoRindex", data);
  }

  public static async OrganoCindex(data: any) {
    return await post("OrganoCindex", data);
  }

  public static async ReportesIndex(data: any) {
    return await post("ReportesIndex", data);
  }

  public static async Foliosindex(data: any) {
    return await post("Foliosindex", data);
  }

  public static async FoliosFilesindex(data: any) {
    return await post("FoliosFilesindex", data);
  }

  public static async ReportesIndex2(data: any) {
    return await postReporte("ReportesIndex", data);
  }

  public static async informes(data: any) {
    return await post("informes", data);
  }
}
