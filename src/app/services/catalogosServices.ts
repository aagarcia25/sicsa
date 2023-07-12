
import { post, postDoc } from './apiService';

export class CatalogosServices {

    public static async aniosindex(data : any) {
        return await post('aniosindex', data);
    };



}
