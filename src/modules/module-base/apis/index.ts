/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import axios from 'axios';
import Cookies from 'js-cookie';

/** constants */
import { AppKey } from '@module-base/constants/AppKey';
import { AppEnv } from '@module-base/constants/AppEnv';
import { AppTimer } from '@module-base/constants/AppTimer';

/** utils */
import { delay } from '@module-base/utils/delay';
import { isTokenExpired } from '@module-base/utils/axios';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

/** types */
import type { AxiosError } from 'axios';

/** default api */
export const axiosClient = axios.create({
    baseURL: AppEnv.apiHost,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        lang: 'en',
    },
    timeout: AppTimer.timeoutApi,
    withCredentials: true,
});

/** request interceptor */
axiosClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get(AppKey.token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

/** response interceptor */
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        if (isTokenExpired(error)) {
            useSettingStore.getState().action.setTokenExpired(true);
            Cookies.remove(AppKey.token);
        }
        /** Waiting, pause for about 600 ms */
        await delay(AppTimer.pendingApi);
        return Promise.reject(error);
    }
);
