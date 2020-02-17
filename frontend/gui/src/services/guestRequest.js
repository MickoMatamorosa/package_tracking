import axios from 'axios';
import { config } from './headers';

// get guest package status (public)
export const getGuestPackageStatus = trace => {
    const path = `/api/guest/package/${trace}`;
    
    return axios
        .get(path, config)
        .then(res => res.data)
}

