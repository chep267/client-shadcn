/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { FormattedMessage } from 'react-intl';

/** constants */
import { AuthLanguage } from '@modules/auth/constants/language';

/** components */
import { CardHeader, CardTitle } from '@modules/base/components/card';
import { Typography } from '@modules/base/components/typography';

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
