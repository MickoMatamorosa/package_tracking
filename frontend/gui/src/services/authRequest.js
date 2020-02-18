import axios from 'axios';
import { config, tokenConfig } from './headers'

// LOGIN USER
export const login = async (username, password) => {
    const body = JSON.stringify({ username, password });
    return await axios
        .post("/api/auth/login", body, config)
        .then(res => {
            localStorage.setItem('token', res.data.token)
            return res.data
        }).catch(() => false);
}


// USER
export const userAuth = () => {
  return axios
    .get("/api/auth/user", tokenConfig())
    .then(res => res.data)
    .catch(() => {
      localStorage.clear();
      return false
    })
}


// LOGOUT USER
export const logout = () => {
  localStorage.clear()
  return axios
    .post("/api/auth/logout/", null, tokenConfig())
    .then(res => res.data)
    .catch(() => false);
};


// CHANGE PASSWORD
export const changePass = body => {
  const strBody = JSON.stringify(body);
  const path = "/api/auth/change-password";

  return axios.patch(path, strBody, tokenConfig())
}