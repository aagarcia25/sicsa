
import { post } from './apiService';

export class AuditoriaService {

    public static async Auditoriaindex(data : any) {
        return await post('Auditoriaindex', data);
    };

    public static async Notificacionindex(data : any) {
        return await post('Notificacionindex', data);
    };

    public static async Contestacionindex(data : any) {
        return await post('Contestacionindex', data);
    };
    
    public static async Filesindex(data : any) {
        return await post('Filesindex', data);
    };

    public static async Acciones_index(data : any) {
        return await post('Acciones_index', data);
    };
    
    public static async OficiosA_index(data : any) {
        return await post('OficiosA_index', data);
    };
    
    public static async planindex(data : any) {
      return await post('planindex', data);
    };

    public static async planAnualindex(data : any) {
      return await post('planAnualindex', data);
    };

    public static async OrganoRindex(data : any) {
        return await post('OrganoRindex', data);
    };

    public static async OrganoCindex(data : any) {
        return await post('OrganoCindex', data);
    };

}
