import axios from 'axios'

const config = { headers: { "Content-Type": "application/json" } };


// LOGIN USER
export const login = async (username, password) => {
    const body = JSON.stringify({ username, password });
    return await axios
        .post("/api/auth/login", body, config)
        .then(res => {
            localStorage.setItem('token', res.data.token)
            return res.data
        })
        .catch(err => false);
}


// USER
export const userAuth = () => {
  return axios
    .get("/api/auth/user", tokenConfig())
    .then(res => res.data)
    .catch(err => err)
}


// LOGOUT USER
export const logout = () => {
  return axios
    .post("/api/auth/logout/", null, tokenConfig())
    .then(res => {
      localStorage.clear()
      return res.data
    })
    .catch(err => console.log(err));
};


// Setup config with token - helper function
const tokenConfig = () => {
  // Get token from state
  const token = localStorage.getItem('token');

  // Headers
  const configs = config

  // If token, add to headers config
  if (token) {
    configs.headers["Authorization"] = `Token ${token}`;
  }

  return configs;
};
  