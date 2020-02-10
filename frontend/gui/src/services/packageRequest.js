import axios from 'axios';
import { config, tokenConfig } from './headers';
import { userAuth } from './authRequest'

// add new package
export const addPackage = body => {
    return userAuth().then(res => {
        body.from_branch = res.id
        const strBody = JSON.stringify(body);
        const path = `/api/user/package/`;
        return axios
            .post(path, strBody, tokenConfig())
            .then(res => res.data)
            .catch(err => err)
    })
}

// get package status by user (private)
export const getPackage = trace => {
    const path = `/api/user/package?trace=${trace}`;
    return axios
        .get(path, tokenConfig())
        .then(res => res.data)
        .catch(err => err)
}


// get package status flow
export const getPackageStatus = id => {
    if(id){
        const path = `/api/package/status?package=${id}`;
        return axios
            .get(path, tokenConfig())
            .then(res => res.data)
            .catch(err => err)
    }
}


// next package status


// back to previous status