/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { AppTimer } from '@module-base/constants/config';

export function debounce<T extends (...args: unknown[]) => void>(cb: T, ms: number = AppTimer.debounce) {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const debounced = (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = undefined;
            cb(...args);
        }, ms);
    };

    debounced.cancel = () => {
        clearTimeout(timeout);
        timeout = undefined;
    };

    debounced.flush = (...args: Parameters<T>) => {
        debounced.cancel();
        cb(...args);
    };

    return debounced;
}
