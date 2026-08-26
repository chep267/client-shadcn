/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** components */
import { Spinner } from '@module-base/components/spinner';
import { SelectItem } from '@module-base/components/select';

export function SelectContentLoading(props: Pick<App.ModuleBase.Component.SelectBaseProps, 'loading'>) {
    const { loading } = props;

    if (!loading) return null;

    return (
        <SelectItem value="null" className="cursor-pointer items-center justify-center px-0" disabled>
            <Spinner />
        </SelectItem>
    );
}
