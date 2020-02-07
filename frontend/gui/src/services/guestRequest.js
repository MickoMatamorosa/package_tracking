import axios from 'axios';
import { config } from './headers';

const getStatusFlow = id => {
    const path = `api/guest/package/status/remarks?flow=${id}`;
    return axios
        .get(path, config)
        .then(res => res.data[0])
        .catch(err => err)
}

const getPackageStatus = id => {
    const path = `/api/guest/package/status?package=${id}`;
    return axios
        .get(path, config)
        .then(res => res.data)
        .then(res => {
            return res.map( obj => {
                return getStatusFlow(obj.status)
                .then(flow => ({...obj, flow}))
            })
        })
        .catch(err => err)
}

// get guest package (public)
export const getGuestPackage = trace => {
    const path = `/api/package?trace=${trace}`;
    return axios
        .get(path, config)
        .then(res => res.data[0])
        .then(res => {
            return getPackageStatus(res.id)
            .then(stats => ({...res, stats}))
        })
        .catch(err => err)
}

