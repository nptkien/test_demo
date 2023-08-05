import { ApiConfig } from "./api_config"
import Endpoint from "./end_point";
export const apiLogin = async (payload: { account: string, password: string }) => {
    return ApiConfig(Endpoint.LOGIN, { "email": payload.account, "password": payload.password })
}

export const apiRegister = async (payload: { account: string, password: string }) => {
    return ApiConfig(Endpoint.LOGIN, payload)
}

export const apiLoadProductsByCategoryId = async (payload: { categoryId: string, page: number }) => {
    const { categoryId, page } = payload;
    return ApiConfig(Endpoint.LOAD_PRODUCTS_BY_CATEGORY_ID, {}, "GET", undefined, { "category_id": categoryId, page });
}
