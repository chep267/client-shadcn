/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { FormattedMessage } from 'react-intl';

/** constants */
import { AppTimer } from '@module-base/constants/AppTimer';
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

/** hooks */
import { useCountdown } from '@module-base/hooks/useCountdown';

/** components */
import { Button } from '@module-base/components/button';
import { Typography } from '@module-base/components/typography';

function Timer() {
    const { second } = useCountdown({
        callback: () => window.location.reload(),
        numberCountdown: AppTimer.countdownError,
    });
    return <FormattedMessage id={BaseLanguage.component.label.error.fallback.autoReload} values={{ second }} />;
}

export default function ButtonRetry(props: Pick<App.ModuleBase.Component.FallbackDefaultProps, 'isAutoReload'>) {
    const { isAutoReload = true } = props;

    return (
        <div className="flex flex-col items-center justify-center pt-3">
            <Button className="text-danger" variant="outline" onClick={() => window.location.reload()}>
                <FormattedMessage id={BaseLanguage.component.button.retry} />
            </Button>
            {isAutoReload ? (
                <Typography className="text-danger pt-3">
                    <Timer />
                </Typography>
            ) : null}
        </div>
    );
}
