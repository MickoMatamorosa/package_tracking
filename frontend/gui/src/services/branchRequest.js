import axios from 'axios';
import { config, tokenConfig } from './headers'

// branch profile
export const branchProfile = () => {
    return axios
        .get("/api/auth/branch", tokenConfig())
        .then(res => res.data[0])
        .catch(err => err)
}

// branch first login


// update branch profile
export const updateUserProfile = body => {
    const strBody = JSON.stringify(body);
    return branchProfile().then(res => {
        return axios
            .patch(`/api/branch/${res.id}/`, strBody, tokenConfig())
            .then(res => res.data)
            .catch(err => err)
    })
}

// branch all status flow
export const getBranchStatusFlow = () => {
    return axios
        .get("/api/branch/statusflow", tokenConfig())
        .then(res => res.data)
        .catch(err => err)
}

// create status flow


// update status flow


// delete status flow


// get branch sending packages


// get branch receiving packages