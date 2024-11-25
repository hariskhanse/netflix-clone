import axios from 'axios'
import { ENV_VARs } from '../config/envVar.js';

export const fetchFromTMBD = async (url) => {
    try {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + ENV_VARs.TMBD_API_KEY
            }
        };

        const response = await axios.get(url, options);

        if (response.status !== 200) {
            throw new Error('Failed to fetch data from TMBD');
        }

        return response.data;

    } catch (error) {
        console.log(error);
        throw error;
    }
};