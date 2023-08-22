const API_URL = "http://localhost:3000/train"


const getTrains = async () => {
    try {
        const {data} = await axios.get(API_URL);
        return data;
    } catch (error) {
        console.log(error);

    }
}

const getTrain = async (id) => {
    try {
        const {data} = await axios.get(`${API_URL}/${id}`);
        return data;
    } catch (error) {
        console.log(error);

    }
}