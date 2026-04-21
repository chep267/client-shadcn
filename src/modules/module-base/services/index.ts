/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** apis */
import { axiosClient } from '@module-base/apis';

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';

/** utils */
import { delay as funcDelay } from '@module-base/utils/delay';

/** types */
import type { AxiosResponse, AxiosRequestConfig } from 'axios';

export class BaseService {
    protected readonly url: string;
    protected readonly delay: number;

    constructor(url: string = '', delay: number = AppTimer.pendingApi) {
        this.url = url;
        this.delay = delay;
    }

    private concatUrl = (url: string = '') => {
        return this.url + url;
    };

    protected withDelay = async <Res = unknown>(promise: Promise<Res>, delay = this.delay): Promise<Res> => {
        const [res] = await Promise.all([promise, funcDelay(delay)]);
        return res;
    };

    protected get = async <Res = unknown>(configs?: AxiosRequestConfig) => {
        return axiosClient.get<Res, AxiosResponse<Res>>(this.concatUrl(configs?.url), configs);
    };

    protected post = <Res = unknown, Body = unknown>(
        body: Body,
        configs?: AxiosRequestConfig
    ): Promise<AxiosResponse<Res>> => {
        return axiosClient.post<Res, AxiosResponse<Res>, Body>(this.concatUrl(configs?.url), body, configs);
    };

    protected put = <Res = unknown, Body = unknown>(
        body: Body,
        configs?: AxiosRequestConfig
    ): Promise<AxiosResponse<Res>> => {
        return axiosClient.put<Res, AxiosResponse<Res>, Body>(this.concatUrl(configs?.url), body, configs);
    };

    protected patch = <Res = unknown, Body = unknown>(
        body: Body,
        configs?: AxiosRequestConfig
    ): Promise<AxiosResponse<Res>> => {
        return axiosClient.patch<Res, AxiosResponse<Res>, Body>(this.concatUrl(configs?.url), body, configs);
    };

    protected delete = (configs?: AxiosRequestConfig): Promise<AxiosResponse> => {
        return axiosClient.delete(this.concatUrl(configs?.url), configs);
    };
}
