/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** components */
import { Spinner } from '@module-base/components/spinner';

const Icons: Readonly<App.ModuleBase.Component.IconList> = {
    /** app icon */
    appLogo: React.lazy(() => import('@module-base/components/IconBase/svg/AppLogo')),

    /** another icon */
    error: React.lazy(() => import('@module-base/components/IconBase/svg/Error')),
    notFound: React.lazy(() => import('@module-base/components/IconBase/svg/NotFound')),
};

const IconBase = React.memo<App.ModuleBase.Component.IconBaseProps>(function IconBase(props) {
    const { name, size = 24, width = size, height = size, ...iconProps } = props;
    const Icon = Icons[name];

    return (
        <React.Suspense fallback={<Spinner width={width} height={height} />}>
            <Icon name={name} width={width} height={height} {...iconProps} />
        </React.Suspense>
    );
});

export { IconBase };
