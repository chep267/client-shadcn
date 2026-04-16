/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { FormattedMessage } from 'react-intl';

/** constants */
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { Button } from '@module-base/components/button';
import { Spinner } from '@module-base/components/spinner';

export function AuthButtonSubmit(props: App.ModuleAuth.Component.AuthButtonSubmitProps) {
    const { loading, mode = 'signin', ...btnProps } = props;

    return (
        <Button
            type="button"
            variant="outline"
            className={cn('cursor-pointer', 'mobile:w-1/3 w-full', 'hover:text-main hover:border-main', {
                'text-main !border-main': loading,
            })}
            size="lg"
            {...btnProps}
        >
            {loading ? (
                <Spinner />
            ) : (
                <FormattedMessage
                    id={AuthLanguage.component.button[mode]}
                    defaultMessage={AuthLanguage.component.button[mode]}
                />
            )}
        </Button>
    );
}
