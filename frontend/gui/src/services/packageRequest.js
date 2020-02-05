import axios from 'axios';
import { tokenConfig } from './headers';
import { userAuth } from './authRequest'

// add new package
export const addPackage = body => {
    return userAuth().then(res => {
        body.from_branch = res.id
        const strBody = JSON.stringify(body);
        return axios
            .post(`/api/user/package/`, strBody, tokenConfig())
            .then(res => res.data)
            .catch(err => err)
    })
}

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