/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { cn } from '@module-base/utils/shadcn';

/** components */
import { Checkbox } from '@module-base/components/checkbox';
import { TableHead } from '@module-base/components/table';

function TableCellCheckboxAll<
    Data extends App.ModuleBase.Component.TypeTableData = App.ModuleBase.Component.TypeTableData,
>(props: App.ModuleBase.Component.TableCellCheckboxAllProps<Data>) {
    const { className, store } = props;

    const hasCheckbox = store((state) => state.data.hasCheckbox);
    const isCheckedAll = store((state) => state.data.isCheckedAll);
    const isIndeterminate = store((state) => state.data.isIndeterminate);
    const toggleAll = store((state) => state.action.toggleAll);

    if (!hasCheckbox) return null;

    return (
        <TableHead className={cn('w-10', className)}>
            <Checkbox
                className="cursor-pointer"
                checked={isIndeterminate ? 'indeterminate' : isCheckedAll}
                onClick={toggleAll}
            />
        </TableHead>
    );
}

export { TableCellCheckboxAll };
