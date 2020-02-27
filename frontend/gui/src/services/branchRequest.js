import axios from 'axios';
import { tokenConfig } from './headers';
import {userAuth} from './authRequest'
import auth from './auth'

// branch profile
export const branchProfile = () => {
    // user info instead branch if no branch
    const path = `/api/branch/${auth.user}/`;

    return axios
        .get(path, tokenConfig())
        .then(res => res.data)
        .catch(err => userAuth()
            .then(res => res && ({
                user: res.id,
                name: "",
                address: ""
            }))
        )
}


// saveUserProfile branch profile
export const saveUserProfile = body => {
    const user = auth.user
    const strBody = JSON.stringify({...body, user});
    const path = `/api/branch/${user}/`;
    return axios
        .patch(path, strBody, tokenConfig())
        .then(res => res.data)
        .catch(err => {
            return axios
                .post(`/api/branch/`, strBody, tokenConfig())
                .then(res => res.data)
        })
}

// branch all status flow
export const getBranchStatusFlow = () => {
    const path = "/api/branch/statusflow";
    return axios
        .get(path, tokenConfig())
        .then(res => res.data)
}

// branch all status flow
export const getBranchStatusFlowByType = (id, type) => {
    const path = `/api/branch/statusflow?branch=${id}&branch_type=${type}`;
    return axios
        .get(path, tokenConfig())
        .then(res => res.data)
        .catch(err => err)
}

// create status flow
export const addBranchStatusFlow = body => {
    const strBody = JSON.stringify(body);
    const path = "/api/branch/statusflow/";
    return axios
        .post(path, strBody, tokenConfig())
        .then(res => res.data)
        .catch(err => err)
}


// update status flow
export const updateStatusFlow = body => {
    const strBody = JSON.stringify(body);
    const path = `/api/branch/statusflow/${body.id}/`;
    return axios
        .patch(path, strBody, tokenConfig())
        .then(res => res.data)
        .catch(err => err)
}


// delete status flow
export const deleteStatusFlow = id => {
    const path = `/api/branch/statusflow/${id}`;
    return axios
        .delete(path, tokenConfig())
        .then(res => {
            console.log(id, "has been deleted");
        })
        .catch(err => err)
}


// get branch packages
export const getBranchPackages = (params) => {
    const queryString = Boolean(params)
        ? Object.keys(params).map(key => key + '=' + params[key]).join('&')
        : "";

    let path = `/api/user/package?${queryString}`;

    return axios
        .get(path, tokenConfig())
        .then(res => res.data)
}


// get branches except the user
export const getOtherBranchPackages = () => {
    const path = "/api/branch/others";
    return axios
        .get(path, tokenConfig())
        .then(res => res.data)
}
