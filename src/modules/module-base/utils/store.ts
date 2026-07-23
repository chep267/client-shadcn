/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
type ResetFn = () => void;

const appStores = new Set<ResetFn>();

export const registerStore = (resetFn: ResetFn) => {
    appStores.add(resetFn);
    return () => {
        appStores.delete(resetFn);
    };
};

export const resetStores = () => {
    appStores.forEach((resetFn) => {
        resetFn?.();
    });
};
