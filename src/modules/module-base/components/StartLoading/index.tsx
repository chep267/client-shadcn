/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

/** components */
import { Typography } from '@module-base/components/typography';

/** styles */
import './index.css';

function StartLoading() {
    return (
        <div className={clsx('absolute flex items-center justify-center', 'top-0 right-0 bottom-0 left-0')}>
            <div
                className={clsx(
                    'absolute z-1 flex items-center justify-center',
                    'h-40 w-40',
                    'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                    'rounded-full bg-transparent shadow-lg'
                )}
            >
                <div
                    className={clsx(
                        'animate-start-anim absolute',
                        'bg-background inset-0 rounded-full border-3 border-transparent shadow-lg',
                        'border-t-main border-r-main',
                        'dark:border-t-warning dark:border-r-warning'
                    )}
                />
                <Typography
                    component="h5"
                    className={clsx('z-1 tracking-wide uppercase', 'text-main', 'dark:text-warning')}
                >
                    <FormattedMessage id={BaseLanguage.component.label.start} />
                </Typography>
                <div
                    className={clsx(
                        'animate-loading-anim',
                        'absolute flex',
                        'origin-left bg-transparent',
                        'top-[calc(50%-2px)] left-1/2 h-1 w-1/2'
                    )}
                >
                    <div
                        className={clsx(
                            'absolute',
                            '-top-1.5 -right-2 h-4 w-4',
                            'bg-main rounded-full shadow-lg',
                            'dark:bg-warning'
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export { StartLoading };
