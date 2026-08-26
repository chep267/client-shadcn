/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { FormattedMessage } from 'react-intl';

/** constants */
import { BaseLanguage } from '@module-base/constants/language';

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { SelectTrigger as SelectTriggerComp, SelectValue } from '@module-base/components/select';

export function SelectTrigger(props: Pick<App.ModuleBase.Component.SelectBaseProps, 'className' | 'placeholder'>) {
    const { className, placeholder: placeholderProps } = props;

    const placeholder = placeholderProps ?? (
        <FormattedMessage id={BaseLanguage.component.select.placeholder} defaultMessage="Select..." />
    );

    return (
        <SelectTriggerComp aria-label="select" className={cn('w-full cursor-pointer', className)}>
            <SelectValue placeholder={placeholder} />
        </SelectTriggerComp>
    );
}
