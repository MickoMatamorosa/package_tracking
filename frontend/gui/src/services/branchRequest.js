import axios from 'axios';
import { tokenConfig } from './headers';
import {userAuth} from './authRequest'
import auth from './auth'

// branch profile
export const branchProfile = () => {
    // user info instead branch if no branch
    return axios
        .get("/api/auth/branch", tokenConfig())
        .then(res => res.data[0])
        .catch(err => userAuth()
            .then(res => {
                if(res){
                    return ({ 
                        user: res.id,
                        name: "",
                        address: "" 
                    })
                }
            })
        )
}


// get receiving branch profile (UNUSED)
export const getReceiverBranch = id => {
    console.log("r", id);
    
    return axios
        .get(`/api/branch/others/${id}`, tokenConfig())
        .then(res => res.data.name)
        .catch(err => console.log(err))
}


// get sending branch profile (UNUSED)
export const getSenderBranch = id => {
    console.log("s", id);

    const path = `/api/branch?user=${id}`;
    return axios
        .get(path, tokenConfig())
        .then(res => res.data[0].name)
        .catch(err => console.log(err))
}


// saveUserProfile branch profile
export const saveUserProfile = body => {
    return branchProfile().then(res => {
        body.user = res.user;
        const strBody = JSON.stringify(body);
        const path = `/api/branch/${res.id}/`;
        return axios
            .patch(path, strBody, tokenConfig())
            .then(res => res.data)
            .catch(err => {
                return axios
                    .post(`/api/branch/`, strBody, tokenConfig())
                    .then(res => res.data)
                    .catch(err => err)
            })
    })
}

// branch all status flow
export const getBranchStatusFlow = () => {
    const path = "/api/branch/statusflow?ordering=branch_type";
    return axios
        .get(path, tokenConfig())
        .then(res => res.data)
        .catch(err => err)
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
export const getBranchPackages = (type, trace) => {
    let path = `/api/user/package?`;
    path += type ? `type=${type}` : '';
    path += type && trace ? '&' : '';
    path += trace ? `trace=${trace}` : '';
    return axios
        .get(path, tokenConfig())
        .then(res => res.data)
        .catch(err => err)
}


// get branches except the user
export const getOtherBranchPackages = () => {
    const path = "/api/branch/others";
    return axios
        .get(path, tokenConfig())
        .then(res => res.data)
        .catch(err => err)
}