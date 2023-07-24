
import { post, postDoc } from './apiService';

export class CatalogosServices {

    public static async aniosindex(data : any) {
        return await post('aniosindex', data);
    };

    public static async Entidad_Fiscalizada_index(data : any) {
        return await post('Entidad_Fiscalizada_index', data);
    };


    public static async Estatus_Acciones_index(data : any) {
        return await post('Estatus_Acciones_index', data);
    };


    public static async Grupo_Funcional_index(data : any) {
        return await post('Grupo_Funcional_index', data);
    };


    public static async Informes_index(data : any) {
        return await post('Informes_index', data);
    };


    public static async Origen_Auditoria_index(data : any) {
        return await post('Origen_Auditoria_index', data);
    };


    public static async Sector_index(data : any) {
        return await post('Sector_index', data);
    };


    public static async TiposAccion_index(data : any) {
        return await post('TiposAccion_index', data);
    };


    public static async Tipos_Auditoria_index(data : any) {
        return await post('Tipos_Auditoria_index', data);
    };


    public static async Unidad_Admin_Auditora_index(data : any) {
        return await post('Unidad_Admin_Auditora_index', data);
    };

    public static async Ramo_index(data : any) {
        return await post('Ramo_index', data);
    };


}
