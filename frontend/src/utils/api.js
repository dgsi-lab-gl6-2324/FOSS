import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:5000"// Referencia a la url de la API
});