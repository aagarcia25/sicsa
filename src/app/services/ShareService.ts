
import { post } from './apiService';

export class ShareService {

    public static async SelectIndex(data : any) {
        return await post('SelectIndex', data);
    };

    


}