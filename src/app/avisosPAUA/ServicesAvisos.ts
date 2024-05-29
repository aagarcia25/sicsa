import axios from "axios"
import { getIdApp } from "../services/localStorage";

export const servicesAvisosPAUA={
    getAvisos: async ()=>{
        try {
            const response = await axios.get(process.env.REACT_APP_APPLICATION_BASE_URL_EXT + '/AdminAvisosVigentes', 
            {params:{'IdApp':JSON.parse(String(getIdApp()))}});//process.env.REACT_APP_APPLICATION_LOGIN 
            return response.data;
          } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
          }
    }
}