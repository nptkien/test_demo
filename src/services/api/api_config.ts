import axios, { AxiosRequestConfig, HttpStatusCode, ResponseType } from "axios";
import { REACT_APP_PREFIX_API, REACT_APP_ENDPOINT } from '@env';
import * as LocalStorage from '../../utils/storage';
import ApiError from "../../models/ApiError";
const axiosInstance = axios.create();
// axiosInstance.defaults.baseURL = `${REACT_APP_PREFIX_API}/`;
axiosInstance.defaults.baseURL = ` https://random-data-api.com/api/users/`;

axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.timeout = 20000;
axiosInstance.defaults.headers.common = { "Content-Type": "application/json" };
// Set the AUTH token for any request
const getTokenFromStorage = async () => {
    try {
        const token = await LocalStorage.load('token');
        return token;
    } catch (error) {
        console.error('Lỗi khi lấy token từ AsyncStorage:', error);
        return null;
    }
};

// Hàm để thêm trường Authorization vào header của Axios
const addAuthorizationHeader = async () => {
    const token = await getTokenFromStorage();
    console.log(token);

    if (token) {
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axiosInstance.interceptors.request.use(function (config) {
            config.headers.Authorization = token ? `Bearer ${token}` : '';
            return config;
        });
    }
};
// addAuthorizationHeader();
export const ApiConfig = async (url: string, payload?: any, _method = "POST", responseType?: ResponseType, params?: any) => {
    const method = _method.toLowerCase() as AxiosRequestConfig["method"];
    const config: AxiosRequestConfig = {
        url,
        method,
        data: payload,
        params,
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
    } else if (method === "get") {
        console.log("VAOOOOOOOOO", REACT_APP_PREFIX_API);
        console.log(url);
        console.log(axiosInstance.getUri());

        console.log(params);
        return axios({
            method: "GET",
            // params: {"size": 10},
            baseURL: "https://random-data-api.com/api/users/",
            url: "random_user?size=10"
        }).then(response => {
            return response.data;

        }).catch(err => {
            console.log("loi roi", {...err});

        })
        return axiosInstance.get(`${url}`,
            {
                params,
            }).then(response => {
                console.log("vai");

                console.log(axiosInstance.getUri());

                if (response.status === HttpStatusCode.Ok) {
                    return response.data;
                } else if (response.status === HttpStatusCode.Forbidden) {
                    return new ApiError({ status: HttpStatusCode.Forbidden, message: "Forbidden" })
                }
                return response.data
            })
            .catch(error => {
                console.log("oi zoi oi", {...error});

                return error
            });
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
