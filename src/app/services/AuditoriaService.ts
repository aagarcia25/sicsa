
import { post } from './apiService';

export class AuditoriaService {

    public static async Auditoriaindex(data : any) {
        return await post('Auditoriaindex', data);
    };




}
