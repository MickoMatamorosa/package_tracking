import axios from 'axios';
import { config } from './headers';

// get guest package remarks (public)
export const getGuestPackageStatusRemarks = trace => {
    const path = `/api/guest/package/status/remarks?trace=${trace}`;
    return axios
        .get(path, config)
        .then(res => res.data)
}


// get guest package status (public)
export const getGuestPackageStatus = trace => {
    const path = `/api/guest/package/status?trace=${trace}`;
    return axios
        .get(path, config)
        .then(res => res.data)
}

