import { postReporte } from "../../services/apiService";

export class ReporteService{

    public static async ReportesIndex(data: any){
        return await postReporte('ReportesIndex', data);
    }

    

}