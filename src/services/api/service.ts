import { ApiConfig } from "./api_config"
import Endpoint from "./end_point";
export const apiLogin = async (payload: { account: string, password: string }) => {
    return ApiConfig(Endpoint.LOGIN, payload)
}