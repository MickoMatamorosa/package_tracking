import axios from 'axios';
import { tokenConfig } from './headers';
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
    })
}


export const cancelPackage = id => {
    const body = JSON.stringify({cancel: true});
    const path = `/api/package/${id}/`;
    return axios
        .patch(path, body, tokenConfig())
        .then(res => res.data)
}


// get package status by user
export const getPackage = trace => {
    const path = `/api/user/package?trace=${trace}`;
    return axios
        .get(path, tokenConfig())
        .then(res => res.data)
}


// get package status flow
export const getPackageStatus = id => {
    if(id){
        const path = `/api/package/status?package=${id}`;
        return axios
            .get(path, tokenConfig())
            .then(res => res.data)
    }
}


// next package status
export const doneStatus = (pack_id, stat_id) => {
    const body = JSON.stringify({remarks: 'done'});
    const path = `/api/package/status/${stat_id}/?package=${pack_id}`;
    
    // update current status to done
    return axios.patch(path, body, tokenConfig())
        .then(res => res.data)
}


// back to previous status
export const previousStatus = (pack_id, stat_id) => {
    const path = `/api/package/status/${stat_id}/?package=${pack_id}`;

    return axios.delete(path, tokenConfig())
        .then(res => res.data)
        .catch(err => err)
}