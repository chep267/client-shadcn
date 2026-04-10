/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import axios from 'axios';

/** types */
import type { AxiosError } from 'axios';

export const isCallApiErrorByClient = (error: AxiosError) => {
    const code = Number(error.response?.status);
    return code >= axios.HttpStatusCode.BadRequest && code < axios.HttpStatusCode.InternalServerError;
};

export const isTokenExpired = (error: AxiosError) => error.response?.status === axios.HttpStatusCode.Unauthorized;
