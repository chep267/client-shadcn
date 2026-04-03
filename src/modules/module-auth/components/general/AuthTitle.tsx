/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { FormattedMessage } from 'react-intl';

/** constants */
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** components */
import { CardHeader, CardTitle } from '@module-base/components/card';
import { Typography } from '@module-base/components/typography';

export function AuthTitle(props: App.ModuleAuth.Component.AuthTitleProps) {
    const { mode = 'signin' } = props;

    return (
        <CardHeader>
            <CardTitle>
                <Typography component="h2">
                    <FormattedMessage id={AuthLanguage.component.title[mode]} defaultMessage={mode} />
                </Typography>
            </CardTitle>
        </CardHeader>
    );
}
