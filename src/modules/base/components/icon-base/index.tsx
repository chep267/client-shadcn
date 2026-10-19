/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** components */
import { Spinner } from '@modules/base/components/spinner';

const Icons: Readonly<App.Module.Base.Component.IconBaseList> = {
    /** app icon */
    ['app-logo']: React.lazy(() => import('@modules/base/components/icon-base/svg/app-logo')),

    /** another icon */
    ['error']: React.lazy(() => import('@modules/base/components/icon-base/svg/error')),
    ['not-found']: React.lazy(() => import('@modules/base/components/icon-base/svg/not-found')),
};

export function IconBase(props: App.Module.Base.Component.IconBaseProps) {
    const { name, size = 24, width = size, height = size, ...iconProps } = props;
    const Icon = Icons[name];

    return (
        <React.Suspense fallback={<Spinner width={width} height={height} />}>
            <Icon name={name} width={width} height={height} {...iconProps} />
        </React.Suspense>
    );
}
