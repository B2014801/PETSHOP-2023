import axios from 'axios';

const commonConfig = {
    headers: {
        Accept: 'application/json',
    },
};

export default (baseURL) => {
    const instance = axios.create({
        baseURL,
    });

    // Add an interceptor to transform requests
    instance.interceptors.request.use((config) => {
        // Check if the request data is FormData (multipart form data)
        if (config.data instanceof FormData) {
            // Set the appropriate content type for multipart form data
            config.headers['Content-Type'] = 'multipart/form-data';
        } else {
            // Set the content type for JSON
            config.headers['Content-Type'] = 'application/json';
        }

        return config;
    });

    // Apply common configuration
    instance.defaults.headers = {
        ...instance.defaults.headers,
        ...commonConfig.headers,
    };

    return instance;
};
