/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { cn } from 'cn';

/** components */
import { Checkbox } from '@module-base/components/checkbox';
import { TableHead } from '@module-base/components/table';

export function TableHeaderCellCheckbox<Data>(props: App.ModuleBase.Component.TableCellCheckboxAllProps<Data>) {
    const { className, store } = props;

    const hasCheckbox = store((state) => state.data.hasCheckbox);
    const isCheckedAll = store((state) => state.data.isCheckedAll);
    const isIndeterminate = store((state) => state.data.isIndeterminate);
    const toggleAll = store((state) => state.action.toggleAll);

    if (!hasCheckbox) return null;

    return (
        <TableHead className={cn('w-10', className)}>
            <Checkbox
                aria-label="Select all"
                className="cursor-pointer"
                checked={isIndeterminate ? 'indeterminate' : isCheckedAll}
                onClick={toggleAll}
            />
        </TableHead>
    );
}
