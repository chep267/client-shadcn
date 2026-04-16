/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { FormattedMessage } from 'react-intl';

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { IconBase } from '@module-base/components/icon-base';
import { Typography } from '@module-base/components/typography';
import { ButtonRetry } from '@module-base/providers/NotifyProvider/FallbackDefault/ButtonRetry';

/** screens */
import LayerScreen from '@module-base/screens/LayerScreen';

export function FallbackDefault(props: App.ModuleBase.Component.FallbackDefaultProps) {
    const { isAutoReload } = props;

    return (
        <LayerScreen className={cn('h-screen w-screen', 'overflow-hidden')}>
            <div className={cn('flex flex-col items-center justify-center', 'z-1')}>
                <IconBase className="fill-danger" name="error" width={237} height={213} />
                <Typography component="h1" className={cn('text-danger font-medium', 'text-3xl', 'tablet:text-5xl')}>
                    <FormattedMessage
                        id={BaseLanguage.component.label.error.fallback.title}
                        defaultMessage={BaseLanguage.component.label.error.fallback.title}
                    />
                </Typography>
                <Typography component="h1" className={cn('text-danger font-medium', 'text-xl', 'tablet:text-2xl')}>
                    <FormattedMessage
                        id={BaseLanguage.component.label.error.fallback.content}
                        defaultMessage={BaseLanguage.component.label.error.fallback.content}
                    />
                </Typography>
                <ButtonRetry isAutoReload={isAutoReload} />
            </div>
        </LayerScreen>
    );
}
