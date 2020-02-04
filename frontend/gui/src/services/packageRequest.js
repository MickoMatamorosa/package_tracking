import axios from 'axios';
import { config, tokenConfig } from './headers';
import {userAuth} from './authRequest'

// get package status
export const getPackage = trace => {
    let api = `/api/user/package?tracking_number=${trace}`;
    return axios
        .get(api, tokenConfig())
        .then(res => res.data)
        .catch(err => err)
}

// next package status


// back to previous status