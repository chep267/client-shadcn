/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { AppTimer } from '@module-base/constants/config';

/** utils */
import { delay as funcDelay } from '@module-base/utils/delay';
import { axiosClient } from '@module-base/utils/axiosClient';

/** types */
import type { AxiosResponse, AxiosRequestConfig } from 'axios';

export class ApiService {
    protected readonly url: string;
    protected readonly delay: number;

    constructor(url = '', delay: number = AppTimer.pendingApi) {
        this.url = url;
        this.delay = delay;
    }

    private concatUrl = (url = '') => {
        return this.url.concat(url);
    };

    withDelay = async <Res = unknown>(promise: Promise<Res>, delay = this.delay): Promise<Res> => {
        const [res] = await Promise.all([promise, funcDelay(delay)]);
        return res;
    };

    get = async <Res = unknown>(configs?: AxiosRequestConfig) => {
        return axiosClient.get<Res>(this.concatUrl(configs?.url), configs);
    };

    post = <Res = unknown, Body = unknown>(body: Body, configs?: AxiosRequestConfig): Promise<AxiosResponse<Res>> => {
        return axiosClient.post<Res>(this.concatUrl(configs?.url), body, configs);
    };

    put = <Res = unknown, Body = unknown>(body: Body, configs?: AxiosRequestConfig): Promise<AxiosResponse<Res>> => {
        return axiosClient.put<Res>(this.concatUrl(configs?.url), body, configs);
    };

    patch = <Res = unknown, Body = unknown>(body: Body, configs?: AxiosRequestConfig): Promise<AxiosResponse<Res>> => {
        return axiosClient.patch<Res>(this.concatUrl(configs?.url), body, configs);
    };

    delete = <Res = unknown>(configs?: AxiosRequestConfig): Promise<AxiosResponse> => {
        return axiosClient.delete<Res>(this.concatUrl(configs?.url), configs);
    };
}
