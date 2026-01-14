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
const Particle = React.lazy(() => import('@module-base/components/Particles'));

type LayerScreenProps = React.PropsWithChildren<{
    className?: string;
}>;

export default function LayerScreen(props: LayerScreenProps) {
    const { children, className } = props;
    const theme = useSettingStore((store) => store.data.theme);

    return (
        <div className={cn('flex shrink grow items-center justify-center', className)}>
            {children}
            <React.Suspense>
                <Particle options={ParticleOptions(theme)} />
            </React.Suspense>
        </div>
    );
}
