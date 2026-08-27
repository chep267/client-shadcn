/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { AppTimer } from '@module-base/constants/config';

/** utils */
import { sleep } from '@module-base/utils/sleep';
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

    withDelay = async <Res = unknown>(promise: Promise<Res>, timer = this.delay): Promise<Res> => {
        const [res] = await Promise.all([promise, sleep(timer)]);
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
