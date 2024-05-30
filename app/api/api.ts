import axios from "axios";

export const footballApi = axios.create({
        baseURL: process.env.EXTERNAL_API_BASEURL as string,
        headers: {
                "X-RapidAPI-Key":  process.env.EXTERNAL_API_KEY as string,
                "X-RapidAPI-Host": process.env.EXTERNAL_API_HOST as string,
                "Content-Type": "application/json",
                "timeout" : 5000,
        }
})




