
import axios from "axios"
const API_URL = "http://localhost:3000/train"



export const getTrains = async () => {
    try {
        const {data} = await axios.get(API_URL);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);

    }
}

export const getTrain = async (id) => {
    try {
        const {data} = await axios.get(`${API_URL}/${id}`);
        
        return data;
    } catch (error) {
        console.log(error);
    }
}