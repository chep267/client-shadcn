/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';

export const delay = (timer: number = AppTimer.delay): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, timer));
};
