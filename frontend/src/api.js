import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: { 'Content-Type': 'application/json' },
});

// Store the access token in a local variable (memory), NOT localStorage
let currentAccessToken = null;

export const setAxiosToken = (token) => {
    currentAccessToken = token;
};

// 1. Intercept every outbound request to attach the access token
api.interceptors.request.use(
    (config) => {
        if (currentAccessToken) {
            config.headers['Authorization'] = `Bearer ${currentAccessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 2. Intercept incoming errors. If we get a 401 (Expired Token), silently fetch a new one.
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) throw new Error("No refresh token available");

                // Hit the backend refresh endpoint
                const res = await axios.post('http://127.0.0.1:8000/auth/refresh/', { 
                    refresh: refreshToken 
                });
                
                // Update the token in memory and retry the failed request
                currentAccessToken = res.data.access;
                originalRequest.headers['Authorization'] = `Bearer ${currentAccessToken}`;
                return api(originalRequest);
                
            } catch (err) {
                // If the refresh token is dead or blacklisted, wipe everything and boot the user
                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default api;