// Package
export const package = tracking => {
  return axios
    .get(`/api/package/${tracking}`)
    .then(res => res.data)
    .catch(err => err)
}