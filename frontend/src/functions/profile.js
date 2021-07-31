import axios from "axios"
import { setHeaders, url } from "../api/api"

export const createProfile = async (profile) => {
    return await axios.post(`${url}/profile`, profile, setHeaders())
}