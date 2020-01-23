import axios from 'axios'

const config = { headers: { "Content-Type": "application/json" } };

export const login = async (username, password) => {
    const body = JSON.stringify({ username, password });
    return await axios
        .post("/api/auth/login", body, config)
        .then(res => res.data)
        .catch(err => console.log(err));
}