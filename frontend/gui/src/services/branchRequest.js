import axios from 'axios';
import { config, tokenConfig } from './headers'

// branch profile
export const branchProfile = () => {
    return axios
        .get("/api/branch", tokenConfig())
        .then(res => res.data[0])
        .catch(err => err)
}

// branch first login


// update branch profile


// branch all status flow


// create status flow


// update status flow


// delete status flow


// get branch sending packages


// get branch receiving packages