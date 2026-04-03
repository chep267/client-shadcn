/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** components */
import { Spinner } from '@module-base/components/spinner';

const Icons: Readonly<App.ModuleBase.Component.TypeIconList> = {
    /** app icon */
    ['app-logo']: React.lazy(() =>
        import('@module-base/components/icon-base/svg/app-logo').then((module) => ({ default: module.AppLogo }))
    ),

    /** another icon */
    ['error']: React.lazy(() =>
        import('@module-base/components/icon-base/svg/error').then((module) => ({ default: module.Error }))
    ),
    ['not-found']: React.lazy(() =>
        import('@module-base/components/icon-base/svg/not-found').then((module) => ({ default: module.NotFound }))
    ),
};

const IconBase = React.memo<App.ModuleBase.Component.TypeIconBaseProps>(function IconBase(props) {
    const { name, size = 24, width = size, height = size, ...iconProps } = props;
    const Icon = Icons[name];

    return (
        <React.Suspense fallback={<Spinner width={width} height={height} />}>
            <Icon name={name} width={width} height={height} {...iconProps} />
        </React.Suspense>
    );
});

export { IconBase };
