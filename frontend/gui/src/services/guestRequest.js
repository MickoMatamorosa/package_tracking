// Package
export const userAuth = tracking => {
  return axios
    .get(`/api/package/${tracking}`)
    .then(res => res.data)
    .catch(err => err)
}