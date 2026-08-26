/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { FormattedMessage } from 'react-intl';

/** constants */
import { BaseLanguage } from '@module-base/constants/language';

/** components */
import { SelectItem } from '@module-base/components/select';

export function SelectContentEmpty(
    props: Pick<App.ModuleBase.Component.SelectBaseProps, 'emptyContent'> & { empty?: boolean }
) {
    const { empty, emptyContent } = props;

    if (!empty) return null;

    return (
        <SelectItem value="null" className="cursor-pointer" disabled>
            {emptyContent ?? <FormattedMessage id={BaseLanguage.component.select.empty} defaultMessage="No data!" />}
        </SelectItem>
    );
}
