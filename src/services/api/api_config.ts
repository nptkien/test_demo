import axios, { AxiosRequestConfig, HttpStatusCode, ResponseType } from "axios";
import { REACT_APP_PREFIX_API, REACT_APP_ENDPOINT } from '@env';

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = `${REACT_APP_PREFIX_API}/${REACT_APP_ENDPOINT}`;
axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.timeout = 20000;
axiosInstance.defaults.headers.common = { "Content-Type": "application/json" };
// Set the AUTH token for any request
axiosInstance.interceptors.request.use(function (config) {
    // const token = localStorage.getItem('token');
    const token = "token";
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});
export const ApiConfig = async (url: string, payload?: any, _method = "POST", responseType?: ResponseType) => {
    const method = _method.toLowerCase() as AxiosRequestConfig["method"];
    const config: AxiosRequestConfig = {
        url,
        method,
        data: payload
    };
    if (responseType) config.responseType = responseType;
    if (method === 'post') {
        return axiosInstance.post(`${url}`, payload, config)
            .then(response => {
                console.log(response);
                if (response.status === HttpStatusCode.Ok) {
                    return response.data;
                }
                return response
            })
            .catch(error => error);
    } else {
        return axiosInstance.request(config);
    }
}

export const ApiUploadFile = async (url: string, file: string | Blob, fieldName = "file") => {
    const formData = new FormData();
    formData.append(fieldName, file)
    return axiosInstance.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}
