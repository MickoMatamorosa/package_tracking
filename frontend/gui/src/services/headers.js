// common header post
export const config = { headers: { "Content-Type": "application/json" } };

// Setup config with token - helper function
export const tokenConfig = () => {
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
