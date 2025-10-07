    import axios from "axios";

   export const axiosInstance = axios.create({
        baseURL: "https://6f23c0203bf8.ngrok-free.app/",
        headers: {
            "Content-Type": "application/json",
            'ngrok-skip-browser-warning': 'true',
        },
        // timeout: 10000, // Set a timeout of 10 seconds
    })


    axiosInstance.interceptors.request.use(
        (config) => {
            const token = sessionStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

