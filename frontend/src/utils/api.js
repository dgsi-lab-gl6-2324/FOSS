import axios from "axios";
import { baseURL } from "../config";

export default axios.create({
    baseURL: baseURL// Referencia a la url de la API
});