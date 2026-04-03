/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { ParticleOptions } from '@module-base/constants/ParticleOptions';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** stores */
import { useSettingStore } from '@module-base/stores/useSettingStore';

/** lazy components */
const Particle = React.lazy(() =>
    import('@module-base/components/particles').then((module) => ({ default: module.Particle }))
);

type LayerScreenProps = React.PropsWithChildren<{
    className?: string;
    component?: 'div' | 'main';
}>;

export default function LayerScreen(props: LayerScreenProps) {
    const { children, className, component: Component = 'div' } = props;
    const theme = useSettingStore((store) => store.data.theme);

    return (
        <Component className={cn('flex flex-1 items-center justify-center', className)}>
            {children}
            <React.Suspense fallback={null}>
                <Particle options={ParticleOptions(theme)} />
            </React.Suspense>
        </Component>
    );
}
