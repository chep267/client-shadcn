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

export function SelectContentClear(
    props: Pick<App.ModuleBase.Component.SelectBaseProps, 'clearContent'> & { clear?: boolean }
) {
    const { clear, clearContent } = props;

    if (!clear) return null;

    return (
        <SelectItem value="null" className="cursor-pointer" disabled>
            {clearContent ?? <FormattedMessage id={BaseLanguage.component.select.clear} defaultMessage="-- Clear --" />}
        </SelectItem>
    );
}
