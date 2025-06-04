import axios from "axios";
import { baseURL } from "./utils/config.js";

const api = axios.create({
    baseURL
});

export const googleAuth = (code) => api.get(`user/oauth?code=${code}`);
