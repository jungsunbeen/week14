import axios from "axios";
import { getNewRefreshToken } from "./user";

export const getAuthAxios = (token) => {
    const authAxios = axios.create({
        baseURL : "http://yangzzago.kro.kr:3000",
        headers : {
            Authorization: `Bearer ${token}`,
        },
    });
    authAxios.interceptors.response.use(
        (response)=>response,//성공시에 그대로
        async(error) => { //실패시 코드
            const result = getNewRefreshToken();
            error.config.headers.Authorization = result.accesstoken;
            localStorage.setItem("access",result.accessToken);
            localStorage.setItem("refresh",result.refreshToken);
            return await axios.get(error.config.url, error.config);
        }

    ); //앞에는 성공했을 때, 뒤는 실패했을 때 가로채서 두가지 경우 처리하는 것
    return authAxios;
};